/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/ordinary_layout.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.OrdinaryLayout = exports.OrdinaryLayoutProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _inferno2 = require("@devextreme/runtime/inferno");

var _combine_classes = require("../../../../utils/combine_classes");

var _widget = require("../../../common/widget");

var _scrollable = require("../../../scroll_view/scrollable");

var _utils = require("../utils");

var _group_panel = require("./group_panel/group_panel");

var _layout_props = require("./layout_props");

var _layout = require("./date_table/all_day_panel/layout");

var _header_panel_empty_cell = require("./header_panel_empty_cell");

var _excluded = ["addDateTableClass", "allDayAppointments", "allDayPanelRef", "appointments", "bottomVirtualRowHeight", "className", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableRef", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelClassName", "groupPanelData", "groups", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelVisible", "isRenderDateHeader", "isRenderHeaderEmptyCell", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "resourceCellTemplate", "rightVirtualCellWidth", "scrollingDirection", "timeCellTemplate", "timePanelData", "timePanelTemplate", "topVirtualRowHeight", "viewData"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var classes = _ref.classes,
      groupPanelHeight = _ref.groupPanelHeight,
      groupPanelRef = _ref.groupPanelRef,
      headerEmptyCellWidth = _ref.headerEmptyCellWidth,
      isRenderGroupPanel = _ref.isRenderGroupPanel,
      isStandaloneAllDayPanel = _ref.isStandaloneAllDayPanel,
      _ref$props = _ref.props,
      allDayAppointments = _ref$props.allDayAppointments,
      allDayPanelRef = _ref$props.allDayPanelRef,
      appointments = _ref$props.appointments,
      dataCellTemplate = _ref$props.dataCellTemplate,
      dateCellTemplate = _ref$props.dateCellTemplate,
      dateHeaderData = _ref$props.dateHeaderData,
      dateTableRef = _ref$props.dateTableRef,
      DateTable = _ref$props.dateTableTemplate,
      groupByDate = _ref$props.groupByDate,
      groupOrientation = _ref$props.groupOrientation,
      groupPanelClassName = _ref$props.groupPanelClassName,
      groupPanelData = _ref$props.groupPanelData,
      groups = _ref$props.groups,
      HeaderPanel = _ref$props.headerPanelTemplate,
      isRenderDateHeader = _ref$props.isRenderDateHeader,
      isRenderHeaderEmptyCell = _ref$props.isRenderHeaderEmptyCell,
      resourceCellTemplate = _ref$props.resourceCellTemplate,
      scrollingDirection = _ref$props.scrollingDirection,
      timeCellTemplate = _ref$props.timeCellTemplate,
      timePanelData = _ref$props.timePanelData,
      TimePanel = _ref$props.timePanelTemplate,
      viewData = _ref$props.viewData,
      timePanelRef = _ref.timePanelRef;
  return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
    "className": classes,
    children: [(0, _inferno.createVNode)(1, "div", "dx-scheduler-header-panel-container", [isRenderHeaderEmptyCell && (0, _inferno.createComponentVNode)(2, _header_panel_empty_cell.HeaderPanelEmptyCell, {
      "width": headerEmptyCellWidth,
      "isRenderAllDayTitle": isStandaloneAllDayPanel
    }), (0, _inferno.createVNode)(1, "div", "dx-scheduler-header-tables-container", [(0, _inferno.createVNode)(1, "table", "dx-scheduler-header-panel", HeaderPanel({
      dateHeaderData: dateHeaderData,
      groupPanelData: groupPanelData,
      timeCellTemplate: timeCellTemplate,
      dateCellTemplate: dateCellTemplate,
      isRenderDateHeader: isRenderDateHeader,
      groupOrientation: groupOrientation,
      groupByDate: groupByDate,
      groups: groups,
      resourceCellTemplate: resourceCellTemplate
    }), 0), isStandaloneAllDayPanel && (0, _inferno.createComponentVNode)(2, _layout.AllDayPanelLayout, {
      "viewData": viewData,
      "dataCellTemplate": dataCellTemplate,
      "tableRef": allDayPanelRef,
      "allDayAppointments": allDayAppointments
    })], 0)], 0), (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
      "useKeyboard": false,
      "bounceEnabled": false,
      "direction": scrollingDirection,
      "className": "dx-scheduler-date-table-scrollable",
      children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-scrollable-content", [isRenderGroupPanel && (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
        "groupPanelData": groupPanelData,
        "className": groupPanelClassName,
        "groupOrientation": groupOrientation,
        "groupByDate": groupByDate,
        "groups": groups,
        "resourceCellTemplate": resourceCellTemplate,
        "height": groupPanelHeight,
        "elementRef": groupPanelRef
      }), !!TimePanel && TimePanel({
        timePanelData: timePanelData,
        timeCellTemplate: timeCellTemplate,
        groupOrientation: groupOrientation,
        tableRef: timePanelRef
      }), (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-container", [DateTable({
        tableRef: dateTableRef,
        viewData: viewData,
        groupOrientation: groupOrientation,
        dataCellTemplate: dataCellTemplate
      }), appointments], 0)], 0)
    })]
  });
};

