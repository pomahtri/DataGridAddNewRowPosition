/**
* DevExtreme (esm/core/polyfills/weak_map.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { inArray } from '../utils/array';
import { hasWindow, getWindow } from '../utils/window';
var weakMap = hasWindow() ? getWindow().WeakMap : WeakMap;

if (!weakMap) {
  // NOTE: This is an incomplete WeakMap polyfill but it is enough for creation purposes
  weakMap = function weakMap() {
    var keys = [];
    var values = [];

    this.set = function (key, value) {
      var index = inArray(key, keys);

      if (index === -1) {
        keys.push(key);
        values.push(value);
      } else {
        values[index] = value;
      }
    };

    this.get = function (key) {
      var index = inArray(key, keys);

      if (index === -1) {
        return undefined;
      }

      return values[index];
    };

    this.has = function (key) {
      var index = inArray(key, keys);

      if (index === -1) {
        return false;
      }

      return true;
    };

    this.delete = function (key) {
      var index = inArray(key, keys);

      if (index === -1) {
        return;
      }

      keys.splice(index, 1);
      values.splice(index, 1);
    };
  };
}

export default weakMap;
