/**
* DevExtreme (cjs/renovation/ui/scroll_view/common/scrollable_props.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ScrollableProps = void 0;

var _devices = _interopRequireDefault(require("../../../../core/devices"));

var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));

var _simulated_strategy_props = require("./simulated_strategy_props");

var _support = require("../../../../core/utils/support");

var _get_default_option_value = require("../utils/get_default_option_value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ScrollableProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_simulated_strategy_props.ScrollableSimulatedProps), Object.getOwnPropertyDescriptors(Object.defineProperties({}, {
  useNative: {
    get: function get() {
      return (0, _get_default_option_value.getDefaultUseNative)();
    },
    configurable: true,
    enumerable: true
  },
  useSimulatedScrollbar: {
    get: function get() {
      return !!_support.nativeScrolling && _devices.default.real().platform === "android" && !_browser.default.mozilla;
    },
    configurable: true,
    enumerable: true
  },
  refreshStrategy: {
    get: function get() {
      return (0, _get_default_option_value.getDefaultNativeRefreshStrategy)();
    },
    configurable: true,
    enumerable: true
  }
}))));
exports.ScrollableProps = ScrollableProps;
