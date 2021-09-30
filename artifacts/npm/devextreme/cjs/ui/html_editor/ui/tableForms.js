/**
* DevExtreme (cjs/ui/html_editor/ui/tableForms.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.showCellPropertiesForm = exports.showTablePropertiesForm = void 0;

var _popup = _interopRequireDefault(require("../../popup"));

var _form = _interopRequireDefault(require("../../form"));

var _button_group = _interopRequireDefault(require("../../button_group"));

var _color_box = _interopRequireDefault(require("../../color_box"));

var _scroll_view = _interopRequireDefault(require("../../scroll_view"));

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _window = require("../../../core/utils/window");

var _type = require("../../../core/utils/type");

var _iterator = require("../../../core/utils/iterator");

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _size = require("../../../core/utils/size");

var _common = require("../../../core/utils/common");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _table_helper = require("../utils/table_helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIN_HEIGHT = 400;
var BORDER_STYLES = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
var formPopup;
var applyHandler = _common.noop;

var createFormPopup = function createFormPopup(editorInstance) {
  var $popup = (0, _renderer.default)('<div>').appendTo(editorInstance.$element());
  formPopup = editorInstance._createComponent($popup, _popup.default, {
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
        text: _message.default.format('OK'),
        onClick: function onClick() {
          applyHandler();
        }
      }
    }, {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: _message.default.format('Cancel'),
        onClick: function onClick() {
          formPopup.hide();
        }
      }
    }]
  });
};

var getMaxHeight = function getMaxHeight() {
  var window = (0, _window.getWindow)();
  var windowHeight = (window === null || window === void 0 ? void 0 : window.innerHeight) || 0;
  return Math.max(MIN_HEIGHT, windowHeight * 0.9);
};

var getFullScreen = function getFullScreen() {
  return _devices.default.real().deviceType === 'phone';
};

var applyTableDimensionChanges = function applyTableDimensionChanges($table, newHeight, newWidth) {
  if ((0, _type.isDefined)(newWidth)) {
    var autoWidthColumns = (0, _table_helper.getAutoSizedElements)($table);

    if (autoWidthColumns.length > 0) {
      $table.css('width', newWidth);
    } else {
      var $columns = (0, _table_helper.getColumnElements)($table);
      var oldTableWidth = (0, _size.getOuterWidth)($table);
      (0, _table_helper.unfixTableWidth)($table);
      (0, _iterator.each)($columns, function (i, element) {
        var $element = (0, _renderer.default)(element);
        var newElementWidth = newWidth / oldTableWidth * (0, _size.getOuterWidth)($element);
        $element.attr('width', newElementWidth);
        var $lineElements = (0, _table_helper.getLineElements)($table, $element.index(), 'horizontal');
        (0, _table_helper.setLineElementsAttrValue)($lineElements, 'width', newElementWidth);
      });
    }
  }

  var autoHeightRows = (0, _table_helper.getAutoSizedElements)($table, 'vertical');

  if ((autoHeightRows === null || autoHeightRows === void 0 ? void 0 : autoHeightRows.length) > 0) {
    $table.css('height', newHeight);
  } else {
    var $rows = (0, _table_helper.getRowElements)($table);
    var oldTableHeight = (0, _size.getOuterHeight)($table);
    (0, _iterator.each)($rows, function (i, element) {
      var $element = (0, _renderer.default)(element);
      var newElementHeight = newHeight / oldTableHeight * (0, _size.getOuterHeight)($element);
      var $lineElements = (0, _table_helper.getLineElements)($table, i, 'vertical');
      (0, _table_helper.setLineElementsAttrValue)($lineElements, 'height', newElementHeight);
    });
  }
};

var applyCellDimensionChanges = function applyCellDimensionChanges($target, newHeight, newWidth) {
  var $table = (0, _renderer.default)($target.closest('table'));

  if ((0, _type.isDefined)(newWidth)) {
    var index = (0, _renderer.default)($target).index();
    var $verticalCells = (0, _table_helper.getLineElements)($table, index);
    var widthDiff = newWidth - (0, _size.getOuterWidth)($target);
    var tableWidth = (0, _size.getOuterWidth)($table);

    if (newWidth > tableWidth) {
      (0, _table_helper.unfixTableWidth)($table);
    }

    (0, _table_helper.setLineElementsAttrValue)($verticalCells, 'width', newWidth);
    var $nextColumnCell = $target.next();
    var shouldUpdateNearestColumnWidth = (0, _table_helper.getAutoSizedElements)($table).length === 0;

    if (shouldUpdateNearestColumnWidth) {
      (0, _table_helper.unfixTableWidth)($table);

      if ($nextColumnCell.length === 1) {
        $verticalCells = (0, _table_helper.getLineElements)($table, index + 1);
        var nextColumnWidth = (0, _size.getOuterWidth)($verticalCells.eq(0)) - widthDiff;
        (0, _table_helper.setLineElementsAttrValue)($verticalCells, 'width', Math.max(nextColumnWidth, 0));
      } else {
        var $prevColumnCell = $target.prev();

        if ($prevColumnCell.length === 1) {
          $verticalCells = (0, _table_helper.getLineElements)($table, index - 1);
          var prevColumnWidth = (0, _size.getOuterWidth)($verticalCells.eq(0)) - widthDiff;
          (0, _table_helper.setLineElementsAttrValue)($verticalCells, 'width', Math.max(prevColumnWidth, 0));
        }
      }
    }
  }

  var $horizontalCells = $target.closest('tr').find('td');
  (0, _table_helper.setLineElementsAttrValue)($horizontalCells, 'height', newHeight);
  var autoHeightRows = (0, _table_helper.getAutoSizedElements)($table, 'vertical');

  if (autoHeightRows.length === 0) {
    $table.css('height', 'auto');
  }
};

var showTablePropertiesForm = function showTablePropertiesForm(editorInstance, $table) {
  var _formPopup;

  (_formPopup = formPopup) === null || _formPopup === void 0 ? void 0 : _formPopup.dispose();
  createFormPopup(editorInstance);
  var window = (0, _window.getWindow)();
  var formInstance;
  var alignmentEditorInstance;
  var borderColorEditorInstance;
  var backgroundColorEditorInstance;
  var startTableWidth = (0, _size.getOuterWidth)($table);
  var tableStyles = window.getComputedStyle($table.get(0));
  var startTextAlign = tableStyles.textAlign === 'start' ? 'left' : tableStyles.textAlign;
  var formOptions = {
    colCount: 2,
    formData: {
      width: startTableWidth,
      height: (0, _size.getOuterHeight)($table),
      backgroundColor: tableStyles.backgroundColor,
      borderStyle: tableStyles.borderStyle,
      borderColor: tableStyles.borderColor,
      borderWidth: parseInt(tableStyles.borderWidth),
      alignment: startTextAlign
    },
    items: [{
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-border'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'borderStyle',
        label: {
          text: _message.default.format('dxHtmlEditor-style')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: BORDER_STYLES,
          placeholder: 'Select style'
        }
      }, {
        dataField: 'borderWidth',
        label: {
          text: _message.default.format('dxHtmlEditor-borderWidth')
        },
        editorOptions: {
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }, {
        itemType: 'simple',
        dataField: 'borderColor',
        label: {
          text: _message.default.format('dxHtmlEditor-borderColor')
        },
        colSpan: 2,
        template: function template(e) {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _color_box.default, {
            editAlphaChannel: true,
            value: e.component.option('formData').borderColor,
            onInitialized: function onInitialized(e) {
              borderColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-dimensions'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'width',
        label: {
          text: _message.default.format('dxHtmlEditor-width')
        },
        editorOptions: {
          min: 0,
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'height',
        label: {
          text: _message.default.format('dxHtmlEditor-height')
        },
        editorOptions: {
          min: 0,
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }]
    }, {
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-tableBackground'),
      items: [{
        itemType: 'simple',
        dataField: 'backgroundColor',
        label: {
          text: _message.default.format('dxHtmlEditor-borderColor')
        },
        template: function template(e) {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _color_box.default, {
            editAlphaChannel: true,
            value: e.component.option('formData').backgroundColor,
            onInitialized: function onInitialized(e) {
              backgroundColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-alignment'),
      items: [{
        itemType: 'simple',
        label: {
          text: _message.default.format('dxHtmlEditor-horizontal')
        },
        template: function template() {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _button_group.default, {
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
            onInitialized: function onInitialized(e) {
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

  applyHandler = function applyHandler() {
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
    'contentTemplate': function contentTemplate(container) {
      var $content = (0, _renderer.default)('<div>').appendTo(container);
      var $form = (0, _renderer.default)('<div>').appendTo($content);

      editorInstance._createComponent($form, _form.default, formOptions);

      editorInstance._createComponent($content, _scroll_view.default, {});

      formInstance = $form.dxForm('instance');
      return $content;
    },
    title: _message.default.format('dxHtmlEditor-tableProperties')
  });
  formPopup.show();
  return formPopup;
};

exports.showTablePropertiesForm = showTablePropertiesForm;

var showCellPropertiesForm = function showCellPropertiesForm(editorInstance, $cell) {
  var _formPopup2;

  (_formPopup2 = formPopup) === null || _formPopup2 === void 0 ? void 0 : _formPopup2.dispose();
  createFormPopup(editorInstance);
  var window = (0, _window.getWindow)();
  var formInstance;
  var alignmentEditorInstance;
  var verticalAlignmentEditorInstance;
  var borderColorEditorInstance;
  var backgroundColorEditorInstance;
  var startCellWidth = (0, _size.getOuterWidth)($cell);
  var cellStyles = window.getComputedStyle($cell.get(0));
  var startTextAlign = cellStyles.textAlign === 'start' ? 'left' : cellStyles.textAlign;
  var formOptions = {
    colCount: 2,
    formData: {
      width: startCellWidth,
      height: (0, _size.getOuterHeight)($cell),
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
      caption: _message.default.format('dxHtmlEditor-border'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'borderStyle',
        label: {
          text: _message.default.format('dxHtmlEditor-style')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: BORDER_STYLES
        }
      }, {
        dataField: 'borderWidth',
        label: {
          text: _message.default.format('dxHtmlEditor-borderWidth')
        },
        editorOptions: {
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }, {
        itemType: 'simple',
        dataField: 'borderColor',
        colSpan: 2,
        label: {
          text: _message.default.format('dxHtmlEditor-borderColor')
        },
        template: function template(e) {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _color_box.default, {
            editAlphaChannel: true,
            value: e.component.option('formData').borderColor,
            onInitialized: function onInitialized(e) {
              borderColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-dimensions'),
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        dataField: 'width',
        label: {
          text: _message.default.format('dxHtmlEditor-width')
        },
        editorOptions: {
          min: 0,
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'height',
        label: {
          text: _message.default.format('dxHtmlEditor-height')
        },
        editorOptions: {
          min: 0,
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'verticalPadding',
        label: {
          text: _message.default.format('dxHtmlEditor-paddingVertical')
        },
        editorOptions: {
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }, {
        label: {
          text: _message.default.format('dxHtmlEditor-paddingHorizontal')
        },
        dataField: 'horizontalPadding',
        editorOptions: {
          placeholder: _message.default.format('dxHtmlEditor-pixels')
        }
      }]
    }, {
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-tableBackground'),
      items: [{
        itemType: 'simple',
        dataField: 'backgroundColor',
        label: {
          text: _message.default.format('dxHtmlEditor-borderColor')
        },
        template: function template(e) {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _color_box.default, {
            editAlphaChannel: true,
            value: e.component.option('formData').backgroundColor,
            onInitialized: function onInitialized(e) {
              backgroundColorEditorInstance = e.component;
            }
          });

          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: _message.default.format('dxHtmlEditor-alignment'),
      colCount: 2,
      items: [{
        itemType: 'simple',
        label: {
          text: _message.default.format('dxHtmlEditor-horizontal')
        },
        template: function template() {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _button_group.default, {
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
            onInitialized: function onInitialized(e) {
              alignmentEditorInstance = e.component;
            }
          });

          return $content;
        }
      }, {
        itemType: 'simple',
        label: {
          text: _message.default.format('dxHtmlEditor-vertical')
        },
        template: function template() {
          var $content = (0, _renderer.default)('<div>');

          editorInstance._createComponent($content, _button_group.default, {
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
            onInitialized: function onInitialized(e) {
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

  applyHandler = function applyHandler() {
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
    'contentTemplate': function contentTemplate(container) {
      var $content = (0, _renderer.default)('<div>').appendTo(container);
      var $form = (0, _renderer.default)('<div>').appendTo($content);

      editorInstance._createComponent($form, _form.default, formOptions);

      editorInstance._createComponent($content, _scroll_view.default, {});

      formInstance = $form.dxForm('instance');
      return $content;
    },
    title: _message.default.format('dxHtmlEditor-cellProperties')
  });
  formPopup.show();
  return formPopup;
};

exports.showCellPropertiesForm = showCellPropertiesForm;
