/**
* DevExtreme (esm/core/utils/iterator.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var map = (values, callback) => {
  if (Array.isArray(values)) {
    return values.map(callback);
  }

  var result = [];

  for (var key in values) {
    result.push(callback(values[key], key));
  }

  return result;
};

var each = (values, callback) => {
  if (!values) return;

  if ('length' in values) {
    for (var i = 0; i < values.length; i++) {
      if (callback.call(values[i], i, values[i]) === false) {
        break;
      }
    }
  } else {
    for (var key in values) {
      if (callback.call(values[key], key, values[key]) === false) {
        break;
      }
    }
  }

  return values;
};

var reverseEach = (array, callback) => {
  if (!array || !('length' in array) || array.length === 0) return;

  for (var i = array.length - 1; i >= 0; i--) {
    if (callback.call(array[i], i, array[i]) === false) {
      break;
    }
  }
};

export { map, each, reverseEach };
