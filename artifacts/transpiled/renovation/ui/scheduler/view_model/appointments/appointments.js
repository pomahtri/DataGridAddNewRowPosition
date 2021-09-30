"use strict";

exports.getAppointmentsViewModel = void 0;

var _viewModelGenerator = require("../../../../../ui/scheduler/appointments/viewModelGenerator");

var getAppointmentsViewModel = function getAppointmentsViewModel(model, filteredItems) {
  var appointmentViewModel = new _viewModelGenerator.AppointmentViewModel();
  var result = appointmentViewModel.generate(filteredItems, model);
  return result;
};

exports.getAppointmentsViewModel = getAppointmentsViewModel;