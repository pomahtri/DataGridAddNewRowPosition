/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator_work_week.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { calculateStartViewDate, isDataOnWeekend } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/work_week';
import { ViewDataGeneratorWeek } from './view_data_generator_week';
var MONDAY_INDEX = 1;
export class ViewDataGeneratorWorkWeek extends ViewDataGeneratorWeek {
  get daysInInterval() {
    return 5;
  }

  get isWorkView() {
    return true;
  }

  isSkippedDate(date) {
    return isDataOnWeekend(date);
  }

  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  }

  getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption || MONDAY_INDEX;
  }

}
