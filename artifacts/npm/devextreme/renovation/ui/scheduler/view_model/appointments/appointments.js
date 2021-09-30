/**
* DevExtreme (renovation/ui/scheduler/view_model/appointments/appointments.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getAppointmentsViewModel = void 0;

var _viewModelGenerator = require("../../../../../ui/scheduler/appointments/viewModelGenerator");

var getAppointmentsViewModel = function getAppointmentsViewModel(model, filteredItems) {
  var appointmentViewModel = new _viewModelGenerator.AppointmentViewModel();
  var result = appointmentViewModel.generate(filteredItems, model);
  return result;
};

exports.getAppointmentsViewModel = getAppointmentsViewModel;
