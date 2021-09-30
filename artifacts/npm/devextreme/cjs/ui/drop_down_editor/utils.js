/**
* DevExtreme (cjs/ui/drop_down_editor/utils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getSizeValue = exports.getElementWidth = void 0;

var _size = require("../../core/utils/size");

var _window = require("../../core/utils/window");

var getElementWidth = function getElementWidth($element) {
  if ((0, _window.hasWindow)()) {
    return (0, _size.getOuterWidth)($element);
  }
};

exports.getElementWidth = getElementWidth;

var getSizeValue = function getSizeValue(size) {
  if (size === null) {
    size = undefined;
  }

  if (typeof size === 'function') {
    size = size();
  }

  return size;
};

exports.getSizeValue = getSizeValue;
