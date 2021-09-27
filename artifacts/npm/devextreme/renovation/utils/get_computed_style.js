/**
* DevExtreme (renovation/utils/get_computed_style.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = getElementComputedStyle;

var _window = require("../../core/utils/window");

var window = (0, _window.getWindow)();

function getElementComputedStyle(el) {
  var _window$getComputedSt;

  return el ? (_window$getComputedSt = window.getComputedStyle) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.call(window, el) : null;
}

module.exports = exports.default;
module.exports.default = exports.default;
