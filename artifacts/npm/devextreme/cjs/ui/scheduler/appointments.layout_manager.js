/**
* DevExtreme (cjs/ui/scheduler/appointments.layout_manager.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _common = require("../../core/utils/common");

var _instanceFactory = require("./instanceFactory");

var _viewModelGenerator = require("./appointments/viewModelGenerator");

var _utils = require("./resources/utils");

var _positionHelper = require("./workspaces/helpers/positionHelper");

var _base = require("../../renovation/ui/scheduler/view_model/to_test/views/utils/base");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AppointmentLayoutManager = /*#__PURE__*/function () {
  function AppointmentLayoutManager(instance) {
    this.instance = instance;
    this.appointmentViewModel = new _viewModelGenerator.AppointmentViewModel();
  }

  var _proto = AppointmentLayoutManager.prototype;

  _proto.getCellDimensions = function getCellDimensions(options) {
    if (this.instance._workSpace) {
      return {
        width: this.instance._workSpace.getCellWidth(),
        height: this.instance._workSpace.getCellHeight(),
        allDayHeight: this.instance._workSpace.getAllDayHeight()
      };
    }
  };

  _proto._getRenderingStrategyOptions = function _getRenderingStrategyOptions() {
    var workspace = this.instance.getWorkSpace();
    var key = this.instance.key;

    var _this$instance$getWor = this.instance.getWorkSpace(),
        virtualScrollingDispatcher = _this$instance$getWor.virtualScrollingDispatcher;

    var cellCountInsideLeftVirtualCell = virtualScrollingDispatcher.cellCountInsideLeftVirtualCell,
        cellCountInsideTopVirtualRow = virtualScrollingDispatcher.cellCountInsideTopVirtualRow;
    var groupCount = (0, _utils.getGroupCount)(this.instance.option('loadedResources'));
    var DOMMetaData = workspace.getDOMElementsMetaData();
    var allDayHeight = (0, _positionHelper.getAllDayHeight)(workspace.option('showAllDayPanel'), workspace._isVerticalGroupedWorkSpace(), DOMMetaData);

    var rowCount = workspace._getRowCount();

    var positionHelper = workspace.positionHelper,
        viewDataProvider = workspace.viewDataProvider;
    var visibleDayDuration = viewDataProvider.getVisibleDayDuration(workspace.option('startDayHour'), workspace.option('endDayHour'), workspace.option('hoursInterval'));
    var cellDuration = (0, _base.getCellDuration)(workspace.type, workspace.option('startDayHour'), workspace.option('endDayHour'), workspace.option('hoursInterval'));
    return {
      resources: this.instance.option('resources'),
      loadedResources: this.instance.option('loadedResources'),
      getAppointmentColor: this.instance.createGetAppointmentColor(),
      dataAccessors: this.instance._dataAccessors,
      key: key,
      isRenovatedAppointments: this.modelProvider.isRenovatedAppointments,
      appointmentRenderingStrategyName: this.appointmentRenderingStrategyName,
      adaptivityEnabled: this.modelProvider.adaptivityEnabled,
      rtlEnabled: this.modelProvider.rtlEnabled,
      startDayHour: this.modelProvider.startDayHour,
      endDayHour: this.modelProvider.endDayHour,
      maxAppointmentsPerCell: this.modelProvider.maxAppointmentsPerCell,
      currentDate: this.modelProvider.currentDate,
      isVirtualScrolling: this.instance.isVirtualScrolling(),
      leftVirtualCellCount: cellCountInsideLeftVirtualCell,
      topVirtualCellCount: cellCountInsideTopVirtualRow,
      intervalCount: workspace.option('intervalCount'),
      hoursInterval: workspace.option('hoursInterval'),
      showAllDayPanel: workspace.option('showAllDayPanel'),
      isGroupedAllDayPanel: workspace.isGroupedAllDayPanel(),
      modelGroups: this.modelProvider.getCurrentViewOption('groups'),
      groupCount: groupCount,
      rowCount: rowCount,
      appointmentCountPerCell: this.instance.option('_appointmentCountPerCell'),
      appointmentOffset: this.instance.option('_appointmentOffset'),
      allowResizing: this.instance._allowResizing(),
      allowAllDayResizing: this.instance._allowAllDayResizing(),
      startViewDate: workspace.getStartViewDate(),
      groupOrientation: workspace._getRealGroupOrientation(),
      cellWidth: (0, _positionHelper.getCellWidth)(DOMMetaData),
      cellHeight: (0, _positionHelper.getCellHeight)(DOMMetaData),
      allDayHeight: allDayHeight,
      resizableStep: positionHelper.getResizableStep(),
      visibleDayDuration: visibleDayDuration,
      // appointment settings
      timeZoneCalculator: (0, _instanceFactory.getTimeZoneCalculator)(key),
      appointmentDataProvider: (0, _instanceFactory.getAppointmentDataProvider)(key),
      timeZone: this.modelProvider.timeZone,
      firstDayOfWeek: this.instance.getFirstDayOfWeek(),
      viewStartDayHour: this.modelProvider.getCurrentViewOption('startDayHour'),
      viewEndDayHour: this.modelProvider.getCurrentViewOption('endDayHour'),
      viewType: workspace.type,
      endViewDate: workspace.getEndViewDate(),
      positionHelper: positionHelper,
      isGroupedByDate: workspace.isGroupedByDate(),
      cellDuration: cellDuration,
      cellDurationInMinutes: workspace.option('cellDuration'),
      viewDataProvider: workspace.viewDataProvider,
      supportAllDayRow: workspace.supportAllDayRow(),
      dateRange: workspace.getDateRange(),
      intervalDuration: workspace.getIntervalDuration(),
      allDayIntervalDuration: workspace.getIntervalDuration(true),
      isVerticalOrientation: workspace.isVerticalOrientation(),
      DOMMetaData: DOMMetaData,
      // agenda only
      instance: this.instance,
      agendaDuration: workspace.option('agendaDuration')
    };
  };

  _proto.createAppointmentsMap = function createAppointmentsMap(items) {
    var renderingStrategyOptions = this._getRenderingStrategyOptions();

    var _this$appointmentView = this.appointmentViewModel.generate(items, renderingStrategyOptions),
        viewModel = _this$appointmentView.viewModel,
        positionMap = _this$appointmentView.positionMap;

    this._positionMap = positionMap; // TODO get rid of this after remove old render

    return viewModel;
  };

  _proto._isDataChanged = function _isDataChanged(data) {
    var appointmentDataProvider = this.instance.fire('getAppointmentDataProvider');
    var updatedData = appointmentDataProvider.getUpdatedAppointment();
    return updatedData === data || appointmentDataProvider.getUpdatedAppointmentKeys().some(function (item) {
      return data[item.key] === item.value;
    });
  };

  _proto._isAppointmentShouldAppear = function _isAppointmentShouldAppear(currentAppointment, sourceAppointment) {
    return currentAppointment.needRepaint && sourceAppointment.needRemove;
  };

  _proto._isSettingChanged = function _isSettingChanged(settings, sourceSetting) {
    if (settings.length !== sourceSetting.length) {
      return true;
    }

    var createSettingsToCompare = function createSettingsToCompare(settings, index) {
      var currentSetting = settings[index];
      var leftVirtualCellCount = currentSetting.leftVirtualCellCount || 0;
      var topVirtualCellCount = currentSetting.topVirtualCellCount || 0;
      var columnIndex = currentSetting.columnIndex + leftVirtualCellCount;
      var rowIndex = currentSetting.rowIndex + topVirtualCellCount;
      var hMax = currentSetting.reduced ? currentSetting.hMax : undefined;
      var vMax = currentSetting.reduced ? currentSetting.vMax : undefined;
      return _extends({}, currentSetting, {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        topVirtualCellCount: undefined,
        leftVirtualCellCount: undefined,
        leftVirtualWidth: undefined,
        topVirtualHeight: undefined,
        hMax: hMax,
        vMax: vMax,
        info: {}
      });
    };

    for (var i = 0; i < settings.length; i++) {
      var newSettings = createSettingsToCompare(settings, i);
      var oldSettings = createSettingsToCompare(sourceSetting, i);

      if (oldSettings) {
        // exclude sortedIndex property for comparison in commonUtils.equalByValue
        oldSettings.sortedIndex = newSettings.sortedIndex;
      }

      if (!(0, _common.equalByValue)(newSettings, oldSettings)) {
        return true;
      }
    }

    return false;
  };

  _proto._getAssociatedSourceAppointment = function _getAssociatedSourceAppointment(currentAppointment, sourceAppointments) {
    for (var i = 0; i < sourceAppointments.length; i++) {
      var item = sourceAppointments[i];

      if (item.itemData === currentAppointment.itemData) {
        return item;
      }
    }

    return null;
  };

  _proto._getDeletedAppointments = function _getDeletedAppointments(currentAppointments, sourceAppointments) {
    var result = [];

    for (var i = 0; i < sourceAppointments.length; i++) {
      var sourceAppointment = sourceAppointments[i];

      var currentAppointment = this._getAssociatedSourceAppointment(sourceAppointment, currentAppointments);

      if (!currentAppointment) {
        sourceAppointment.needRemove = true;
        result.push(sourceAppointment);
      }
    }

    return result;
  };

  _proto.getRepaintedAppointments = function getRepaintedAppointments(currentAppointments, sourceAppointments) {
    var _this = this;

    if (sourceAppointments.length === 0 || this.appointmentRenderingStrategyName === 'agenda') {
      return currentAppointments;
    }

    currentAppointments.forEach(function (appointment) {
      var sourceAppointment = _this._getAssociatedSourceAppointment(appointment, sourceAppointments);

      if (sourceAppointment) {
        appointment.needRepaint = _this._isDataChanged(appointment.itemData) || _this._isSettingChanged(appointment.settings, sourceAppointment.settings) || _this._isAppointmentShouldAppear(appointment, sourceAppointment);
      }
    });
    return currentAppointments.concat(this._getDeletedAppointments(currentAppointments, sourceAppointments));
  };

  _proto.getRenderingStrategyInstance = function getRenderingStrategyInstance() {
    var renderingStrategy = this.appointmentViewModel.getRenderingStrategy();

    if (!renderingStrategy) {
      var options = this._getRenderingStrategyOptions();

      this.appointmentViewModel.initRenderingStrategy(options);
    }

    return this.appointmentViewModel.getRenderingStrategy();
  };

  _createClass(AppointmentLayoutManager, [{
    key: "modelProvider",
    get: function get() {
      return (0, _instanceFactory.getModelProvider)(this.instance.key);
    }
  }, {
    key: "appointmentRenderingStrategyName",
    get: function get() {
      return this.modelProvider.getAppointmentRenderingStrategyName();
    }
  }]);

  return AppointmentLayoutManager;
}();

var _default = AppointmentLayoutManager;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
