import Popup from '../../popup';
import Form from '../../form';
import ButtonGroup from '../../button_group';
import ColorBox from '../../color_box';
import ScrollView from '../../scroll_view';
import $ from '../../../core/renderer';
import { getWindow } from '../../../core/utils/window';
import { isDefined } from '../../../core/utils/type';
import { each } from '../../../core/utils/iterator';
import devices from '../../../core/devices';
import { getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { noop } from '../../../core/utils/common';
import localizationMessage from '../../../localization/message';
import { unfixTableWidth, getColumnElements, getAutoSizedElements, setLineElementsAttrValue, getLineElements, getRowElements } from '../utils/table_helper';
var MIN_HEIGHT = 400;
var BORDER_STYLES = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
var formPopup;
var applyHandler = noop;

var createFormPopup = editorInstance => {
  var $popup = $('<div>').appendTo(editorInstance.$element());
  formPopup = editorInstance._createComponent($popup, Popup, {
    deferRendering: true,
    showTitle: true,
    width: 800,
    height: 'auto',
    shading: false,
    closeOnTargetScroll: true,
    closeOnOutsideClick: true,
    animation: {
      show: {
        type: 'fade',
        duration: 0,
        from: 0,
        to: 1
      },
      hide: {
        type: 'fade',
        duration: 400,
        from: 1,
        to: 0
      }
    },
    fullScreen: getFullScreen(),
    visible: false,
    maxHeight: getMaxHeight(),
    toolbarItems: [{
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('OK'),
        onClick: () => {
          applyHandler();
        }
      }
    }, {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('Cancel'),
        onClick: () => {
          formPopup.hide();
        }
      }
    }]
  });
};

var getMaxHeight = () => {
  var window = getWindow();
  var windowHeight = (window === null || window === void 0 ? void 0 : window.innerHeight) || 0;
  return Math.max(MIN_HEIGHT, windowHeight * 0.9);
};

var getFullScreen = () => {
  return devices.real().deviceType === 'phone';
};

var applyTableDimensionChanges = ($table, newHeight, newWidth) => {
  if (isDefined(newWidth)) {
    var autoWidthColumns = getAutoSizedElements($table);

    if (autoWidthColumns.length > 0) {
      $table.css('width', newWidth);
    } else {
      var $columns = getColumnElements($table);
      var oldTableWidth = getOuterWidth($table);
      unfixTableWidth($table);
      each($columns, (i, element) => {
        var $element = $(element);
        var newElementWidth = newWidth / oldTableWidth * getOuterWidth($element);
        $element.attr('width', newElementWidth);
        var $lineElements = getLineElements($table, $element.index(), 'horizontal');
        setLineElementsAttrValue($lineElements, 'width', newElementWidth);
      });
    }
  }

  var autoHeightRows = getAutoSizedElements($table, 'vertical');

  if ((autoHeightRows === null || autoHeightRows === void 0 ? void 0 : autoHeightRows.length) > 0) {
    $table.css('height', newHeight);
  } else {
    var $rows = getRowElements($table);
    var oldTableHeight = getOuterHeight($table);
    each($rows, (i, element) => {
      var $element = $(element);
      var newElementHeight = newHeight / oldTableHeight * getOuterHeight($element);
      var $lineElements = getLineElements($table, i, 'vertical');
      setLineElementsAttrValue($lineElements, 'height', newElementHeight);
    });
  }
};

var applyCellDimensionChanges = ($target, newHeight, newWidth) => {
  var $table = $($target.closest('table'));

  if (isDefined(newWidth)) {
    var index = $($target).index();
    var $verticalCells = getLineElements($table, index);
    var widthDiff = newWidth - getOuterWidth($target);
    var tableWidth = getOuterWidth($table);

    if (newWidth > tableWidth) {
      unfixTableWidth($table);
    }

    setLineElementsAttrValue($verticalCells, 'width', newWidth);
    var $nextColumnCell = $target.next();
    var shouldUpdateNearestColumnWidth = getAutoSizedElements($table).length === 0;

    if (shouldUpdateNearestColumnWidth) {
      unfixTableWidth($table);

      if ($nextColumnCell.length === 1) {
        $verticalCells = getLineElements($table, index + 1);
        var nextColumnWidth = getOuterWidth($verticalCells.eq(0)) - widthDiff;
        setLineElementsAttrValue($verticalCells, 'width', Math.max(nextColumnWidth, 0));
      } else {
        var $prevColumnCell = $target.prev();

        if ($prevColumnCell.length === 1) {
          $verticalCells = getLineElements($table, index - 1);
          var prevColumnWidth = getOuterWidth($verticalCells.eq(0)) - widthDiff;
          setLineElementsAttrValue($verticalCells, 'width', Math.max(prevColumnWidth, 0));
        }
      }
    }
  }

  var $horizontalCells = $target.closest('tr').find('td');
  setLineElementsAttrValue($horizontalCells, 'height', newHeight);
  var autoHeightRows = getAutoSizedElements($table, 'vertical');

  if (autoHeightRows.length === 0) {
    $table.css('height', 'auto');
  }
};

