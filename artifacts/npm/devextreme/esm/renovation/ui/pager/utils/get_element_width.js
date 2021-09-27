/**
* DevExtreme (esm/renovation/ui/pager/utils/get_element_width.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import getElementComputedStyle from "../../../utils/get_computed_style";
import { toNumber } from "../../../utils/type_conversion";
export function getElementStyle(name, element) {
  var _getElementComputedSt;

  var computedStyle = (_getElementComputedSt = getElementComputedStyle(element)) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : {};
  return toNumber(computedStyle[name]);
}
export function getElementWidth(element) {
  return getElementStyle("width", element);
}
export function getElementMinWidth(element) {
  return getElementStyle("minWidth", element);
}
