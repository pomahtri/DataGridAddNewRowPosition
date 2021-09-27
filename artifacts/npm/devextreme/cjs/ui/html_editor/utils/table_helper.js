/**
* DevExtreme (cjs/ui/html_editor/utils/table_helper.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getTableFormats = getTableFormats;
exports.getTableOperationHandler = getTableOperationHandler;
exports.unfixTableWidth = unfixTableWidth;
exports.getColumnElements = getColumnElements;
exports.getAutoSizedElements = getAutoSizedElements;
exports.setLineElementsAttrValue = setLineElementsAttrValue;
exports.getLineElements = getLineElements;
exports.getRowElements = getRowElements;
exports.TABLE_OPERATIONS = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _type = require("../../../core/utils/type");

var _iterator = require("../../../core/utils/iterator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TABLE_FORMATS = ['table', 'tableHeaderCell'];
var TABLE_OPERATIONS = ['insertTable', 'insertHeaderRow', 'insertRowAbove', 'insertRowBelow', 'insertColumnLeft', 'insertColumnRight', 'deleteColumn', 'deleteRow', 'deleteTable', 'cellProperties', 'tableProperties'];
exports.TABLE_OPERATIONS = TABLE_OPERATIONS;

function getTableFormats(quill) {
  var tableModule = quill.getModule('table'); // backward compatibility with an old devextreme-quill packages

  return tableModule !== null && tableModule !== void 0 && tableModule.tableFormats ? tableModule.tableFormats() : TABLE_FORMATS;
}

function getTableOperationHandler(quill, operationName) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  return function () {
    var table = quill.getModule('table');

    if (!table) {
      return;
    }

    quill.focus();
    return table[operationName].apply(table, rest);
  };
}

function unfixTableWidth($table) {
  $table.css('width', 'initial');
}

function getColumnElements($table) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return $table.find('tr').eq(index).find('th, td');
}

function getAutoSizedElements($table) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
  var result = [];
  var isHorizontal = direction === 'horizontal';
  var $lineElements = isHorizontal ? getColumnElements($table) : getRowElements($table);
  $lineElements.each(function (index, element) {
    var $element = (0, _renderer.default)(element);

    if (!(0, _type.isDefined)($element.attr(isHorizontal ? 'width' : 'height'))) {
      result.push($element);
    }
  });
  return result;
}

function setLineElementsAttrValue($lineElements, property, value) {
  (0, _iterator.each)($lineElements, function (i, element) {
    (0, _renderer.default)(element).attr(property, value + 'px');
  });
}

function getLineElements($table, index) {
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'horizontal';
  return direction === 'horizontal' ? getRowElements($table, index) : getColumnElements($table, index);
}

function getRowElements($table) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return $table.find("th:nth-child(".concat(1 + index, "), td:nth-child(").concat(1 + index, ")"));
}
