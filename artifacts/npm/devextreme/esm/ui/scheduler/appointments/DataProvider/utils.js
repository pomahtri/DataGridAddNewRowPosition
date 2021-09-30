/**
* DevExtreme (esm/ui/scheduler/appointments/DataProvider/utils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import timeZoneUtils from '../../utils.timeZone';
import dateSerialization from '../../../../core/utils/date_serialization';
var toMs = dateUtils.dateToMilliseconds;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
export var compareDateWithStartDayHour = (startDate, endDate, startDayHour, allDay, severalDays) => {
  var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
  var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
  return result;
};
export var compareDateWithEndDayHour = options => {
  var {
    startDate,
    endDate,
    startDayHour,
    endDayHour,
    viewStartDayHour,
    viewEndDayHour,
    allDay,
    severalDays,
    min,
    max,
    checkIntersectViewport
  } = options;
  var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
  var apptDuration = endDate.getTime() - startDate.getTime();
  var delta = (hiddenInterval - apptDuration) / toMs('hour');
  var apptStartHour = startDate.getHours();
  var apptStartMinutes = startDate.getMinutes();
  var result;
  var endTime = dateUtils.dateTimeFromDecimal(endDayHour);
  var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
  var apptIntersectViewport = startDate < max && endDate > min;
  result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);

  if (apptDuration < hiddenInterval) {
    if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
      result = false;
    }
  }

  return result;
};
export var getTrimDates = (min, max) => {
  var newMin = dateUtils.trimTime(min);
  var newMax = dateUtils.trimTime(max);
  newMax.setDate(newMax.getDate() + 1);
  return [newMin, newMax];
};
export var _getAppointmentDurationInHours = (startDate, endDate) => {
  return (endDate.getTime() - startDate.getTime()) / toMs('hour');
};
export var getAppointmentTakesSeveralDays = adapter => {
  return !dateUtils.sameDate(adapter.startDate, adapter.endDate);
};
export var _appointmentHasShortDayDuration = (startDate, endDate, startDayHour, endDayHour) => {
  var appointmentDurationInHours = _getAppointmentDurationInHours(startDate, endDate);

  var shortDayDurationInHours = endDayHour - startDayHour;
  return appointmentDurationInHours >= shortDayDurationInHours && startDate.getHours() === startDayHour && endDate.getHours() === endDayHour;
};
export var _isEndDateWrong = (startDate, endDate) => {
  return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
};
export var _appointmentHasAllDayDuration = (startDate, endDate, startDayHour, endDayHour) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  var dayDuration = 24;

  var appointmentDurationInHours = _getAppointmentDurationInHours(startDate, endDate);

  return appointmentDurationInHours >= dayDuration || _appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour);
};
export var _appointmentPartInInterval = (startDate, endDate, startDayHour, endDayHour) => {
  var apptStartDayHour = startDate.getHours();
  var apptEndDayHour = endDate.getHours();
  return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
};
export var getRecurrenceException = (appointmentAdapter, timeZoneCalculator, timeZone) => {
  var recurrenceException = appointmentAdapter.recurrenceException;

  if (recurrenceException) {
    var exceptions = recurrenceException.split(',');

    for (var i = 0; i < exceptions.length; i++) {
      exceptions[i] = _convertRecurrenceException(exceptions[i], appointmentAdapter.startDate, timeZoneCalculator, timeZone);
    }

    return exceptions.join();
  }

  return recurrenceException;
};
export var _convertRecurrenceException = (exceptionString, startDate, timeZoneCalculator, timeZone) => {
  exceptionString = exceptionString.replace(/\s/g, '');

  var getConvertedToTimeZone = date => {
    return timeZoneCalculator.createDate(date, {
      path: 'toGrid'
    });
  };

  var exceptionDate = dateSerialization.deserializeDate(exceptionString);
  var convertedStartDate = getConvertedToTimeZone(startDate);
  var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
  convertedExceptionDate = timeZoneUtils.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, timeZone);
  exceptionString = dateSerialization.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
  return exceptionString;
};
export var getAppointmentTakesAllDay = (appointment, startDayHour, endDayHour) => {
  return appointment.allDay || _appointmentHasAllDayDuration(appointment.startDate, appointment.endDate, startDayHour, endDayHour);
};
