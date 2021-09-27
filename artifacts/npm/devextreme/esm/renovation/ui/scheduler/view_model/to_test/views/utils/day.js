/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/day.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getViewStartByOptions, setOptionHour } from "./base";
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration) => {
  var firstViewDate = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
  return setOptionHour(firstViewDate, startDayHour);
};