export var showTablePropertiesForm = (editorInstance, $table) => {
  var _formPopup;

  (_formPopup = formPopup) === null || _formPopup === void 0 ? void 0 : _formPopup.dispose();
  createFormPopup(editorInstance);
  var window = getWindow();
  var formInstance;
  var alignmentEditorInstance;
  var borderColorEditorInstance;
  var backgroundColorEditorInstance;
  var startTableWidth = getOuterWidth($table);
  var tableStyles = window.getComputedStyle($table.get(0));
  var startTextAlign = tableStyles.textAlign === 'start' ? 'left' : tableStyles.textAlign;
  var formOptions = {
    colCount: 2,
    formData: {
      width: startTableWidth,
      height: getOuterHeight($table),
      backgroundColor: tableStyles.backgroundColor,
      borderStyle: tableStyles.borderStyle,
      borderColor: tableStyles.borderColor,
      borderWidth: parseInt(tableStyles.borderWidth),
      alignment: startTextAlign
    },
    items: [{
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-border'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'borderStyle',
        label: {
          text: localizationMessage.format('dxHtmlEditor-style')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: BORDER_STYLES,
          placeholder: 'Select style'
        }
      }, {
        dataField: 'borderWidth',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderWidth')
        },
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }, {
        itemType: 'simple',
        dataField: 'borderColor',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        colSpan: 2,
        template: e => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').borderColor,
            onInitialized: e => {
              borderColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-dimensions'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'width',
        label: {
          text: localizationMessage.format('dxHtmlEditor-width')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'height',
        label: {
          text: localizationMessage.format('dxHtmlEditor-height')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-tableBackground'),
      items: [{
        itemType: 'simple',
        dataField: 'backgroundColor',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        template: e => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').backgroundColor,
            onInitialized: e => {
              backgroundColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-alignment'),
      items: [{
        itemType: 'simple',
        label: {
          text: localizationMessage.format('dxHtmlEditor-horizontal')
        },
        template: () => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ButtonGroup, {
            items: [{
              value: 'left',
              icon: 'alignleft'
            }, {
              value: 'center',
              icon: 'aligncenter'
            }, {
              value: 'right',
              icon: 'alignright'
            }, {
              value: 'justify',
              icon: 'alignjustify'
            }],
            keyExpr: 'value',
            selectedItemKeys: [startTextAlign],
            onInitialized: e => {
              alignmentEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }],
    showColonAfterLabel: true,
    labelLocation: 'top',
    minColWidth: 300
  };

  applyHandler = () => {
    var formData = formInstance.option('formData');
    var widthArg = formData.width === startTableWidth ? undefined : formData.width;
    applyTableDimensionChanges($table, formData.height, widthArg);
    $table.css({
      'backgroundColor': backgroundColorEditorInstance.option('value'),
      'borderStyle': formData.borderStyle,
      'borderColor': borderColorEditorInstance.option('value'),
      'borderWidth': formData.borderWidth,
      'textAlign': alignmentEditorInstance.option('selectedItemKeys')[0]
    });
    formPopup.hide();
  };

  formPopup.option({
    'contentTemplate': container => {
      var $content = $('<div>').appendTo(container);
      var $form = $('<div>').appendTo($content);

      editorInstance._createComponent($form, Form, formOptions);

      editorInstance._createComponent($content, ScrollView, {});

      formInstance = $form.dxForm('instance');
      return $content;
    },
    title: localizationMessage.format('dxHtmlEditor-tableProperties')
  });
  formPopup.show();
  return formPopup;
};
export var showCellPropertiesForm = (editorInstance, $cell) => {
  var _formPopup2;

  (_formPopup2 = formPopup) === null || _formPopup2 === void 0 ? void 0 : _formPopup2.dispose();
  createFormPopup(editorInstance);
  var window = getWindow();
  var formInstance;
  var alignmentEditorInstance;
  var verticalAlignmentEditorInstance;
  var borderColorEditorInstance;
  var backgroundColorEditorInstance;
  var startCellWidth = getOuterWidth($cell);
  var cellStyles = window.getComputedStyle($cell.get(0));
  var startTextAlign = cellStyles.textAlign === 'start' ? 'left' : cellStyles.textAlign;
  var formOptions = {
    colCount: 2,
    formData: {
      width: startCellWidth,
      height: getOuterHeight($cell),
      backgroundColor: cellStyles.backgroundColor,
      borderStyle: cellStyles.borderStyle,
      borderColor: cellStyles.borderColor,
      borderWidth: parseInt(cellStyles.borderWidth),
      alignment: startTextAlign,
      verticalAlignment: cellStyles.verticalAlign,
      verticalPadding: parseInt(cellStyles.paddingTop),
      horizontalPadding: parseInt(cellStyles.paddingLeft)
    },
    items: [{
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-border'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'borderStyle',
        label: {
          text: localizationMessage.format('dxHtmlEditor-style')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: BORDER_STYLES
        }
      }, {
        dataField: 'borderWidth',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderWidth')
        },
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }, {
        itemType: 'simple',
        dataField: 'borderColor',
        colSpan: 2,
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        template: e => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').borderColor,
            onInitialized: e => {
              borderColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-dimensions'),
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        dataField: 'width',
        label: {
          text: localizationMessage.format('dxHtmlEditor-width')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'height',
        label: {
          text: localizationMessage.format('dxHtmlEditor-height')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'verticalPadding',
        label: {
          text: localizationMessage.format('dxHtmlEditor-paddingVertical')
        },
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }, {
        label: {
          text: localizationMessage.format('dxHtmlEditor-paddingHorizontal')
        },
        dataField: 'horizontalPadding',
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-dxHtmlEditor-pixels')
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-tableBackground'),
      items: [{
        itemType: 'simple',
        dataField: 'backgroundColor',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        template: e => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').backgroundColor,
            onInitialized: e => {
              backgroundColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-alignment'),
      colCount: 2,
      items: [{
        itemType: 'simple',
        label: {
          text: localizationMessage.format('dxHtmlEditor-horizontal')
        },
        template: () => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ButtonGroup, {
            items: [{
              value: 'left',
              icon: 'alignleft'
            }, {
              value: 'center',
              icon: 'aligncenter'
            }, {
              value: 'right',
              icon: 'alignright'
            }, {
              value: 'justify',
              icon: 'alignjustify'
            }],
            keyExpr: 'value',
            selectedItemKeys: [startTextAlign],
            onInitialized: e => {
              alignmentEditorInstance = e.component;
            }
          });

          return $content;
        }
      }, {
        itemType: 'simple',
        label: {
          text: localizationMessage.format('dxHtmlEditor-vertical')
        },
        template: () => {
          var $content = $('<div>');

          editorInstance._createComponent($content, ButtonGroup, {
            items: [{
              value: 'top',
              icon: 'verticalaligntop'
            }, {
              value: 'middle',
              icon: 'verticalaligncenter'
            }, {
              value: 'bottom',
              icon: 'verticalalignbottom'
            }],
            keyExpr: 'value',
            selectedItemKeys: [cellStyles.verticalAlign],
            onInitialized: e => {
              verticalAlignmentEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }],
    showColonAfterLabel: true,
    labelLocation: 'top',
    minColWidth: 300
  };

  applyHandler = () => {
    var formData = formInstance.option('formData');
    var widthArg = formData.width === startCellWidth ? undefined : formData.width;
    applyCellDimensionChanges($cell, formData.height, widthArg);
    $cell.css({
      'backgroundColor': backgroundColorEditorInstance.option('value'),
      'borderStyle': formData.borderStyle,
      'borderColor': borderColorEditorInstance.option('value'),
      'borderWidth': formData.borderWidth + 'px',
      'textAlign': alignmentEditorInstance.option('selectedItemKeys')[0],
      'verticalAlign': verticalAlignmentEditorInstance.option('selectedItemKeys')[0],
      'paddingLeft': formData.horizontalPadding + 'px',
      'paddingRight': formData.horizontalPadding + 'px',
      'paddingTop': formData.verticalPadding + 'px',
      'paddingBottom': formData.verticalPadding + 'px'
    });
    formPopup.hide();
  };

  formPopup.option({
    'contentTemplate': container => {
      var $content = $('<div>').appendTo(container);
      var $form = $('<div>').appendTo($content);

      editorInstance._createComponent($form, Form, formOptions);

      editorInstance._createComponent($content, ScrollView, {});

      formInstance = $form.dxForm('instance');
      return $content;
    },
    title: localizationMessage.format('dxHtmlEditor-cellProperties')
  });
  formPopup.show();
  return formPopup;
};