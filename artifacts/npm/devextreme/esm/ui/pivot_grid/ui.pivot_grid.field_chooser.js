/**
* DevExtreme (esm/ui/pivot_grid/ui.pivot_grid.field_chooser.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { getImageContainer } from '../../core/utils/icon';
import { hasWindow as hasWindowFn } from '../../core/utils/window';
import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { inArray } from '../../core/utils/array';
import { each } from '../../core/utils/iterator';
import localizationMessage from '../../localization/message';
import registerComponent from '../../core/component_registrator';
import { getCompareFunction, foreachDataLevel } from './ui.pivot_grid.utils';
import TreeView from '../tree_view';
import ContextMenu from '../context_menu';
import BaseFieldChooser from './ui.pivot_grid.field_chooser_base';
var DIV = '<div>';
var hasWindow = hasWindowFn();
import './data_source';
var FIELDCHOOSER_CLASS = 'dx-pivotgridfieldchooser';
var FIELDCHOOSER_CONTAINER_CLASS = 'dx-pivotgridfieldchooser-container';
var FIELDS_CONTAINER_CLASS = 'dx-pivotgrid-fields-container';
var AREA_DRAG_CLASS = 'dx-pivotgrid-drag-action';

function getDimensionFields(item, fields) {
  var result = [];

  if (item.items) {
    for (var i = 0; i < item.items.length; i++) {
      result.push.apply(result, getDimensionFields(item.items[i], fields));
    }
  } else {
    if (isDefined(item.index)) {
      result.push(fields[item.index]);
    }
  }

  return result;
}

function getFirstItem(item, condition) {
  if (item.items) {
    for (var i = 0; i < item.items.length; i++) {
      var childrenItem = getFirstItem(item.items[i], condition);

      if (childrenItem) {
        return childrenItem;
      }
    }
  }

  if (condition(item)) {
    return item;
  }
}

var compareOrder = [function (a, b) {
  var aValue = -!!a.isMeasure;
  var bValue = +!!b.isMeasure;
  return aValue + bValue;
}, function (a, b) {
  var aValue = -!!(a.items && a.items.length);
  var bValue = +!!(b.items && b.items.length);
  return aValue + bValue;
}, function (a, b) {
  var aValue = +!!(a.isMeasure === false && a.field && a.field.levels && a.field.levels.length);
  var bValue = -!!(b.isMeasure === false && b.field && b.field.levels && b.field.levels.length);
  return aValue + bValue;
}, getCompareFunction(function (item) {
  return item.text;
})];

function compareItems(a, b) {
  var result = 0;
  var i = 0;

  while (!result && compareOrder[i]) {
    result = compareOrder[i++](a, b);
  }

  return result;
}

function getScrollable(container) {
  return container.find('.dx-scrollable').dxScrollable('instance');
}

var FieldChooser = BaseFieldChooser.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      height: 400,
      layout: 0,
      dataSource: null,
      onContextMenuPreparing: null,
      allowSearch: false,
      searchTimeout: 500,
      texts: {
        columnFields: localizationMessage.format('dxPivotGrid-columnFields'),
        rowFields: localizationMessage.format('dxPivotGrid-rowFields'),
        dataFields: localizationMessage.format('dxPivotGrid-dataFields'),
        filterFields: localizationMessage.format('dxPivotGrid-filterFields'),
        allFields: localizationMessage.format('dxPivotGrid-allFields')
      }
    });
  },
  _refreshDataSource: function _refreshDataSource() {
    var that = this;
    that._expandedPaths = [];

    that._changedHandler = that._changedHandler || function () {
      each(that._dataChangedHandlers, function (_, func) {
        func();
      });

      that._fireContentReadyAction();

      that._skipStateChange = true;
      that.option('state', that._dataSource.state());
      that._skipStateChange = false;
    };

    that._disposeDataSource();

    that.callBase();
    that._dataSource && that._dataSource.on('changed', that._changedHandler);
  },
  _disposeDataSource: function _disposeDataSource() {
    var that = this;
    var dataSource = that._dataSource;

    if (dataSource) {
      dataSource.off('changed', that._changedHandler);
      that._dataSource = undefined;
    }
  },
  _dispose: function _dispose() {
    this._disposeDataSource();

    this.callBase.apply(this, arguments);
  },
  _init: function _init() {
    this.callBase();

    this._refreshDataSource();

    this._dataChangedHandlers = [];

    this._initActions();
  },
  _initActions: function _initActions() {
    this._actions = {
      onContextMenuPreparing: this._createActionByOption('onContextMenuPreparing')
    };
  },
  _trigger: function _trigger(eventName, eventArg) {
    this._actions[eventName](eventArg);
  },
  _setOptionsByReference: function _setOptionsByReference() {
    this.callBase();
    extend(this._optionsByReference, {
      dataSource: true
    });
  },
  _optionChanged: function _optionChanged(args) {
    var that = this;

    switch (args.name) {
      case 'dataSource':
        that._refreshDataSource();

        that._invalidate();

        break;

      case 'layout':
      case 'texts':
      case 'allowSearch':
      case 'searchTimeout':
        that._invalidate();

        break;

      case 'onContextMenuPreparing':
        that._actions[args.name] = that._createActionByOption(args.name);
        break;

      default:
        that.callBase(args);
    }
  },
  _clean: function _clean(skipStateSetting) {
    !skipStateSetting && this._dataSource && this.option('state', this._dataSource.state());
    this.$element().children('.' + FIELDCHOOSER_CONTAINER_CLASS).remove();
  },
  _renderLayout0: function _renderLayout0($container) {
    var that = this;
    $container.addClass('dx-layout-0');
    var $row1 = $(DIV).addClass('dx-row').appendTo($container);
    var $row2 = $(DIV).addClass('dx-row').appendTo($container);
    var $col1 = $(DIV).addClass('dx-col').appendTo($row1);
    var $col2 = $(DIV).addClass('dx-col').appendTo($row1);
    var $col3 = $(DIV).addClass('dx-col').appendTo($row2);
    var $col4 = $(DIV).addClass('dx-col').appendTo($row2);

    that._renderArea($col1, 'all');

    that._renderArea($col2, 'row');

    that._renderArea($col2, 'column');

    that._renderArea($col3, 'filter');

    that._renderArea($col4, 'data');
  },
  _renderLayout1: function _renderLayout1($container) {
    var that = this;
    var $col1 = $(DIV).addClass('dx-col').appendTo($container);
    var $col2 = $(DIV).addClass('dx-col').appendTo($container);

    that._renderArea($col1, 'all');

    that._renderArea($col2, 'filter');

    that._renderArea($col2, 'row');

    that._renderArea($col2, 'column');

    that._renderArea($col2, 'data');
  },
  _renderLayout2: function _renderLayout2($container) {
    var that = this;
    $container.addClass('dx-layout-2');
    var $row1 = $(DIV).addClass('dx-row').appendTo($container);

    that._renderArea($row1, 'all');

    var $row2 = $(DIV).addClass('dx-row').appendTo($container);
    var $col1 = $(DIV).addClass('dx-col').appendTo($row2);
    var $col2 = $(DIV).addClass('dx-col').appendTo($row2);

    that._renderArea($col1, 'filter');

    that._renderArea($col1, 'row');

    that._renderArea($col2, 'column');

    that._renderArea($col2, 'data');
  },
  _initMarkup: function _initMarkup() {
    var that = this;
    var $element = this.$element();
    var $container = $(DIV).addClass(FIELDCHOOSER_CONTAINER_CLASS).appendTo($element);
    var layout = that.option('layout');
    that.callBase();
    $element.addClass(FIELDCHOOSER_CLASS).addClass(FIELDS_CONTAINER_CLASS);
    that._dataChangedHandlers = [];
    var dataSource = this._dataSource;
    var currentState = that.option('applyChangesMode') !== 'instantly' && dataSource && dataSource.state();
    currentState && that.option('state') && dataSource.state(that.option('state'), true);

    if (layout === 0) {
      that._renderLayout0($container);
    } else if (layout === 1) {
      that._renderLayout1($container);
    } else {
      that._renderLayout2($container);
    }

    currentState && dataSource.state(currentState, true);
  },
  _renderContentImpl: function _renderContentImpl() {
    this.callBase();
    this.renderSortable();

    this._renderContextMenu();

    this.updateDimensions();
  },
  _fireContentReadyAction: function _fireContentReadyAction() {
    if (!this._dataSource || !this._dataSource.isLoading()) {
      this.callBase();
    }
  },
  _getContextMenuArgs: function _getContextMenuArgs(dxEvent) {
    var targetFieldElement = $(dxEvent.target).closest('.dx-area-field');
    var targetGroupElement = $(dxEvent.target).closest('.dx-area-fields');
    var field;
    var area;

    if (targetFieldElement.length) {
      var fieldCopy = targetFieldElement.data('field');

      if (fieldCopy) {
        field = this.getDataSource().field(fieldCopy.index) || fieldCopy;
      }
    }

    if (targetGroupElement.length) {
      area = targetGroupElement.attr('group');
    }

    return {
      event: dxEvent,
      field: field,
      area: area,
      items: []
    };
  },
  _renderContextMenu: function _renderContextMenu() {
    var that = this;
    var $container = that.$element();

    if (that._contextMenu) {
      that._contextMenu.$element().remove();
    }

    that._contextMenu = that._createComponent($(DIV).appendTo($container), ContextMenu, {
      onPositioning: function onPositioning(actionArgs) {
        var event = actionArgs.event;

        if (!event) {
          return;
        }

        var args = that._getContextMenuArgs(event);

        that._trigger('onContextMenuPreparing', args);

        if (args.items && args.items.length) {
          actionArgs.component.option('items', args.items);
        } else {
          actionArgs.cancel = true;
        }
      },
      target: $container,
      onItemClick: function onItemClick(params) {
        params.itemData.onItemClick && params.itemData.onItemClick(params);
      },
      cssClass: 'dx-pivotgridfieldchooser-context-menu'
    });
  },
  _createTreeItems: function _createTreeItems(fields, groupFieldNames, path) {
    var that = this;
    var isMeasure;
    var resultItems = [];
    var groupedItems = [];
    var groupFieldName = groupFieldNames[0];
    var fieldsByGroup = {};

    if (!groupFieldName) {
      each(fields, function (index, field) {
        var icon;

        if (field.isMeasure === true) {
          icon = 'measure';
        }

        if (field.isMeasure === false) {
          icon = field.groupName ? 'hierarchy' : 'dimension';
        }

        resultItems.push({
          index: field.index,
          field: field,
          key: field.dataField,
          selected: isDefined(field.area),
          text: field.caption || field.dataField,
          icon: icon,
          isMeasure: field.isMeasure,
          isDefault: field.isDefault
        });
      });
    } else {
      each(fields, function (index, field) {
        var groupName = field[groupFieldName] || '';
        fieldsByGroup[groupName] = fieldsByGroup[groupName] || [];
        fieldsByGroup[groupName].push(field);

        if (isMeasure === undefined) {
          isMeasure = true;
        }

        isMeasure = isMeasure && field.isMeasure === true;
      });
      each(fieldsByGroup, function (groupName, fields) {
        var currentPath = path ? path + '.' + groupName : groupName;

        var items = that._createTreeItems(fields, groupFieldNames.slice(1), currentPath);

        if (groupName) {
          groupedItems.push({
            key: groupName,
            text: groupName,
            path: currentPath,
            isMeasure: items.isMeasure,
            expanded: inArray(currentPath, that._expandedPaths) >= 0,
            items: items
          });
        } else {
          resultItems = items;
        }
      });
      resultItems = groupedItems.concat(resultItems);
      resultItems.isMeasure = isMeasure;
    }

    return resultItems;
  },
  _createFieldsDataSource: function _createFieldsDataSource(dataSource) {
    var fields = dataSource && dataSource.fields() || [];
    fields = fields.filter(field => {
      return field.visible !== false && !isDefined(field.groupIndex);
    });

    var treeItems = this._createTreeItems(fields, ['dimension', 'displayFolder']);

    foreachDataLevel(treeItems, function (items) {
      items.sort(compareItems);
    }, 0, 'items');
    return treeItems;
  },
  _renderFieldsTreeView: function _renderFieldsTreeView(container) {
    var that = this;
    var dataSource = that._dataSource;

    var treeView = that._createComponent(container, TreeView, {
      dataSource: that._createFieldsDataSource(dataSource),
      showCheckBoxesMode: 'normal',
      expandNodesRecursive: false,
      searchEnabled: that.option('allowSearch'),
      searchTimeout: that.option('searchTimeout'),
      itemTemplate: function itemTemplate(itemData, itemIndex, itemElement) {
        if (itemData.icon) {
          getImageContainer(itemData.icon).appendTo(itemElement);
        }

        $('<span>').toggleClass('dx-area-field', !itemData.items).data('field', itemData.field).text(itemData.text).appendTo(itemElement);
      },
      onItemCollapsed: function onItemCollapsed(e) {
        var index = inArray(e.itemData.path, that._expandedPaths);

        if (index >= 0) {
          that._expandedPaths.splice(index, 1);
        }
      },
      onItemExpanded: function onItemExpanded(e) {
        var index = inArray(e.itemData.path, that._expandedPaths);

        if (index < 0) {
          that._expandedPaths.push(e.itemData.path);
        }
      },
      onItemSelectionChanged: function onItemSelectionChanged(e) {
        var data = e.itemData;
        var field;
        var fields;
        var needSelectDefaultItem = true;
        var area;

        if (data.items) {
          if (data.selected) {
            treeView.unselectItem(data);
            return;
          }

          that._processDemandState(() => {
            fields = getDimensionFields(data, dataSource.fields());

            for (var i = 0; i < fields.length; i++) {
              if (fields[i].area) {
                needSelectDefaultItem = false;
                break;
              }
            }
          });

          if (needSelectDefaultItem) {
            var item = getFirstItem(data, function (item) {
              return item.isDefault;
            }) || getFirstItem(data, function (item) {
              return isDefined(item.index);
            });
            item && treeView.selectItem(item);
            return;
          }
        } else {
          field = dataSource.fields()[data.index];

          if (data.selected) {
            area = field.isMeasure ? 'data' : 'column';
          }

          if (field) {
            fields = [field];
          }
        }

        that._applyChanges(fields, {
          area: area,
          areaIndex: undefined
        });
      }
    });

    var dataChanged = function dataChanged() {
      var scrollable = getScrollable(container);
      var scrollTop = scrollable ? scrollable.scrollTop() : 0;
      treeView.option({
        dataSource: that._createFieldsDataSource(dataSource)
      });
      scrollable = getScrollable(container);

      if (scrollable) {
        scrollable.scrollTo({
          y: scrollTop
        });
        scrollable.update();
      }
    };

    that._dataChangedHandlers.push(dataChanged);
  },
  _renderAreaFields: function _renderAreaFields($container, area) {
    var that = this;
    var dataSource = that._dataSource;
    var fields = dataSource ? extend(true, [], dataSource.getAreaFields(area, true)) : [];
    $container.empty();
    each(fields, function (_, field) {
      if (field.visible !== false) {
        that.renderField(field, true).appendTo($container);
      }
    });
  },
  _renderArea: function _renderArea(container, area) {
    var that = this;
    var $areaContainer = $(DIV).addClass('dx-area').appendTo(container);
    var $fieldsHeaderContainer = $(DIV).addClass('dx-area-fields-header').appendTo($areaContainer);
    var caption = that.option('texts.' + area + 'Fields');
    var $fieldsContent;
    var render;
    $('<span>').addClass('dx-area-icon').addClass('dx-area-icon-' + area).appendTo($fieldsHeaderContainer);
    $('<span>').html('&nbsp;').appendTo($fieldsHeaderContainer);
    $('<span>').addClass('dx-area-caption').text(caption).appendTo($fieldsHeaderContainer);
    var $fieldsContainer = $(DIV).addClass('dx-area-fields').addClass(AREA_DRAG_CLASS).appendTo($areaContainer);

    if (area !== 'all') {
      $fieldsContainer.attr('group', area).attr('allow-scrolling', true);
      $fieldsContent = $(DIV).addClass('dx-area-field-container').appendTo($fieldsContainer);

      render = function render() {
        that._renderAreaFields($fieldsContent, area);
      };

      that._dataChangedHandlers.push(render);

      render();
      $fieldsContainer.dxScrollable();
    } else {
      $areaContainer.addClass('dx-all-fields');
      $fieldsContainer.addClass('dx-treeview-border-visible');

      that._renderFieldsTreeView($fieldsContainer);
    }
  },
  _getSortableOptions: function _getSortableOptions() {
    // TODO
    return {};
  },
  _adjustSortableOnChangedArgs: function _adjustSortableOnChangedArgs() {},
  resetTreeView: function resetTreeView() {
    var treeView = this.$element().find('.dx-treeview').dxTreeView('instance');

    if (treeView) {
      treeView.option('searchValue', '');
      treeView.collapseAll();
    }
  },
  applyChanges: function applyChanges() {
    var state = this.option('state');

    if (isDefined(state)) {
      this._dataSource.state(state);
    }
  },
  cancelChanges: function cancelChanges() {
    var dataSource = this._dataSource;

    if (!dataSource.isLoading()) {
      this.option('state', dataSource.state());
      return true;
    }

    return false;
  },
  getDataSource: function getDataSource() {
    return this._dataSource;
  },
  updateDimensions: function updateDimensions() {
    var $scrollableElements = this.$element().find('.dx-area .dx-scrollable');
    $scrollableElements.dxScrollable('update');
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible && hasWindow) {
      this.updateDimensions();
    }
  }
});
registerComponent('dxPivotGridFieldChooser', FieldChooser);
export default FieldChooser;
