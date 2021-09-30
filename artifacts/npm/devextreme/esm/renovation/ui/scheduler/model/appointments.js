/**
* DevExtreme (esm/renovation/ui/scheduler/model/appointments.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getCellWidth, getCellHeight, getAllDayHeight, PositionHelper } from "../../../../ui/scheduler/workspaces/helpers/positionHelper";
import { getGroupCount } from "../../../../ui/scheduler/resources/utils";
import { isGroupingByDate } from "../workspaces/utils";
import dateUtils from "../../../../core/utils/date";
import { calculateIsGroupedAllDayPanel, getCellDuration } from "../view_model/to_test/views/utils/base";
import { createGetAppointmentColor } from "../resources/utils";

var toMs = name => dateUtils.dateToMilliseconds(name);

var getAppointmentRenderingStrategyName = viewType => {
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
  var {
    renderingStrategy
  } = appointmentRenderingStrategyMap[viewType];
  return renderingStrategy;
};

var getAppointmentConfig = (key, schedulerConfig, viewConfig) => ({
  key,
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
});

export var getAppointmentsModel = (key, schedulerConfig, viewConfig, viewDataProvider, timeZoneCalculator, appointmentDataProvider, dataAccessors, cellsMetaData) => {
  var appointmentConfig = getAppointmentConfig(key, schedulerConfig, viewConfig);
  var groupCount = getGroupCount(schedulerConfig.groups);
  var groupedByDate = isGroupingByDate(schedulerConfig.groups, viewConfig.groupOrientation, viewConfig.groupByDate);
  var positionHelper = new PositionHelper({
    viewDataProvider,
    groupedByDate,
    rtlEnabled: appointmentConfig.rtlEnabled,
    groupCount,
    getDOMMetaDataCallback: () => cellsMetaData
  });
  var isGroupedAllDayPanel = calculateIsGroupedAllDayPanel(viewConfig.groups, viewConfig.groupOrientation, viewConfig.showAllDayPanel);
  var rowCount = viewDataProvider.getRowCount({
    intervalCount: viewConfig.intervalCount,
    currentDate: viewConfig.currentDate,
    viewType: viewConfig.type,
    hoursInterval: viewConfig.hoursInterval,
    startDayHour: viewConfig.startDayHour,
    endDayHour: viewConfig.endDayHour
  });
  var allDayHeight = getAllDayHeight(viewConfig.showAllDayPanel, appointmentConfig.isVerticalGroupOrientation, cellsMetaData);
  var endViewDate = viewDataProvider.getLastCellEndDate();
  var visibleDayDuration = viewDataProvider.getVisibleDayDuration(viewConfig.startDayHour, viewConfig.endDayHour, viewConfig.hoursInterval);
  var dateRange = [viewDataProvider.getStartViewDate(), viewDataProvider.getLastViewDateByEndDayHour(viewConfig.endDayHour)];
  var intervalDuration = viewDataProvider.getIntervalDuration(viewConfig.intervalCount);
  var allDayIntervalDuration = toMs("day") * 3600000;
  var {
    leftVirtualCellCount,
    topVirtualRowCount
  } = viewDataProvider.viewData;
  var cellDuration = getCellDuration(viewConfig.type, viewConfig.startDayHour, viewConfig.endDayHour, viewConfig.hoursInterval);
  var getAppointmentColor = createGetAppointmentColor({
    resources: schedulerConfig.resources,
    resourceDataAccessors: dataAccessors,
    loadedResources: [],
    resourceLoaderMap: new Map()
  });
  return _extends({}, appointmentConfig, {
    appointmentRenderingStrategyName: getAppointmentRenderingStrategyName(viewConfig.type),
    loadedResources: [],
    dataAccessors,
    timeZoneCalculator,
    appointmentDataProvider,
    viewDataProvider,
    positionHelper,
    isGroupedAllDayPanel,
    rowCount,
    groupCount,
    cellWidth: getCellWidth(cellsMetaData),
    cellHeight: getCellHeight(cellsMetaData),
    allDayHeight,
    isGroupedByDate: groupedByDate,
    endViewDate,
    visibleDayDuration,
    dateRange,
    intervalDuration,
    allDayIntervalDuration,
    leftVirtualCellCount,
    topVirtualCellCount: topVirtualRowCount,
    cellDuration,
    getAppointmentColor,
    resizableStep: positionHelper.getResizableStep(),
    DOMMetaData: cellsMetaData
  });
};
