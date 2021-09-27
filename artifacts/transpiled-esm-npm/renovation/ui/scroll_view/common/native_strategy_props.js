"use strict";

exports.ScrollableNativeProps = void 0;

var _support = require("../../../../core/utils/support");

var _devices = _interopRequireDefault(require("../../../../core/devices"));

var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));

var _base_scrollable_props = require("./base_scrollable_props");

var _get_default_option_value = require("../utils/get_default_option_value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ScrollableNativeProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_scrollable_props.BaseScrollableProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
  showScrollbar: "onScroll"
}, {
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
exports.ScrollableNativeProps = ScrollableNativeProps;