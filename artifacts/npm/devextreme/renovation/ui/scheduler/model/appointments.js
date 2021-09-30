/**
* DevExtreme (renovation/ui/scheduler/model/appointments.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getAppointmentsModel = void 0;

var _positionHelper = require("../../../../ui/scheduler/workspaces/helpers/positionHelper");

var _utils = require("../../../../ui/scheduler/resources/utils");

var _utils2 = require("../workspaces/utils");

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _base = require("../view_model/to_test/views/utils/base");

var _utils3 = require("../resources/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var toMs = function toMs(name) {
  return _date.default.dateToMilliseconds(name);
};

var getAppointmentRenderingStrategyName = function getAppointmentRenderingStrategyName(viewType) {
  var appointmentRenderingStrategyMap = {
    day: {
      renderingStrategy: "vertical"
    },
    week: {
      renderingStrategy: "vertical"
    },
    workWeek: {
      renderingStrategy: "vertical"
    },
    month: {
      renderingStrategy: "horizontalMonth"
    },
    timelineDay: {
      renderingStrategy: "horizontal"
    },
    timelineWeek: {
      renderingStrategy: "horizontal"
    },
    timelineWorkWeek: {
      renderingStrategy: "horizontal"
    },
    timelineMonth: {
      renderingStrategy: "horizontalMonthLine"
    },
    agenda: {
      renderingStrategy: "agenda"
    }
  };
  var renderingStrategy = appointmentRenderingStrategyMap[viewType].renderingStrategy;
  return renderingStrategy;
};

var getAppointmentConfig = function getAppointmentConfig(key, schedulerConfig, viewConfig) {
  return {
    key: key,
    adaptivityEnabled: schedulerConfig.adaptivityEnabled,
    rtlEnabled: schedulerConfig.rtlEnabled,
    startDayHour: viewConfig.startDayHour,
    viewStartDayHour: viewConfig.startDayHour,
    endDayHour: viewConfig.endDayHour,
    viewEndDayHour: viewConfig.endDayHour,
    resources: schedulerConfig.resources,
    maxAppointmentsPerCell: schedulerConfig.maxAppointmentsPerCell,
    currentDate: viewConfig.currentDate,
    isVirtualScrolling: viewConfig.scrolling.mode === "virtual",
    intervalCount: viewConfig.intervalCount,
    hoursInterval: viewConfig.hoursInterval,
    showAllDayPanel: viewConfig.showAllDayPanel,
    modelGroups: [],
    appointmentCountPerCell: 2,
    appointmentOffset: 26,
    allowResizing: false,
    allowAllDayResizing: false,
    dateTableOffset: 0,
    groupOrientation: viewConfig.groupOrientation,
    startViewDate: viewConfig.startDate,
    timeZone: schedulerConfig.timeZone,
    firstDayOfWeek: viewConfig.firstDayOfWeek,
    viewType: viewConfig.type,
    cellDurationInMinutes: viewConfig.cellDuration,
    supportAllDayRow: viewConfig.showAllDayPanel,
    isVerticalGroupOrientation: viewConfig.groupOrientation === "vertical"
  };
};

var getAppointmentsModel = function getAppointmentsModel(key, schedulerConfig, viewConfig, viewDataProvider, timeZoneCalculator, appointmentDataProvider, dataAccessors, cellsMetaData) {
  var appointmentConfig = getAppointmentConfig(key, schedulerConfig, viewConfig);
  var groupCount = (0, _utils.getGroupCount)(schedulerConfig.groups);
  var groupedByDate = (0, _utils2.isGroupingByDate)(schedulerConfig.groups, viewConfig.groupOrientation, viewConfig.groupByDate);
  var positionHelper = new _positionHelper.PositionHelper({
    viewDataProvider: viewDataProvider,
    groupedByDate: groupedByDate,
    rtlEnabled: appointmentConfig.rtlEnabled,
    groupCount: groupCount,
    getDOMMetaDataCallback: function getDOMMetaDataCallback() {
      return cellsMetaData;
    }
  });
  var isGroupedAllDayPanel = (0, _base.calculateIsGroupedAllDayPanel)(viewConfig.groups, viewConfig.groupOrientation, viewConfig.showAllDayPanel);
  var rowCount = viewDataProvider.getRowCount({
    intervalCount: viewConfig.intervalCount,
    currentDate: viewConfig.currentDate,
    viewType: viewConfig.type,
    hoursInterval: viewConfig.hoursInterval,
    startDayHour: viewConfig.startDayHour,
    endDayHour: viewConfig.endDayHour
  });
  var allDayHeight = (0, _positionHelper.getAllDayHeight)(viewConfig.showAllDayPanel, appointmentConfig.isVerticalGroupOrientation, cellsMetaData);
  var endViewDate = viewDataProvider.getLastCellEndDate();
  var visibleDayDuration = viewDataProvider.getVisibleDayDuration(viewConfig.startDayHour, viewConfig.endDayHour, viewConfig.hoursInterval);
  var dateRange = [viewDataProvider.getStartViewDate(), viewDataProvider.getLastViewDateByEndDayHour(viewConfig.endDayHour)];
  var intervalDuration = viewDataProvider.getIntervalDuration(viewConfig.intervalCount);
  var allDayIntervalDuration = toMs("day") * 3600000;
  var _viewDataProvider$vie = viewDataProvider.viewData,
      leftVirtualCellCount = _viewDataProvider$vie.leftVirtualCellCount,
      topVirtualRowCount = _viewDataProvider$vie.topVirtualRowCount;
  var cellDuration = (0, _base.getCellDuration)(viewConfig.type, viewConfig.startDayHour, viewConfig.endDayHour, viewConfig.hoursInterval);
  var getAppointmentColor = (0, _utils3.createGetAppointmentColor)({
    resources: schedulerConfig.resources,
    resourceDataAccessors: dataAccessors,
    loadedResources: [],
    resourceLoaderMap: new Map()
  });
  return _extends({}, appointmentConfig, {
    appointmentRenderingStrategyName: getAppointmentRenderingStrategyName(viewConfig.type),
    loadedResources: [],
    dataAccessors: dataAccessors,
    timeZoneCalculator: timeZoneCalculator,
    appointmentDataProvider: appointmentDataProvider,
    viewDataProvider: viewDataProvider,
    positionHelper: positionHelper,
    isGroupedAllDayPanel: isGroupedAllDayPanel,
    rowCount: rowCount,
    groupCount: groupCount,
    cellWidth: (0, _positionHelper.getCellWidth)(cellsMetaData),
    cellHeight: (0, _positionHelper.getCellHeight)(cellsMetaData),
    allDayHeight: allDayHeight,
    isGroupedByDate: groupedByDate,
    endViewDate: endViewDate,
    visibleDayDuration: visibleDayDuration,
    dateRange: dateRange,
    intervalDuration: intervalDuration,
    allDayIntervalDuration: allDayIntervalDuration,
    leftVirtualCellCount: leftVirtualCellCount,
    topVirtualCellCount: topVirtualRowCount,
    cellDuration: cellDuration,
    getAppointmentColor: getAppointmentColor,
    resizableStep: positionHelper.getResizableStep(),
    DOMMetaData: cellsMetaData
  });
};

exports.getAppointmentsModel = getAppointmentsModel;
