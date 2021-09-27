/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/timeline_month.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from "../../../../../../../core/utils/date";
import { setOptionHour } from "./base";
import { getViewStartByOptions } from "./month";
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount) => {
  var firstViewDate = dateUtils.getFirstMonthDate(getViewStartByOptions(startDate, currentDate, intervalCount, dateUtils.getFirstMonthDate(startDate)));
  return setOptionHour(firstViewDate, startDayHour);
};
