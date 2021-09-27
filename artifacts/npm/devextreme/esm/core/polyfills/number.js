/**
* DevExtreme (esm/core/polyfills/number.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { hasWindow, getWindow } from '../../core/utils/window';
var number = hasWindow() ? getWindow().Number : Number;

number.isFinite = number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};

export default number;