exports.viewFunction = viewFunction;
var OrdinaryLayoutProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_layout_props.LayoutProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
  intervalCount: 1,
  className: "",
  isRenderDateHeader: true,
  groupByDate: false,
  groupPanelClassName: "dx-scheduler-work-space-vertical-group-table",
  isAllDayPanelCollapsed: true,
  isAllDayPanelVisible: false,
  isRenderHeaderEmptyCell: true
}, {
  timePanelData: {
    get: function get() {
      return {
        groupedData: [],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
      };
    },
    configurable: true,
    enumerable: true
  },
  groupPanelData: {
    get: function get() {
      return {
        groupPanelItems: [],
        baseColSpan: 1
      };
    },
    configurable: true,
    enumerable: true
  },
  groups: {
    get: function get() {
      return [];
    },
    configurable: true,
    enumerable: true
  }
}))));
exports.OrdinaryLayoutProps = OrdinaryLayoutProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var OrdinaryLayout = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(OrdinaryLayout, _InfernoComponent);

  function OrdinaryLayout(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.timePanelRef = (0, _inferno.createRef)();
    _this.groupPanelRef = (0, _inferno.createRef)();
    _this.state = {
      groupPanelHeight: undefined,
      headerEmptyCellWidth: undefined
    };
    _this.groupPanelHeightEffect = _this.groupPanelHeightEffect.bind(_assertThisInitialized(_this));
    _this.headerEmptyCellWidthEffect = _this.headerEmptyCellWidthEffect.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = OrdinaryLayout.prototype;

  _proto.createEffects = function createEffects() {
    var _this$props$allDayPan, _this$props$allDayPan2;

    return [new _inferno2.InfernoEffect(this.groupPanelHeightEffect, [this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan = this.props.allDayPanelRef) === null || _this$props$allDayPan === void 0 ? void 0 : _this$props$allDayPan.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate]), new _inferno2.InfernoEffect(this.headerEmptyCellWidthEffect, [this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan2 = this.props.allDayPanelRef) === null || _this$props$allDayPan2 === void 0 ? void 0 : _this$props$allDayPan2.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$props$allDayPan3, _this$_effects$2, _this$props$allDayPan4;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan3 = this.props.allDayPanelRef) === null || _this$props$allDayPan3 === void 0 ? void 0 : _this$props$allDayPan3.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan4 = this.props.allDayPanelRef) === null || _this$props$allDayPan4 === void 0 ? void 0 : _this$props$allDayPan4.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate]);
  };

  _proto.groupPanelHeightEffect = function groupPanelHeightEffect() {
    var _this2 = this;

    this.setState(function (__state_argument) {
      var _this2$props$dateTabl;

      return {
        groupPanelHeight: (_this2$props$dateTabl = _this2.props.dateTableRef.current) === null || _this2$props$dateTabl === void 0 ? void 0 : _this2$props$dateTabl.getBoundingClientRect().height
      };
    });
  };

  _proto.headerEmptyCellWidthEffect = function headerEmptyCellWidthEffect() {
    var _this$timePanelRef$cu, _this$timePanelRef$cu2, _this$groupPanelRef$c, _this$groupPanelRef$c2;

    var timePanelWidth = (_this$timePanelRef$cu = (_this$timePanelRef$cu2 = this.timePanelRef.current) === null || _this$timePanelRef$cu2 === void 0 ? void 0 : _this$timePanelRef$cu2.getBoundingClientRect().width) !== null && _this$timePanelRef$cu !== void 0 ? _this$timePanelRef$cu : 0;
    var groupPanelWidth = (_this$groupPanelRef$c = (_this$groupPanelRef$c2 = this.groupPanelRef.current) === null || _this$groupPanelRef$c2 === void 0 ? void 0 : _this$groupPanelRef$c2.getBoundingClientRect().width) !== null && _this$groupPanelRef$c !== void 0 ? _this$groupPanelRef$c : 0;
    this.setState(function (__state_argument) {
      return {
        headerEmptyCellWidth: timePanelWidth + groupPanelWidth
      };
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        headerPanelTemplate: getTemplate(props.headerPanelTemplate),
        dateTableTemplate: getTemplate(props.dateTableTemplate),
        timePanelTemplate: getTemplate(props.timePanelTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      groupPanelHeight: this.state.groupPanelHeight,
      headerEmptyCellWidth: this.state.headerEmptyCellWidth,
      timePanelRef: this.timePanelRef,
      groupPanelRef: this.groupPanelRef,
      classes: this.classes,
      isRenderGroupPanel: this.isRenderGroupPanel,
      isStandaloneAllDayPanel: this.isStandaloneAllDayPanel,
      restAttributes: this.restAttributes
    });
  };

  _createClass(OrdinaryLayout, [{
    key: "classes",
    get: function get() {
      var _combineClasses;

      var _this$props = this.props,
          className = _this$props.className,
          groupByDate = _this$props.groupByDate,
          groupOrientation = _this$props.groupOrientation,
          groups = _this$props.groups,
          intervalCount = _this$props.intervalCount,
          isAllDayPanelCollapsed = _this$props.isAllDayPanelCollapsed,
          isAllDayPanelVisible = _this$props.isAllDayPanelVisible,
          isWorkSpaceWithOddCells = _this$props.isWorkSpaceWithOddCells;
      return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, className, !!className), _defineProperty(_combineClasses, "dx-scheduler-work-space-count", intervalCount > 1), _defineProperty(_combineClasses, "dx-scheduler-work-space-odd-cells", !!isWorkSpaceWithOddCells), _defineProperty(_combineClasses, "dx-scheduler-work-space-all-day-collapsed", isAllDayPanelCollapsed && isAllDayPanelVisible), _defineProperty(_combineClasses, "dx-scheduler-work-space-all-day", isAllDayPanelVisible), _defineProperty(_combineClasses, "dx-scheduler-work-space-group-by-date", groupByDate), _defineProperty(_combineClasses, "dx-scheduler-work-space-grouped", groups.length > 0), _defineProperty(_combineClasses, "dx-scheduler-work-space-vertical-grouped", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation)), _defineProperty(_combineClasses, "dx-scheduler-group-row-count-one", (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && groups.length === 1), _defineProperty(_combineClasses, "dx-scheduler-group-row-count-two", (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && groups.length === 2), _defineProperty(_combineClasses, "dx-scheduler-group-row-count-three", (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && groups.length === 3), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-one", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && groups.length === 1), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-two", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && groups.length === 2), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-three", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && groups.length === 3), _defineProperty(_combineClasses, "dx-scheduler-work-space", true), _combineClasses));
    }
  }, {
    key: "isRenderGroupPanel",
    get: function get() {
      var _this$props2 = this.props,
          groupOrientation = _this$props2.groupOrientation,
          groups = _this$props2.groups;
      return (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
    }
  }, {
    key: "isStandaloneAllDayPanel",
    get: function get() {
      var _this$props3 = this.props,
          groupOrientation = _this$props3.groupOrientation,
          groups = _this$props3.groups,
          isAllDayPanelVisible = _this$props3.isAllDayPanelVisible;
      return !(0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && isAllDayPanelVisible;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props4 = this.props,
          addDateTableClass = _this$props4.addDateTableClass,
          allDayAppointments = _this$props4.allDayAppointments,
          allDayPanelRef = _this$props4.allDayPanelRef,
          appointments = _this$props4.appointments,
          bottomVirtualRowHeight = _this$props4.bottomVirtualRowHeight,
          className = _this$props4.className,
          dataCellTemplate = _this$props4.dataCellTemplate,
          dateCellTemplate = _this$props4.dateCellTemplate,
          dateHeaderData = _this$props4.dateHeaderData,
          dateTableRef = _this$props4.dateTableRef,
          dateTableTemplate = _this$props4.dateTableTemplate,
          groupByDate = _this$props4.groupByDate,
          groupOrientation = _this$props4.groupOrientation,
          groupPanelClassName = _this$props4.groupPanelClassName,
          groupPanelData = _this$props4.groupPanelData,
          groups = _this$props4.groups,
          headerPanelTemplate = _this$props4.headerPanelTemplate,
          intervalCount = _this$props4.intervalCount,
          isAllDayPanelCollapsed = _this$props4.isAllDayPanelCollapsed,
          isAllDayPanelVisible = _this$props4.isAllDayPanelVisible,
          isRenderDateHeader = _this$props4.isRenderDateHeader,
          isRenderHeaderEmptyCell = _this$props4.isRenderHeaderEmptyCell,
          isWorkSpaceWithOddCells = _this$props4.isWorkSpaceWithOddCells,
          leftVirtualCellWidth = _this$props4.leftVirtualCellWidth,
          resourceCellTemplate = _this$props4.resourceCellTemplate,
          rightVirtualCellWidth = _this$props4.rightVirtualCellWidth,
          scrollingDirection = _this$props4.scrollingDirection,
          timeCellTemplate = _this$props4.timeCellTemplate,
          timePanelData = _this$props4.timePanelData,
          timePanelTemplate = _this$props4.timePanelTemplate,
          topVirtualRowHeight = _this$props4.topVirtualRowHeight,
          viewData = _this$props4.viewData,
          restProps = _objectWithoutProperties(_this$props4, _excluded);

      return restProps;
    }
  }]);

  return OrdinaryLayout;
}(_inferno2.InfernoComponent);

exports.OrdinaryLayout = OrdinaryLayout;
OrdinaryLayout.defaultProps = OrdinaryLayoutProps;
