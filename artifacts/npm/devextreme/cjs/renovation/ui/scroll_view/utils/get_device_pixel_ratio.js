/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_device_pixel_ratio.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDevicePixelRatio = getDevicePixelRatio;

var _window = require("../../../../core/utils/window");

function getDevicePixelRatio() {
  return (0, _window.hasWindow)() ? (0, _window.getWindow)().devicePixelRatio : 1;
}
