/**
* DevExtreme (esm/localization/utils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { sign } from '../core/utils/math';
var DECIMAL_BASE = 10;

function roundByAbs(value) {
  var valueSign = sign(value);
  return valueSign * Math.round(Math.abs(value));
}

function adjustValue(value, precision) {
  var precisionMultiplier = Math.pow(DECIMAL_BASE, precision);
  var roundMultiplier = precisionMultiplier * DECIMAL_BASE;
  var intermediateValue = value * roundMultiplier / DECIMAL_BASE;
  return roundByAbs(intermediateValue) / precisionMultiplier;
}

export function toFixed(value, precision) {
  var valuePrecision = precision || 0;
  var adjustedValue = valuePrecision > 0 ? adjustValue(...arguments) : value;
  return adjustedValue.toFixed(valuePrecision);
}
