/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/utils.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDateForHeaderText = exports.createCellElementMetaData = exports.getHiddenInterval = exports.getRowCountWithAllDayRow = exports.getTotalCellCount = exports.getTotalRowCount = void 0;

var _date = _interopRequireDefault(require("../../../../../core/utils/date"));

var _utils = require("../../../../../ui/scheduler/resources/utils");

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DAY_MS = _date.default.dateToMilliseconds("day");

var HOUR_MS = _date.default.dateToMilliseconds("hour");

var getTotalRowCount = function getTotalRowCount(rowCount, groupOrientation, groups, isAllDayPanelVisible) {
  var isVerticalGrouping = (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation);
  var groupCount = (0, _utils.getGroupCount)(groups);
  var totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
  return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount;
};

exports.getTotalRowCount = getTotalRowCount;

var getTotalCellCount = function getTotalCellCount(cellCount, groupOrientation, groups) {
  var isHorizontalGrouping = (0, _utils2.isHorizontalGroupingApplied)(groups, groupOrientation);
  var groupCount = (0, _utils.getGroupCount)(groups);
  return isHorizontalGrouping ? cellCount * groupCount : cellCount;
};

exports.getTotalCellCount = getTotalCellCount;

var getRowCountWithAllDayRow = function getRowCountWithAllDayRow(rowCount, isAllDayPanelVisible) {
  return isAllDayPanelVisible ? rowCount + 1 : rowCount;
};

exports.getRowCountWithAllDayRow = getRowCountWithAllDayRow;

var getHiddenInterval = function getHiddenInterval(hoursInterval, cellCountInDay) {
  var visibleInterval = hoursInterval * cellCountInDay * HOUR_MS;
  return DAY_MS - visibleInterval;
};

exports.getHiddenInterval = getHiddenInterval;

var createCellElementMetaData = function createCellElementMetaData(tableRect, cellRect) {
  return _extends({}, cellRect, {
    left: cellRect.left - tableRect.left,
    top: cellRect.top - tableRect.top
  });
};

exports.createCellElementMetaData = createCellElementMetaData;

var getDateForHeaderText = function getDateForHeaderText(_, date) {
  return date;
};

exports.getDateForHeaderText = getDateForHeaderText;
