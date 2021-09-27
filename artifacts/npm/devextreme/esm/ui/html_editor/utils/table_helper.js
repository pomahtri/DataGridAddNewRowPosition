/**
* DevExtreme (esm/ui/html_editor/utils/table_helper.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
import { each } from '../../../core/utils/iterator';
var TABLE_FORMATS = ['table', 'tableHeaderCell'];
var TABLE_OPERATIONS = ['insertTable', 'insertHeaderRow', 'insertRowAbove', 'insertRowBelow', 'insertColumnLeft', 'insertColumnRight', 'deleteColumn', 'deleteRow', 'deleteTable', 'cellProperties', 'tableProperties'];

function getTableFormats(quill) {
  var tableModule = quill.getModule('table'); // backward compatibility with an old devextreme-quill packages

  return tableModule !== null && tableModule !== void 0 && tableModule.tableFormats ? tableModule.tableFormats() : TABLE_FORMATS;
}

function getTableOperationHandler(quill, operationName) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  return () => {
    var table = quill.getModule('table');

    if (!table) {
      return;
    }

    quill.focus();
    return table[operationName](...rest);
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
  $lineElements.each((index, element) => {
    var $element = $(element);

    if (!isDefined($element.attr(isHorizontal ? 'width' : 'height'))) {
      result.push($element);
    }
  });
  return result;
}

function setLineElementsAttrValue($lineElements, property, value) {
  each($lineElements, (i, element) => {
    $(element).attr(property, value + 'px');
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

export { TABLE_OPERATIONS, getTableFormats, getTableOperationHandler, unfixTableWidth, getColumnElements, getAutoSizedElements, setLineElementsAttrValue, getLineElements, getRowElements };
