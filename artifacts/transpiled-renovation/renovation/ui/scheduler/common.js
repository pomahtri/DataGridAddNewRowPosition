"use strict";

exports.createTimeZoneCalculator = exports.createDataAccessors = void 0;

var _utils = require("../../../ui/scheduler/utils");

var _utils2 = require("./timeZoneCalculator/utils");

var _utils3 = _interopRequireDefault(require("../../../ui/scheduler/utils.timeZone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDataAccessors = function createDataAccessors(props) {
  var result = _utils.utils.dataAccessors.create({
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

exports.createDataAccessors = createDataAccessors;

var createTimeZoneCalculator = function createTimeZoneCalculator(currentTimeZone) {
  return new _utils2.TimeZoneCalculator({
    getClientOffset: function getClientOffset(date) {
      return _utils3.default.getClientTimezoneOffset(date);
    },
    getCommonOffset: function getCommonOffset(date) {
      return _utils3.default.calculateTimezoneByValue(currentTimeZone, date);
    },
    getAppointmentOffset: function getAppointmentOffset(date, appointmentTimezone) {
      return _utils3.default.calculateTimezoneByValue(appointmentTimezone, date);
    }
  });
};

exports.createTimeZoneCalculator = createTimeZoneCalculator;