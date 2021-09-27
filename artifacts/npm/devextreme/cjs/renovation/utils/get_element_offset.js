/**
* DevExtreme (cjs/renovation/utils/get_element_offset.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getElementOffset = getElementOffset;

var _window = require("../../core/utils/window");

var window = (0, _window.getWindow)();
var DEFAULT_OFFSET = {
  top: 0,
  left: 0
};

function getElementOffset(el) {
  if (el && (0, _window.hasWindow)()) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
  }

  return DEFAULT_OFFSET;
}
