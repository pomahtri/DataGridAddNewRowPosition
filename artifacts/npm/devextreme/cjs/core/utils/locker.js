/**
* DevExtreme (cjs/core/utils/locker.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _errors = _interopRequireDefault(require("../errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Locker = function Locker() {
  var info = {};

  var currentCount = function currentCount(lockName) {
    return info[lockName] || 0;
  };

  return {
    obtain: function obtain(lockName) {
      info[lockName] = currentCount(lockName) + 1;
    },
    release: function release(lockName) {
      var count = currentCount(lockName);

      if (count < 1) {
        throw _errors.default.Error('E0014');
      }

      if (count === 1) {
        delete info[lockName];
      } else {
        info[lockName] = count - 1;
      }
    },
    locked: function locked(lockName) {
      return currentCount(lockName) > 0;
    }
  };
};

var _default = Locker;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
