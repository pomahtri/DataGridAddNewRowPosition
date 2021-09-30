/**
* DevExtreme (cjs/mobile/hide_callback.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.hideCallback = void 0;

var _array = require("../core/utils/array");

var hideCallback = function () {
  var callbacks = [];
  return {
    add: function add(callback) {
      var indexOfCallback = (0, _array.inArray)(callback, callbacks);

      if (indexOfCallback === -1) {
        callbacks.push(callback);
      }
    },
    remove: function remove(callback) {
      var indexOfCallback = (0, _array.inArray)(callback, callbacks);

      if (indexOfCallback !== -1) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire: function fire() {
      var callback = callbacks.pop();
      var result = !!callback;

      if (result) {
        callback();
      }

      return result;
    },
    hasCallback: function hasCallback() {
      return callbacks.length > 0;
    }
  };
}();

exports.hideCallback = hideCallback;
