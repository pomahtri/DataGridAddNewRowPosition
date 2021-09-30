/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/appointments/appointments.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { AppointmentViewModel } from "../../../../../ui/scheduler/appointments/viewModelGenerator";
export var getAppointmentsViewModel = (model, filteredItems) => {
  var appointmentViewModel = new AppointmentViewModel();
  var result = appointmentViewModel.generate(filteredItems, model);
  return result;
};
