/**
* DevExtreme (renovation/ui/scroll_view/utils/get_default_option_value.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isDesktop = isDesktop;
exports.getDefaultUseSimulatedScrollbar = getDefaultUseSimulatedScrollbar;
exports.getDefaultBounceEnabled = getDefaultBounceEnabled;
exports.getDefaultUseNative = getDefaultUseNative;
exports.getDefaultNativeRefreshStrategy = getDefaultNativeRefreshStrategy;

var _devices = _interopRequireDefault(require("../../../../core/devices"));

var _support = require("../../../../core/utils/support");

var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDesktop() {
  return !_devices.default.isSimulator() && _devices.default.real().deviceType === "desktop" && _devices.default.current().platform === "generic";
}

function getDefaultUseSimulatedScrollbar() {
  return !!_support.nativeScrolling && _devices.default.real().platform === "android" && !_browser.default.mozilla;
}

function getDefaultBounceEnabled() {
  return !isDesktop();
}

function getDefaultUseNative() {
  return !!_support.nativeScrolling;
}

function getDefaultNativeRefreshStrategy() {
  return _devices.default.real().platform === "android" ? "swipeDown" : "pullDown";
}
