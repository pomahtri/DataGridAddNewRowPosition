/**
* DevExtreme (esm/ui/grid_core/ui.grid_core.filter_sync.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import modules from './ui.grid_core.modules';
import { getDefaultOperation, getMatchedConditions, syncFilters, removeFieldConditionsFromFilter, addItem, getNormalizedFilter, getFilterExpression, filterHasField } from '../filter_builder/utils';
import errors from '../widget/ui.errors';
import gridCoreUtils from './ui.grid_core.utils';
import filterUtils from '../shared/filtering';
import { anyOf, noneOf } from './ui.grid_core.filter_custom_operations';
var FILTER_ROW_OPERATIONS = ['=', '<>', '<', '<=', '>', '>=', 'notcontains', 'contains', 'startswith', 'endswith', 'between'];
var FILTER_TYPES_INCLUDE = 'include';
var FILTER_TYPES_EXCLUDE = 'exclude';

function getColumnIdentifier(column) {
  return column.dataField || column.name;
}

function checkForErrors(columns) {
  columns.forEach(column => {
    var identifier = getColumnIdentifier(column);
    if (!isDefined(identifier) && column.allowFiltering) throw new errors.Error('E1049', column.caption);
  });
}

var FilterSyncController = modules.Controller.inherit(function () {
  var getEmptyFilterValues = function getEmptyFilterValues() {
    return {
      filterType: FILTER_TYPES_INCLUDE,
      filterValues: undefined
    };
  };

  var canSyncHeaderFilterWithFilterRow = function canSyncHeaderFilterWithFilterRow(column) {
    var filterValues = column.filterValues || [];
    return !filterUtils.getGroupInterval(column) && !(column.headerFilter && column.headerFilter.dataSource) || filterValues.length === 1 && filterValues[0] === null;
  };

  var getHeaderFilterFromCondition = function getHeaderFilterFromCondition(headerFilterCondition, column) {
    if (!headerFilterCondition) {
      return getEmptyFilterValues();
    }

    var filterType;
    var selectedFilterOperation = headerFilterCondition[1];
    var value = headerFilterCondition[2];
    var hasArrayValue = Array.isArray(value);

    if (!hasArrayValue) {
      if (!canSyncHeaderFilterWithFilterRow(column)) {
        return getEmptyFilterValues();
      }
    }

    switch (selectedFilterOperation) {
      case 'anyof':
      case '=':
        filterType = FILTER_TYPES_INCLUDE;
        break;

      case 'noneof':
      case '<>':
        filterType = FILTER_TYPES_EXCLUDE;
        break;

      default:
        return getEmptyFilterValues();
    }

    return {
      filterType: filterType,
      filterValues: hasArrayValue ? value : [value]
    };
  };

  var getConditionFromFilterRow = function getConditionFromFilterRow(column) {
    var value = column.filterValue;

    if (isDefined(value)) {
      var operation = column.selectedFilterOperation || column.defaultFilterOperation || getDefaultOperation(column);
      var filter = [getColumnIdentifier(column), operation, column.filterValue];
      return filter;
    } else {
      return null;
    }
  };

  var getConditionFromHeaderFilter = function getConditionFromHeaderFilter(column) {
    var selectedOperation;
    var value;
    var filterValues = column.filterValues;
    if (!filterValues) return null;

    if (filterValues.length === 1 && canSyncHeaderFilterWithFilterRow(column) && !Array.isArray(filterValues[0])) {
      column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = '<>' : selectedOperation = '=';
      value = filterValues[0];
    } else {
      column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = 'noneof' : selectedOperation = 'anyof';
      value = filterValues;
    }

    return [getColumnIdentifier(column), selectedOperation, value];
  };

  var updateHeaderFilterCondition = function updateHeaderFilterCondition(columnsController, column, headerFilterCondition) {
    var headerFilter = getHeaderFilterFromCondition(headerFilterCondition, column);
    columnsController.columnOption(getColumnIdentifier(column), headerFilter);
  };

  var updateFilterRowCondition = function updateFilterRowCondition(columnsController, column, condition) {
    var filterRowOptions;
    var selectedFilterOperation = condition === null || condition === void 0 ? void 0 : condition[1];
    var filterValue = condition === null || condition === void 0 ? void 0 : condition[2];
    var filterOperations = column.filterOperations || column.defaultFilterOperations;

    if ((!filterOperations || filterOperations.indexOf(selectedFilterOperation) >= 0 || selectedFilterOperation === column.defaultFilterOperation) && FILTER_ROW_OPERATIONS.indexOf(selectedFilterOperation) >= 0 && filterValue !== null) {
      if (selectedFilterOperation === column.defaultFilterOperation && !isDefined(column.selectedFilterOperation)) {
        selectedFilterOperation = column.selectedFilterOperation;
      }

      filterRowOptions = {
        filterValue,
        selectedFilterOperation
      };
    } else {
      filterRowOptions = {
        filterValue: undefined,
        selectedFilterOperation: undefined
      };
    }

    columnsController.columnOption(getColumnIdentifier(column), filterRowOptions);
  };

  return {
    syncFilterValue: function syncFilterValue() {
      var that = this;
      var columnsController = that.getController('columns');
      var columns = columnsController.getFilteringColumns();
      this._skipSyncColumnOptions = true;
      columns.forEach(function (column) {
        var filterConditions = getMatchedConditions(that.option('filterValue'), getColumnIdentifier(column));

        if (filterConditions.length === 1) {
          var filterCondition = filterConditions[0];
          updateHeaderFilterCondition(columnsController, column, filterCondition);
          updateFilterRowCondition(columnsController, column, filterCondition);
        } else {
          isDefined(column.filterValues) && updateHeaderFilterCondition(columnsController, column);
          isDefined(column.filterValue) && updateFilterRowCondition(columnsController, column);
        }
      });
      this._skipSyncColumnOptions = false;
    },
    _initSync: function _initSync() {
      var columns = this.getController('columns').getColumns();
      var dataController = this.getController('data');
      var pageIndex = dataController.pageIndex();
      checkForErrors(columns);

      if (!this.option('filterValue')) {
        var filteringColumns = this.getController('columns').getFilteringColumns();
        var filterValue = this.getFilterValueFromColumns(filteringColumns);
        this.option('filterValue', filterValue);
      }

      this.syncFilterValue();
      dataController.pageIndex(pageIndex);
    },
    init: function init() {
      var dataController = this.getController('data');

      if (dataController.isFilterSyncActive()) {
        if (this.getController('columns').isAllDataTypesDefined()) {
          this._initSync();
        } else {
          dataController.dataSourceChanged.add(() => this._initSync());
        }
      }
    },
    _getSyncFilterRow: function _getSyncFilterRow(filterValue, column) {
      var filter = getConditionFromFilterRow(column);

      if (isDefined(filter)) {
        return syncFilters(filterValue, filter);
      } else {
        return removeFieldConditionsFromFilter(filterValue, getColumnIdentifier(column));
      }
    },
    _getSyncHeaderFilter: function _getSyncHeaderFilter(filterValue, column) {
      var filter = getConditionFromHeaderFilter(column);

      if (filter) {
        return syncFilters(filterValue, filter);
      } else {
        return removeFieldConditionsFromFilter(filterValue, getColumnIdentifier(column));
      }
    },
    getFilterValueFromColumns: function getFilterValueFromColumns(columns) {
      if (!this.getController('data').isFilterSyncActive()) {
        return null;
      }

      var filterValue = ['and'];
      columns && columns.forEach(column => {
        var headerFilter = getConditionFromHeaderFilter(column);
        var filterRow = getConditionFromFilterRow(column);
        headerFilter && addItem(headerFilter, filterValue);
        filterRow && addItem(filterRow, filterValue);
      });
      return getNormalizedFilter(filterValue);
    },
    syncFilterRow: function syncFilterRow(column, value) {
      this.option('filterValue', this._getSyncFilterRow(this.option('filterValue'), column));
    },
    syncHeaderFilter: function syncHeaderFilter(column) {
      this.option('filterValue', this._getSyncHeaderFilter(this.option('filterValue'), column));
    },
    getCustomFilterOperations: function getCustomFilterOperations() {
      var filterBuilderCustomOperations = this.option('filterBuilder.customOperations') || [];
      return [anyOf(this.component), noneOf(this.component)].concat(filterBuilderCustomOperations);
    },
    publicMethods: function publicMethods() {
      return ['getCustomFilterOperations'];
    }
  };
}());
var DataControllerFilterSyncExtender = {
  isFilterSyncActive: function isFilterSyncActive() {
    var filterSyncEnabledValue = this.option('filterSyncEnabled');
    return filterSyncEnabledValue === 'auto' ? this.option('filterPanel.visible') : filterSyncEnabledValue;
  },
  skipCalculateColumnFilters: function skipCalculateColumnFilters() {
    return isDefined(this.option('filterValue')) && this.isFilterSyncActive();
  },
  _calculateAdditionalFilter: function _calculateAdditionalFilter() {
    var that = this;

    if (that.option('filterPanel.filterEnabled') === false) {
      return that.callBase();
    }

    var filters = [that.callBase()];
    var columns = that.getController('columns').getFilteringColumns();
    var filterValue = that.option('filterValue');

    if (that.isFilterSyncActive()) {
      var currentColumn = that.getController('headerFilter').getCurrentColumn();

      if (currentColumn && filterValue) {
        filterValue = removeFieldConditionsFromFilter(filterValue, getColumnIdentifier(currentColumn));
      }
    }

    var customOperations = that.getController('filterSync').getCustomFilterOperations();
    var calculatedFilterValue = getFilterExpression(filterValue, columns, customOperations, 'filterBuilder');

    if (calculatedFilterValue) {
      filters.push(calculatedFilterValue);
    }

    return gridCoreUtils.combineFilters(filters);
  },
  _parseColumnPropertyName: function _parseColumnPropertyName(fullName) {
    var matched = fullName.match(/.*\.(.*)/);

    if (matched) {
      return matched[1];
    } else {
      return null;
    }
  },
  clearFilter: function clearFilter(filterName) {
    this.component.beginUpdate();

    if (arguments.length > 0) {
      if (filterName === 'filterValue') {
        this.option('filterValue', null);
      }

      this.callBase(filterName);
    } else {
      this.option('filterValue', null);
      this.callBase();
    }

    this.component.endUpdate();
  },
  optionChanged: function optionChanged(args) {
    switch (args.name) {
      case 'filterValue':
        this._applyFilter();

        this.isFilterSyncActive() && this.getController('filterSync').syncFilterValue();
        args.handled = true;
        break;

      case 'filterSyncEnabled':
        args.handled = true;
        break;

      case 'columns':
        if (this.isFilterSyncActive()) {
          var column = this.getController('columns').getColumnByPath(args.fullName);
          var filterSyncController = this.getController('filterSync');

          if (column && !filterSyncController._skipSyncColumnOptions) {
            var propertyName = this._parseColumnPropertyName(args.fullName);

            filterSyncController._skipSyncColumnOptions = true;

            if ('filterType' === propertyName) {
              if (FILTER_TYPES_EXCLUDE === args.value || FILTER_TYPES_EXCLUDE === args.previousValue) {
                filterSyncController.syncHeaderFilter(column);
              }
            } else if ('filterValues' === propertyName) {
              filterSyncController.syncHeaderFilter(column);
            } else if (['filterValue', 'selectedFilterOperation'].indexOf(propertyName) > -1) {
              filterSyncController.syncFilterRow(column, column.filterValue);
            }

            filterSyncController._skipSyncColumnOptions = false;
          }
        }

        this.callBase(args);
        break;

      default:
        this.callBase(args);
    }
  }
};
var ColumnHeadersViewFilterSyncExtender = {
  _isHeaderFilterEmpty: function _isHeaderFilterEmpty(column) {
    if (this.getController('data').isFilterSyncActive()) {
      return !filterHasField(this.option('filterValue'), getColumnIdentifier(column));
    }

    return this.callBase(column);
  },
  _needUpdateFilterIndicators: function _needUpdateFilterIndicators() {
    return !this.getController('data').isFilterSyncActive();
  },
  optionChanged: function optionChanged(args) {
    if (args.name === 'filterValue') {
      this._updateHeaderFilterIndicators();
    } else {
      this.callBase(args);
    }
  }
};
export var filterSyncModule = {
  defaultOptions: function defaultOptions() {
    return {
      filterValue: null,
      filterSyncEnabled: 'auto'
    };
  },
  controllers: {
    filterSync: FilterSyncController
  },
  extenders: {
    controllers: {
      data: DataControllerFilterSyncExtender
    },
    views: {
      columnHeadersView: ColumnHeadersViewFilterSyncExtender
    }
  }
};
