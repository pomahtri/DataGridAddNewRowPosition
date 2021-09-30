/**
* DevExtreme (esm/ui/scheduler/appointments/rendering_strategies/strategy_horizontal_month_line.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import HorizontalAppointmentsStrategy from './strategy_horizontal';
import dateUtils from '../../../../core/utils/date';
import query from '../../../../data/query';
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var MILLISECONDS_IN_MINUTE = 60000;
var ZERO_APPOINTMENT_DURATION_IN_DAYS = 1;

class HorizontalMonthLineRenderingStrategy extends HorizontalAppointmentsStrategy {
  calculateAppointmentWidth(appointment, position) {
    var startDate = dateUtils.trimTime(position.info.appointment.startDate);
    var {
      normalizedEndDate
    } = position.info.appointment;
    var cellWidth = this.cellWidth || this.getAppointmentMinSize();
    var duration = Math.ceil(this._getDurationInDays(startDate, normalizedEndDate));
    var width = this.cropAppointmentWidth(duration * cellWidth, cellWidth);

    if (this.isVirtualScrolling) {
      var skippedDays = this.viewDataProvider.getSkippedDaysCount(position.groupIndex, startDate, normalizedEndDate, duration);
      width -= skippedDays * cellWidth;
    }

    return width;
  }

  _getDurationInDays(startDate, endDate) {
    var adjustedDuration = this._adjustDurationByDaylightDiff(endDate.getTime() - startDate.getTime(), startDate, endDate);

    return adjustedDuration / dateUtils.dateToMilliseconds('day') || ZERO_APPOINTMENT_DURATION_IN_DAYS;
  }

  getDeltaTime(args, initialSize) {
    return HOURS_IN_DAY * MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE * this._getDeltaWidth(args, initialSize);
  }

  isAllDay() {
    return false;
  }

  createTaskPositionMap(items, skipSorting) {
    if (!skipSorting) {
      this.appointmentDataProvider.sortAppointmentsByStartDate(items);
    }

    return super.createTaskPositionMap(items);
  }

  _getSortedPositions(map, skipSorting) {
    var result = super._getSortedPositions(map);

    if (!skipSorting) {
      result = query(result).sortBy('top').thenBy('left').thenBy('cellPosition').thenBy('i').toArray();
    }

    return result;
  }

  needCorrectAppointmentDates() {
    return false;
  }

  getPositionShift() {
    return {
      top: 0,
      left: 0,
      cellPosition: 0
    };
  }

}

export default HorizontalMonthLineRenderingStrategy;
