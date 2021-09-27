import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from "../../../../../core/utils/date";
import { getGroupCount } from "../../../../../ui/scheduler/resources/utils";
import { isHorizontalGroupingApplied, isVerticalGroupingApplied } from "../utils";
var DAY_MS = dateUtils.dateToMilliseconds("day");
var HOUR_MS = dateUtils.dateToMilliseconds("hour");
export var getTotalRowCount = (rowCount, groupOrientation, groups, isAllDayPanelVisible) => {
  var isVerticalGrouping = isVerticalGroupingApplied(groups, groupOrientation);
  var groupCount = getGroupCount(groups);
  var totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
  return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount;
};
export var getTotalCellCount = (cellCount, groupOrientation, groups) => {
  var isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
  var groupCount = getGroupCount(groups);
  return isHorizontalGrouping ? cellCount * groupCount : cellCount;
};
export var getRowCountWithAllDayRow = (rowCount, isAllDayPanelVisible) => isAllDayPanelVisible ? rowCount + 1 : rowCount;
export var getHiddenInterval = (hoursInterval, cellCountInDay) => {
  var visibleInterval = hoursInterval * cellCountInDay * HOUR_MS;
  return DAY_MS - visibleInterval;
};
export var createCellElementMetaData = (tableRect, cellRect) => _extends({}, cellRect, {
  left: cellRect.left - tableRect.left,
  top: cellRect.top - tableRect.top
});
export var getDateForHeaderText = (_, date) => date;