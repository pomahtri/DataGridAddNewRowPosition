/**
* DevExtreme (esm/renovation/ui/scheduler/common.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
