import { utils } from "../../../ui/scheduler/utils";
import { TimeZoneCalculator } from "./timeZoneCalculator/utils";
import timeZoneUtils from "../../../ui/scheduler/utils.timeZone";
export var createDataAccessors = props => {
  var result = utils.dataAccessors.create({
    startDate: props.startDateExpr,
    endDate: props.endDateExpr,
    startDateTimeZone: props.startDateTimeZoneExpr,
    endDateTimeZone: props.endDateTimeZoneExpr,
    allDay: props.allDayExpr,
    text: props.textExpr,
    description: props.descriptionExpr,
    recurrenceRule: props.recurrenceRuleExpr,
    recurrenceException: props.recurrenceExceptionExpr
  });
  return result;
};
export var createTimeZoneCalculator = currentTimeZone => new TimeZoneCalculator({
  getClientOffset: date => timeZoneUtils.getClientTimezoneOffset(date),
  getCommonOffset: date => timeZoneUtils.calculateTimezoneByValue(currentTimeZone, date),
  getAppointmentOffset: (date, appointmentTimezone) => timeZoneUtils.calculateTimezoneByValue(appointmentTimezone, date)
});