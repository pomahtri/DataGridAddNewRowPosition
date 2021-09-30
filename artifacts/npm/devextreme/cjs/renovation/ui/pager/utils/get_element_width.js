/**
* DevExtreme (cjs/renovation/ui/pager/utils/get_element_width.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getElementStyle = getElementStyle;
exports.getElementWidth = getElementWidth;
exports.getElementMinWidth = getElementMinWidth;

var _get_computed_style = _interopRequireDefault(require("../../../utils/get_computed_style"));

var _type_conversion = require("../../../utils/type_conversion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementStyle(name, element) {
  var _getElementComputedSt;

  var computedStyle = (_getElementComputedSt = (0, _get_computed_style.default)(element)) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : {};
  return (0, _type_conversion.toNumber)(computedStyle[name]);
}

function getElementWidth(element) {
  return getElementStyle("width", element);
}

function getElementMinWidth(element) {
  return getElementStyle("minWidth", element);
}
