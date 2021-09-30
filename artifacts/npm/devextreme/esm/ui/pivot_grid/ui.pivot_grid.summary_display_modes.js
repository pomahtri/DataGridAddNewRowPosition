/**
* DevExtreme (esm/ui/pivot_grid/ui.pivot_grid.summary_display_modes.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isFunction, isDefined, isObject } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { inArray } from '../../core/utils/array';
import { findField, foreachTree, setFieldProperty } from './ui.pivot_grid.utils';
var COLUMN = 'column';
var ROW = 'row';
var NULL = null;

var calculatePercentValue = function calculatePercentValue(value, totalValue) {
  var result = value / totalValue;

  if (!isDefined(value) || isNaN(result)) {
    result = NULL;
  }

  return result;
};

var _percentOfGrandTotal = function percentOfGrandTotal(e, dimension) {
  return calculatePercentValue(e.value(), e.grandTotal(dimension).value());
};

var percentOfParent = function percentOfParent(e, dimension) {
  var parent = e.parent(dimension);
  var parentValue = parent ? parent.value() : e.value();
  return calculatePercentValue(e.value(), parentValue);
};

var createAbsoluteVariationExp = function createAbsoluteVariationExp(allowCrossGroup) {
  return function (e) {
    var prevCell = e.prev(COLUMN, allowCrossGroup);
    var prevValue = prevCell && prevCell.value();

    if (isDefined(prevValue) && isDefined(e.value())) {
      return e.value() - prevValue;
    }

    return NULL;
  };
};

var createPercentVariationExp = function createPercentVariationExp(allowCrossGroup) {
  var absoluteExp = createAbsoluteVariationExp(allowCrossGroup);
  return function (e) {
    var absVar = absoluteExp(e);
    var prevCell = e.prev(COLUMN, allowCrossGroup);
    var prevValue = prevCell && prevCell.value();
    return absVar !== NULL && prevValue ? absVar / prevValue : NULL;
  };
};

var summaryDictionary = {
  percentOfColumnTotal: function percentOfColumnTotal(e) {
    return percentOfParent(e, ROW);
  },
  percentOfRowTotal: function percentOfRowTotal(e) {
    return percentOfParent(e, COLUMN);
  },
  percentOfColumnGrandTotal: function percentOfColumnGrandTotal(e) {
    return _percentOfGrandTotal(e, ROW);
  },
  percentOfRowGrandTotal: function percentOfRowGrandTotal(e) {
    return _percentOfGrandTotal(e, COLUMN);
  },
  percentOfGrandTotal: function percentOfGrandTotal(e) {
    return _percentOfGrandTotal(e);
  }
};

var getPrevCellCrossGroup = function getPrevCellCrossGroup(cell, direction) {
  if (!cell || !cell.parent(direction)) {
    return;
  }

  var prevCell = cell.prev(direction);

  if (!prevCell) {
    prevCell = getPrevCellCrossGroup(cell.parent(direction), direction);
  }

  return prevCell;
};

var createRunningTotalExpr = function createRunningTotalExpr(field) {
  if (!field.runningTotal) {
    return;
  }

  var direction = field.runningTotal === COLUMN ? ROW : COLUMN;
  return function (e) {
    var prevCell = field.allowCrossGroupCalculation ? getPrevCellCrossGroup(e, direction) : e.prev(direction, false);
    var value = e.value(true);
    var prevValue = prevCell && prevCell.value(true);

    if (isDefined(prevValue) && isDefined(value)) {
      value = prevValue + value;
    } else if (isDefined(prevValue)) {
      value = prevValue;
    }

    return value;
  };
};

function createCache() {
  return {
    fields: {},
    positions: {}
  };
}

function getFieldPos(descriptions, field, cache) {
  var fieldParams = {
    index: -1
  };

  if (!isObject(field)) {
    if (cache.fields[field]) {
      field = cache[field];
    } else {
      var allFields = descriptions.columns.concat(descriptions.rows).concat(descriptions.values);
      var fieldIndex = findField(allFields, field);
      field = cache[field] = allFields[fieldIndex];
    }
  }

  if (field) {
    var area = field.area || 'data';
    fieldParams = cache.positions[field.index] = cache.positions[field.index] || {
      area: area,
      index: inArray(field, descriptions[area === 'data' ? 'values' : area + 's'])
    };
  }

  return fieldParams;
}

function getPathFieldName(dimension) {
  return dimension === ROW ? '_rowPath' : '_columnPath';
}

var SummaryCell = function SummaryCell(columnPath, rowPath, data, descriptions, fieldIndex, fieldsCache) {
  this._columnPath = columnPath;
  this._rowPath = rowPath;
  this._fieldIndex = fieldIndex;
  this._fieldsCache = fieldsCache || createCache();
  this._data = data;
  this._descriptions = descriptions;
  var cell = data.values && data.values[rowPath[0].index] && data.values[rowPath[0].index][columnPath[0].index];

  if (cell) {
    cell.originalCell = cell.originalCell || cell.slice();
    cell.postProcessedFlags = cell.postProcessedFlags || [];
    this._cell = cell;
  }
};

SummaryCell.prototype = extend(SummaryCell.prototype, {
  _getPath: function _getPath(dimension) {
    return this[getPathFieldName(dimension)];
  },
  _getDimension: function _getDimension(dimension) {
    dimension = dimension === ROW ? 'rows' : 'columns';
    return this._descriptions[dimension];
  },
  _createCell: function _createCell(config) {
    var that = this;
    return new SummaryCell(config._columnPath || that._columnPath, config._rowPath || that._rowPath, that._data, that._descriptions, that._fieldIndex);
  },
  parent: function parent(direction) {
    var path = this._getPath(direction).slice();

    var config = {};
    path.shift();

    if (path.length) {
      config[getPathFieldName(direction)] = path;
      return this._createCell(config);
    }

    return NULL;
  },
  children: function children(direction) {
    var path = this._getPath(direction).slice();

    var item = path[0];
    var result = [];
    var cellConfig = {};

    if (item.children) {
      for (var i = 0; i < item.children.length; i++) {
        cellConfig[getPathFieldName(direction)] = [item.children[i]].concat(path.slice());
        result.push(this._createCell(cellConfig));
      }
    }

    return result;
  },
  grandTotal: function grandTotal(direction) {
    var config = {};
    var rowPath = this._rowPath;
    var columnPath = this._columnPath;

    var dimensionPath = this._getPath(direction);

    var pathFieldName = getPathFieldName(direction);

    if (!direction) {
      config._rowPath = [rowPath[rowPath.length - 1]];
      config._columnPath = [columnPath[columnPath.length - 1]];
    } else {
      config[pathFieldName] = [dimensionPath[dimensionPath.length - 1]];
    }

    return this._createCell(config);
  },
  next: function next(direction, allowCrossGroup) {
    var currentPath = this._getPath(direction);

    var item = currentPath[0];
    var parent = this.parent(direction);
    var siblings;

    if (parent) {
      var index = inArray(item, currentPath[1].children);
      siblings = parent.children(direction);

      if (siblings[index + 1]) {
        return siblings[index + 1];
      }
    }

    if (allowCrossGroup && parent) {
      do {
        parent = parent.next(direction, allowCrossGroup);
        siblings = parent ? parent.children(direction) : [];
      } while (parent && !siblings.length);

      return siblings[0] || NULL;
    }

    return NULL;
  },
  prev: function prev(direction, allowCrossGroup) {
    var currentPath = this._getPath(direction);

    var item = currentPath[0];
    var parent = this.parent(direction);
    var siblings;

    if (parent) {
      var index = inArray(item, currentPath[1].children);
      siblings = parent.children(direction);

      if (siblings[index - 1]) {
        return siblings[index - 1];
      }
    }

    if (allowCrossGroup && parent) {
      do {
        parent = parent.prev(direction, allowCrossGroup);
        siblings = parent ? parent.children(direction) : [];
      } while (parent && !siblings.length);

      return siblings[siblings.length - 1] || NULL;
    }

    return NULL;
  },
  cell: function cell() {
    return this._cell;
  },
  field: function field(area) {
    if (area === 'data') {
      return this._descriptions.values[this._fieldIndex];
    }

    var path = this._getPath(area);

    var descriptions = this._getDimension(area);

    var field = descriptions[path.length - 2];
    return field || NULL;
  },
  child: function child(direction, fieldValue) {
    var children = this.children(direction);

    for (var i = 0; i < children.length; i++) {
      var childLevelField = childLevelField || children[i].field(direction);

      if (children[i].value(childLevelField) === fieldValue) {
        return children[i];
      }
    }

    return NULL;
  },
  slice: function slice(field, value) {
    var that = this;
    var config = {};
    var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
    var area = fieldPos.area;
    var fieldIndex = fieldPos.index;
    var sliceCell = NULL;
    var newPath = [];

    if (area === ROW || area === COLUMN) {
      var path = this._getPath(area).slice();

      var level = fieldIndex !== -1 && path.length - 2 - fieldIndex;

      if (path[level]) {
        newPath[path.length - 1] = path[path.length - 1];

        for (var i = level; i >= 0; i--) {
          if (path[i + 1]) {
            var childItems = path[i + 1].children || [];
            var currentValue = i === level ? value : path[i].value;
            path[i] = undefined;

            for (var childIndex = 0; childIndex < childItems.length; childIndex++) {
              if (childItems[childIndex].value === currentValue) {
                path[i] = childItems[childIndex];
                break;
              }
            }
          }

          if (path[i] === undefined) {
            return sliceCell;
          }
        }

        config[getPathFieldName(area)] = path;
        sliceCell = that._createCell(config);
      }
    }

    return sliceCell;
  },
  value: function value(arg1, arg2) {
    var cell = this._cell;
    var fieldIndex = this._fieldIndex;
    var fistArgIsBoolean = arg1 === true || arg1 === false;
    var field = !fistArgIsBoolean ? arg1 : NULL;
    var needCalculatedValue = fistArgIsBoolean && arg1 || arg2;

    if (isDefined(field)) {
      var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
      fieldIndex = fieldPos.index;

      if (fieldPos.area !== 'data') {
        var path = this._getPath(fieldPos.area);

        var level = fieldIndex !== -1 && path.length - 2 - fieldIndex;
        return path[level] && path[level].value;
      }
    }

    if (cell && cell.originalCell) {
      return needCalculatedValue ? cell[fieldIndex] : cell.originalCell[fieldIndex];
    }

    return NULL;
  },

  isPostProcessed(field) {
    var fieldIndex = this._fieldIndex;

    if (isDefined(field)) {
      var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
      fieldIndex = fieldPos.index;

      if (fieldPos.area !== 'data') {
        return false;
      }
    }

    return !!(this._cell && this._cell.postProcessedFlags[fieldIndex]);
  }

});

function getExpression(field) {
  var summaryDisplayMode = field.summaryDisplayMode;
  var crossGroupCalculation = field.allowCrossGroupCalculation;
  var expression = NULL;

  if (isFunction(field.calculateSummaryValue)) {
    expression = field.calculateSummaryValue;
  } else if (summaryDisplayMode) {
    if (summaryDisplayMode === 'absoluteVariation') {
      expression = createAbsoluteVariationExp(crossGroupCalculation);
    } else if (summaryDisplayMode === 'percentVariation') {
      expression = createPercentVariationExp(crossGroupCalculation);
    } else {
      expression = summaryDictionary[summaryDisplayMode];
    }

    if (expression && !field.format && summaryDisplayMode.indexOf('percent') !== -1) {
      setFieldProperty(field, 'format', 'percent');
    }
  }

  return expression;
}

function processDataCell(data, rowIndex, columnIndex, isRunningTotalCalculation) {
  var values = data.values[rowIndex][columnIndex] = data.values[rowIndex][columnIndex] || [];
  var originalCell = values.originalCell;

  if (!originalCell) {
    return;
  } // T571071


  if (values.allowResetting || !isRunningTotalCalculation) {
    data.values[rowIndex][columnIndex] = originalCell.slice();
  }

  data.values[rowIndex][columnIndex].allowResetting = isRunningTotalCalculation;
}

export function applyDisplaySummaryMode(descriptions, data) {
  var expressions = [];
  var columnElements = [{
    index: data.grandTotalColumnIndex,
    children: data.columns
  }];
  var rowElements = [{
    index: data.grandTotalRowIndex,
    children: data.rows
  }];
  var valueFields = descriptions.values;
  var fieldsCache = createCache();
  data.values = data.values || [];
  foreachTree(columnElements, columnPath => {
    columnPath[0].isEmpty = [];
  }, false);
  foreachTree(rowElements, function (rowPath) {
    var rowItem = rowPath[0];
    rowItem.isEmpty = [];
    data.values[rowItem.index] = data.values[rowItem.index] || [];
    foreachTree(columnElements, function (columnPath) {
      var columnItem = columnPath[0];
      var isEmptyCell;
      processDataCell(data, rowItem.index, columnItem.index, false);

      for (var i = 0; i < valueFields.length; i++) {
        var field = valueFields[i];
        var expression = expressions[i] = expressions[i] === undefined ? getExpression(field) : expressions[i];
        isEmptyCell = false;

        if (expression) {
          var expressionArg = new SummaryCell(columnPath, rowPath, data, descriptions, i, fieldsCache);
          var cell = expressionArg.cell();
          var value = cell[i] = expression(expressionArg);
          cell.postProcessedFlags[i] = true;
          isEmptyCell = value === null || value === undefined;
        }

        if (columnItem.isEmpty[i] === undefined) {
          columnItem.isEmpty[i] = true;
        }

        if (rowItem.isEmpty[i] === undefined) {
          rowItem.isEmpty[i] = true;
        }

        if (!isEmptyCell) {
          rowItem.isEmpty[i] = columnItem.isEmpty[i] = false;
        }
      }
    }, false);
  }, false);
  data.isEmptyGrandTotalRow = rowElements[0].isEmpty;
  data.isEmptyGrandTotalColumn = columnElements[0].isEmpty;
}
export function applyRunningTotal(descriptions, data) {
  var expressions = [];
  var columnElements = [{
    index: data.grandTotalColumnIndex,
    children: data.columns
  }];
  var rowElements = [{
    index: data.grandTotalRowIndex,
    children: data.rows
  }];
  var valueFields = descriptions.values;
  var fieldsCache = createCache();
  data.values = data.values || [];
  foreachTree(rowElements, function (rowPath) {
    var rowItem = rowPath[0];
    data.values[rowItem.index] = data.values[rowItem.index] || [];
    foreachTree(columnElements, function (columnPath) {
      var columnItem = columnPath[0];
      processDataCell(data, rowItem.index, columnItem.index, true);

      for (var i = 0; i < valueFields.length; i++) {
        var field = valueFields[i];
        var expression = expressions[i] = expressions[i] === undefined ? createRunningTotalExpr(field) : expressions[i];

        if (expression) {
          var expressionArg = new SummaryCell(columnPath, rowPath, data, descriptions, i, fieldsCache);
          var cell = expressionArg.cell();
          cell[i] = expression(expressionArg);
          cell.postProcessedFlags[i] = true;
        }
      }
    }, false);
  }, false);
}
export function createMockSummaryCell(descriptions, fields, indices) {
  var summaryCell = new SummaryCell([], [], {}, descriptions, 0);

  summaryCell.value = function (fieldId) {
    if (isDefined(fieldId)) {
      var index = findField(fields, fieldId);
      var field = fields[index];

      if (!indices[index] && field && !isDefined(field.area)) {
        descriptions.values.push(field);
        indices[index] = true;
      }
    }
  };

  summaryCell.grandTotal = function () {
    return this;
  };

  summaryCell.children = function () {
    return [];
  };

  return summaryCell;
}
