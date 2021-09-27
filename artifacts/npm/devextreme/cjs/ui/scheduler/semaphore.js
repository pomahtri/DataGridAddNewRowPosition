/**
* DevExtreme (cjs/ui/scheduler/semaphore.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var Semaphore = /*#__PURE__*/function () {
  function Semaphore() {
    this.counter = 0;
  }

  var _proto = Semaphore.prototype;

  _proto.isFree = function isFree() {
    return this.counter === 0;
  };

  _proto.take = function take() {
    this.counter++;
  };

  _proto.release = function release() {
    this.counter--;

    if (this.counter < 0) {
      this.counter = 0;
    }
  };

  return Semaphore;
}();

exports.default = Semaphore;
module.exports = exports.default;
module.exports.default = exports.default;
