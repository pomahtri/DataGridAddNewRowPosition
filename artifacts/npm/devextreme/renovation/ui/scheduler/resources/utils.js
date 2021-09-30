/**
* DevExtreme (renovation/ui/scheduler/resources/utils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.createGetAppointmentColor = void 0;

var _utils = require("../../../../ui/scheduler/resources/utils");

var createGetAppointmentColor = function createGetAppointmentColor(resourceConfig) {
  return function (appointmentConfig) {
    return (0, _utils.getAppointmentColor)(resourceConfig, appointmentConfig);
  };
};

exports.createGetAppointmentColor = createGetAppointmentColor;
