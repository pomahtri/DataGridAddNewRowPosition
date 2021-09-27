/**
* DevExtreme (esm/viz/components/parse_utils.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { noop } from '../../core/utils/common';
import dateSerialization from '../../core/utils/date_serialization';
import { isDefined } from '../../core/utils/type';
var parsers = {
  string: function string(val) {
    return isDefined(val) ? '' + val : val;
  },
  numeric: function numeric(val) {
    if (!isDefined(val)) {
      return val;
    }

    var parsedVal = Number(val);

    if (isNaN(parsedVal)) {
      parsedVal = undefined;
    }

    return parsedVal;
  },
  datetime: function datetime(val) {
    if (!isDefined(val)) {
      return val;
    }

    var parsedVal;
    var numVal = Number(val);

    if (!isNaN(numVal)) {
      parsedVal = new Date(numVal);
    } else {
      parsedVal = dateSerialization.deserializeDate(val);
    }

    if (isNaN(Number(parsedVal))) {
      parsedVal = undefined;
    }

    return parsedVal;
  }
};
export function correctValueType(type) {
  return type === 'numeric' || type === 'datetime' || type === 'string' ? type : '';
}
export var getParser = function getParser(valueType) {
  return parsers[correctValueType(valueType)] || noop;
};
