"use strict";

exports.ExpressionUtils = void 0;

var _type = require("../../core/utils/type");

var _instanceFactory = require("./instanceFactory");

var ExpressionUtils = {
  getField: function getField(key, field, obj) {
    var dataAccessors = (0, _instanceFactory.getAppointmentDataProvider)(key).getDataAccessors();

    if ((0, _type.isDefined)(dataAccessors.getter[field])) {
      return dataAccessors.getter[field](obj);
    }
  },
  setField: function setField(key, field, obj, value) {
    var _getAppointmentDataPr = (0, _instanceFactory.getAppointmentDataProvider)(key),
        dataAccessors = _getAppointmentDataPr.dataAccessors;

    var _getModelProvider = (0, _instanceFactory.getModelProvider)(key),
        model = _getModelProvider.model;

    if (!(0, _type.isDefined)(dataAccessors.setter[field])) {
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
exports.ExpressionUtils = ExpressionUtils;