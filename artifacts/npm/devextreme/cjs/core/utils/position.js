/**
* DevExtreme (cjs/core/utils/position.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDefaultAlignment = exports.getBoundingRect = void 0;

var _config = _interopRequireDefault(require("../config"));

var _type = require("../utils/type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDefaultAlignment = function getDefaultAlignment(isRtlEnabled) {
  var rtlEnabled = isRtlEnabled !== null && isRtlEnabled !== void 0 ? isRtlEnabled : (0, _config.default)().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};

exports.getDefaultAlignment = getDefaultAlignment;

var getBoundingRect = function getBoundingRect(element) {
  if ((0, _type.isWindow)(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }

  return element.getBoundingClientRect();
};

exports.getBoundingRect = getBoundingRect;
