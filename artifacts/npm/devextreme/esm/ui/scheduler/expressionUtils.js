/**
* DevExtreme (esm/ui/scheduler/expressionUtils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import { getAppointmentDataProvider, getModelProvider } from './instanceFactory';
export var ExpressionUtils = {
  getField: (key, field, obj) => {
    var dataAccessors = getAppointmentDataProvider(key).getDataAccessors();

    if (isDefined(dataAccessors.getter[field])) {
      return dataAccessors.getter[field](obj);
    }
  },
  setField: (key, field, obj, value) => {
    var {
      dataAccessors
    } = getAppointmentDataProvider(key);
    var {
      model
    } = getModelProvider(key);

    if (!isDefined(dataAccessors.setter[field])) {
      return;
    }

    var fieldExpression = model["".concat(field, "Expr")];
    var splitExprStr = fieldExpression.split('.');
    var rootField = splitExprStr[0];

    if (obj[rootField] === undefined && splitExprStr.length > 1) {
      var emptyChain = function (arr) {
        var result = {};
        var tmp = result;
        var arrLength = arr.length - 1;

        for (var i = 1; i < arrLength; i++) {
          tmp = tmp[arr[i]] = {};
        }

        return result;
      }(splitExprStr);

      obj[rootField] = emptyChain;
    }

    dataAccessors.setter[field](obj, value);
    return obj;
  }
};
