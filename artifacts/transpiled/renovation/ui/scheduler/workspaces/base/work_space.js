"use strict";

exports.WorkSpace = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _inferno2 = require("@devextreme/runtime/inferno");

var _ordinary_layout = require("./ordinary_layout");

var _view_data_provider = _interopRequireDefault(require("../../../../../ui/scheduler/workspaces/view_model/view_data_provider"));

var _utils = require("./utils");

var _props = require("../props");

var _work_space_config = require("./work_space_config");

var _utils2 = require("../utils");

var _excluded = ["accessKey", "activeStateEnabled", "allDayAppointments", "allDayPanelExpanded", "allowMultipleCellSelection", "appointments", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "dataCellTemplate", "dateCellTemplate", "disabled", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groupOrientation", "groups", "height", "hint", "hoursInterval", "hoverStateEnabled", "indicatorTime", "indicatorUpdateInterval", "intervalCount", "onClick", "onKeyDown", "onViewRendered", "resourceCellTemplate", "rtlEnabled", "schedulerHeight", "schedulerWidth", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDate", "startDayHour", "tabIndex", "timeCellTemplate", "type", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var prepareGenerationOptions = function prepareGenerationOptions(workSpaceProps, renderConfig, isAllDayPanelVisible) {
  var cellDuration = workSpaceProps.cellDuration,
      currentDate = workSpaceProps.currentDate,
      endDayHour = workSpaceProps.endDayHour,
      firstDayOfWeek = workSpaceProps.firstDayOfWeek,
      groupByDate = workSpaceProps.groupByDate,
      groupOrientation = workSpaceProps.groupOrientation,
      groups = workSpaceProps.groups,
      hoursInterval = workSpaceProps.hoursInterval,
      intervalCount = workSpaceProps.intervalCount,
      startDate = workSpaceProps.startDate,
      startDayHour = workSpaceProps.startDayHour,
      type = workSpaceProps.type;
  var getDateForHeaderText = renderConfig.getDateForHeaderText,
      headerCellTextFormat = renderConfig.headerCellTextFormat,
      isGenerateWeekDaysHeaderData = renderConfig.isGenerateWeekDaysHeaderData,
      isProvideVirtualCellsWidth = renderConfig.isProvideVirtualCellsWidth,
      isRenderTimePanel = renderConfig.isRenderTimePanel;
  return {
    startRowIndex: 0,
    startCellIndex: 0,
    groupOrientation: groupOrientation,
    groupByDate: groupByDate,
    groups: groups,
    isProvideVirtualCellsWidth: isProvideVirtualCellsWidth,
    isAllDayPanelVisible: isAllDayPanelVisible,
    selectedCells: undefined,
    focusedCell: undefined,
    headerCellTextFormat: headerCellTextFormat,
    getDateForHeaderText: getDateForHeaderText,
    startDayHour: startDayHour,
    endDayHour: endDayHour,
    cellDuration: cellDuration,
    viewType: type,
    intervalCount: intervalCount,
    hoursInterval: hoursInterval,
    currentDate: currentDate,
    startDate: startDate,
    firstDayOfWeek: firstDayOfWeek,
    isGenerateTimePanelData: isRenderTimePanel,
    isGenerateWeekDaysHeaderData: isGenerateWeekDaysHeaderData
  };
};

var viewFunction = function viewFunction(_ref) {
  var allDayPanelRef = _ref.allDayPanelRef,
      dateTableRef = _ref.dateTableRef,
      dateTableTemplate = _ref.dateTableTemplate,
      groupPanelData = _ref.groupPanelData,
      headerPanelTemplate = _ref.headerPanelTemplate,
      isAllDayPanelVisible = _ref.isAllDayPanelVisible,
      isRenderHeaderEmptyCell = _ref.isRenderHeaderEmptyCell,
      Layout = _ref.layout,
      _ref$props = _ref.props,
      allDayAppointments = _ref$props.allDayAppointments,
      allDayPanelExpanded = _ref$props.allDayPanelExpanded,
      appointments = _ref$props.appointments,
      dataCellTemplate = _ref$props.dataCellTemplate,
      dateCellTemplate = _ref$props.dateCellTemplate,
      groupByDate = _ref$props.groupByDate,
      groupOrientation = _ref$props.groupOrientation,
      groups = _ref$props.groups,
      intervalCount = _ref$props.intervalCount,
      resourceCellTemplate = _ref$props.resourceCellTemplate,
      timeCellTemplate = _ref$props.timeCellTemplate,
      _ref$renderConfig = _ref.renderConfig,
      className = _ref$renderConfig.className,
      isRenderDateHeader = _ref$renderConfig.isRenderDateHeader,
      scrollingDirection = _ref$renderConfig.scrollingDirection,
      timePanelTemplate = _ref.timePanelTemplate,
      viewDataProvider = _ref.viewDataProvider;
  return (0, _inferno.createComponentVNode)(2, Layout, {
    "viewData": viewDataProvider.viewData,
    "dateHeaderData": viewDataProvider.dateHeaderData,
    "timePanelData": viewDataProvider.timePanelData,
    "groupPanelData": groupPanelData,
    "dataCellTemplate": dataCellTemplate,
    "dateCellTemplate": dateCellTemplate,
    "timeCellTemplate": timeCellTemplate,
    "resourceCellTemplate": resourceCellTemplate,
    "groups": groups,
    "groupByDate": groupByDate,
    "groupOrientation": groupOrientation,
    "intervalCount": intervalCount,
    "headerPanelTemplate": headerPanelTemplate,
    "dateTableTemplate": dateTableTemplate,
    "timePanelTemplate": timePanelTemplate,
    "isAllDayPanelCollapsed": !allDayPanelExpanded,
    "isAllDayPanelVisible": isAllDayPanelVisible,
    "isRenderDateHeader": isRenderDateHeader,
    "isRenderHeaderEmptyCell": isRenderHeaderEmptyCell,
    "scrollingDirection": scrollingDirection,
    "className": className,
    "dateTableRef": dateTableRef,
    "allDayPanelRef": allDayPanelRef,
    "appointments": appointments,
    "allDayAppointments": allDayAppointments
  });
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var WorkSpace = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(WorkSpace, _InfernoComponent);

  function WorkSpace(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.dateTableRef = (0, _inferno.createRef)();
    _this.allDayPanelRef = (0, _inferno.createRef)();
    _this.onViewRendered = _this.onViewRendered.bind(_assertThisInitialized(_this));
    _this.createDateTableElementsMeta = _this.createDateTableElementsMeta.bind(_assertThisInitialized(_this));
    _this.createAllDayPanelElementsMeta = _this.createAllDayPanelElementsMeta.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = WorkSpace.prototype;

  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.onViewRendered, [this.props.currentDate, this.props.endDayHour, this.props.groupOrientation, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.onViewRendered, this.props.startDayHour, this.props.type, this.props])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.currentDate, this.props.endDayHour, this.props.groupOrientation, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.onViewRendered, this.props.startDayHour, this.props.type, this.props]);
  };

  _proto.onViewRendered = function onViewRendered() {
    var _this$props = this.props,
        currentDate = _this$props.currentDate,
        endDayHour = _this$props.endDayHour,
        groupOrientation = _this$props.groupOrientation,
        groups = _this$props.groups,
        hoursInterval = _this$props.hoursInterval,
        intervalCount = _this$props.intervalCount,
        onViewRendered = _this$props.onViewRendered,
        startDayHour = _this$props.startDayHour,
        type = _this$props.type;
    var cellCount = this.viewDataProvider.getCellCount({
      intervalCount: intervalCount,
      currentDate: currentDate,
      viewType: type,
      hoursInterval: hoursInterval,
      startDayHour: startDayHour,
      endDayHour: endDayHour
    });
    var totalCellCount = (0, _utils.getTotalCellCount)(cellCount, groupOrientation, groups);
    var dateTableCellsMeta = this.createDateTableElementsMeta(totalCellCount);
    var allDayPanelCellsMeta = this.createAllDayPanelElementsMeta();
    onViewRendered({
      viewDataProvider: this.viewDataProvider,
      cellsMetaData: {
        dateTableCellsMeta: dateTableCellsMeta,
        allDayPanelCellsMeta: allDayPanelCellsMeta
      }
    });
  };

  _proto.createDateTableElementsMeta = function createDateTableElementsMeta(totalCellCount) {
    var dateTableCells = this.dateTableRef.current.querySelectorAll("td");
    var dateTableRect = this.dateTableRef.current.getBoundingClientRect();
    var dateTableCellsMeta = [];
    dateTableCells.forEach(function (cellElement, index) {
      if (index % totalCellCount === 0) {
        dateTableCellsMeta.push([]);
      }

      var cellRect = cellElement.getBoundingClientRect();
      var validCellRect = (0, _utils.createCellElementMetaData)(dateTableRect, cellRect);
      dateTableCellsMeta[dateTableCellsMeta.length - 1].push(validCellRect);
    });
    return dateTableCellsMeta;
  };

  _proto.createAllDayPanelElementsMeta = function createAllDayPanelElementsMeta() {
    if (!this.allDayPanelRef.current) {
      return [];
    }

    var allDayPanelCells = this.allDayPanelRef.current.querySelectorAll("td");
    var allDayPanelRect = this.allDayPanelRef.current.getBoundingClientRect();
    var allDayPanelCellsMeta = [];
    allDayPanelCells.forEach(function (cellElement) {
      var cellRect = cellElement.getBoundingClientRect();
      allDayPanelCellsMeta.push((0, _utils.createCellElementMetaData)(allDayPanelRect, cellRect));
    });
    return allDayPanelCellsMeta;
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      dateTableRef: this.dateTableRef,
      allDayPanelRef: this.allDayPanelRef,
      renderConfig: this.renderConfig,
      layout: this.layout,
      isAllDayPanelVisible: this.isAllDayPanelVisible,
      viewData: this.viewData,
      dateHeaderData: this.dateHeaderData,
      timePanelData: this.timePanelData,
      viewDataProvider: this.viewDataProvider,
      groupPanelData: this.groupPanelData,
      headerPanelTemplate: this.headerPanelTemplate,
      dateTableTemplate: this.dateTableTemplate,
      timePanelTemplate: this.timePanelTemplate,
      isRenderHeaderEmptyCell: this.isRenderHeaderEmptyCell,
      createDateTableElementsMeta: this.createDateTableElementsMeta,
      createAllDayPanelElementsMeta: this.createAllDayPanelElementsMeta,
      restAttributes: this.restAttributes
    });
  };

  _createClass(WorkSpace, [{
    key: "renderConfig",
    get: function get() {
      return (0, _work_space_config.getViewRenderConfigByType)(this.props.type, this.props.intervalCount);
    }
  }, {
    key: "layout",
    get: function get() {
      return this.props.crossScrollingEnabled ? _ordinary_layout.OrdinaryLayout : _ordinary_layout.OrdinaryLayout;
    }
  }, {
    key: "isAllDayPanelVisible",
    get: function get() {
      var showAllDayPanel = this.props.showAllDayPanel;
      var isAllDayPanelSupported = this.renderConfig.isAllDayPanelSupported;
      return isAllDayPanelSupported && showAllDayPanel;
    }
  }, {
    key: "viewData",
    get: function get() {
      return {
        groupedData: [{
          dateTable: [[{
            startDate: new Date(),
            endDate: new Date(),
            index: 0,
            isFirstGroupCell: true,
            isLastGroupCell: true,
            key: 0,
            groupIndex: 0
          }]],
          groupIndex: 0
        }],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
      };
    }
  }, {
    key: "dateHeaderData",
    get: function get() {
      return {
        dataMap: [[]],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        leftVirtualCellWidth: 0,
        rightVirtualCellWidth: 0
      };
    }
  }, {
    key: "timePanelData",
    get: function get() {
      return {
        groupedData: [],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
      };
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      var type = this.props.type;
      var viewDataProvider = new _view_data_provider.default(type);
      var generationOptions = prepareGenerationOptions(this.props, this.renderConfig, this.isAllDayPanelVisible);
      viewDataProvider.update(generationOptions, true);
      return viewDataProvider;
    }
  }, {
    key: "groupPanelData",
    get: function get() {
      var generationOptions = prepareGenerationOptions(this.props, this.renderConfig, this.isAllDayPanelVisible);
      return this.viewDataProvider.getGroupPanelData(generationOptions);
    }
  }, {
    key: "headerPanelTemplate",
    get: function get() {
      var headerPanelTemplate = this.renderConfig.headerPanelTemplate;
      return headerPanelTemplate;
    }
  }, {
    key: "dateTableTemplate",
    get: function get() {
      var dateTableTemplate = this.renderConfig.dateTableTemplate;
      return dateTableTemplate;
    }
  }, {
    key: "timePanelTemplate",
    get: function get() {
      var timePanelTemplate = this.renderConfig.timePanelTemplate;
      return timePanelTemplate;
    }
  }, {
    key: "isRenderHeaderEmptyCell",
    get: function get() {
      var isVerticalGrouping = (0, _utils2.isVerticalGroupingApplied)(this.props.groups, this.props.groupOrientation);
      return isVerticalGrouping || !!this.timePanelTemplate;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
          accessKey = _this$props2.accessKey,
          activeStateEnabled = _this$props2.activeStateEnabled,
          allDayAppointments = _this$props2.allDayAppointments,
          allDayPanelExpanded = _this$props2.allDayPanelExpanded,
          allowMultipleCellSelection = _this$props2.allowMultipleCellSelection,
          appointments = _this$props2.appointments,
          cellDuration = _this$props2.cellDuration,
          className = _this$props2.className,
          crossScrollingEnabled = _this$props2.crossScrollingEnabled,
          currentDate = _this$props2.currentDate,
          dataCellTemplate = _this$props2.dataCellTemplate,
          dateCellTemplate = _this$props2.dateCellTemplate,
          disabled = _this$props2.disabled,
          endDayHour = _this$props2.endDayHour,
          firstDayOfWeek = _this$props2.firstDayOfWeek,
          focusStateEnabled = _this$props2.focusStateEnabled,
          groupByDate = _this$props2.groupByDate,
          groupOrientation = _this$props2.groupOrientation,
          groups = _this$props2.groups,
          height = _this$props2.height,
          hint = _this$props2.hint,
          hoursInterval = _this$props2.hoursInterval,
          hoverStateEnabled = _this$props2.hoverStateEnabled,
          indicatorTime = _this$props2.indicatorTime,
          indicatorUpdateInterval = _this$props2.indicatorUpdateInterval,
          intervalCount = _this$props2.intervalCount,
          onClick = _this$props2.onClick,
          onKeyDown = _this$props2.onKeyDown,
          onViewRendered = _this$props2.onViewRendered,
          resourceCellTemplate = _this$props2.resourceCellTemplate,
          rtlEnabled = _this$props2.rtlEnabled,
          schedulerHeight = _this$props2.schedulerHeight,
          schedulerWidth = _this$props2.schedulerWidth,
          scrolling = _this$props2.scrolling,
          selectedCellData = _this$props2.selectedCellData,
          shadeUntilCurrentTime = _this$props2.shadeUntilCurrentTime,
          showAllDayPanel = _this$props2.showAllDayPanel,
          showCurrentTimeIndicator = _this$props2.showCurrentTimeIndicator,
          startDate = _this$props2.startDate,
          startDayHour = _this$props2.startDayHour,
          tabIndex = _this$props2.tabIndex,
          timeCellTemplate = _this$props2.timeCellTemplate,
          type = _this$props2.type,
          visible = _this$props2.visible,
          width = _this$props2.width,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      return restProps;
    }
  }]);

  return WorkSpace;
}(_inferno2.InfernoComponent);

exports.WorkSpace = WorkSpace;
WorkSpace.defaultProps = _props.WorkSpaceProps;