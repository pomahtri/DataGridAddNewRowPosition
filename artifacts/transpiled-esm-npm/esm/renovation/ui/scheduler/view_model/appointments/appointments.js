import { AppointmentViewModel } from "../../../../../ui/scheduler/appointments/viewModelGenerator";
export var getAppointmentsViewModel = (model, filteredItems) => {
  var appointmentViewModel = new AppointmentViewModel();
  var result = appointmentViewModel.generate(filteredItems, model);
  return result;
};