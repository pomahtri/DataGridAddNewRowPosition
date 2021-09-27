import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "allDayAppointments", "allDayPanelRef", "appointments", "bottomVirtualRowHeight", "className", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableRef", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelClassName", "groupPanelData", "groups", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelVisible", "isRenderDateHeader", "isRenderHeaderEmptyCell", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "resourceCellTemplate", "rightVirtualCellWidth", "scrollingDirection", "timeCellTemplate", "timePanelData", "timePanelTemplate", "topVirtualRowHeight", "viewData"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/runtime/inferno";
import { combineClasses } from "../../../../utils/combine_classes";
import { Widget } from "../../../common/widget";
import { Scrollable } from "../../../scroll_view/scrollable";
import { isHorizontalGroupingApplied, isVerticalGroupingApplied } from "../utils";
import { GroupPanel } from "./group_panel/group_panel";
import { LayoutProps } from "./layout_props";
import { AllDayPanelLayout } from "./date_table/all_day_panel/layout";
import { HeaderPanelEmptyCell } from "./header_panel_empty_cell";
export var viewFunction = _ref => {
  var {
    classes,
    groupPanelHeight,
    groupPanelRef,
    headerEmptyCellWidth,
    isRenderGroupPanel,
    isStandaloneAllDayPanel,
    props: {
      allDayAppointments,
      allDayPanelRef,
      appointments,
      dataCellTemplate,
      dateCellTemplate,
      dateHeaderData,
      dateTableRef,
      dateTableTemplate: DateTable,
      groupByDate,
      groupOrientation,
      groupPanelClassName,
      groupPanelData,
      groups,
      headerPanelTemplate: HeaderPanel,
      isRenderDateHeader,
      isRenderHeaderEmptyCell,
      resourceCellTemplate,
      scrollingDirection,
      timeCellTemplate,
      timePanelData,
      timePanelTemplate: TimePanel,
      viewData
    },
    timePanelRef
  } = _ref;
  return createComponentVNode(2, Widget, {
    "className": classes,
    children: [createVNode(1, "div", "dx-scheduler-header-panel-container", [isRenderHeaderEmptyCell && createComponentVNode(2, HeaderPanelEmptyCell, {
      "width": headerEmptyCellWidth,
      "isRenderAllDayTitle": isStandaloneAllDayPanel
    }), createVNode(1, "div", "dx-scheduler-header-tables-container", [createVNode(1, "table", "dx-scheduler-header-panel", HeaderPanel({
      dateHeaderData: dateHeaderData,
      groupPanelData: groupPanelData,
      timeCellTemplate: timeCellTemplate,
      dateCellTemplate: dateCellTemplate,
      isRenderDateHeader: isRenderDateHeader,
      groupOrientation: groupOrientation,
      groupByDate: groupByDate,
      groups: groups,
      resourceCellTemplate: resourceCellTemplate
    }), 0), isStandaloneAllDayPanel && createComponentVNode(2, AllDayPanelLayout, {
      "viewData": viewData,
      "dataCellTemplate": dataCellTemplate,
      "tableRef": allDayPanelRef,
      "allDayAppointments": allDayAppointments
    })], 0)], 0), createComponentVNode(2, Scrollable, {
      "useKeyboard": false,
      "bounceEnabled": false,
      "direction": scrollingDirection,
      "className": "dx-scheduler-date-table-scrollable",
      children: createVNode(1, "div", "dx-scheduler-date-table-scrollable-content", [isRenderGroupPanel && createComponentVNode(2, GroupPanel, {
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
      }), createVNode(1, "div", "dx-scheduler-date-table-container", [DateTable({
        tableRef: dateTableRef,
        viewData: viewData,
        groupOrientation: groupOrientation,
        dataCellTemplate: dataCellTemplate
      }), appointments], 0)], 0)
    })]
  });
};
export var OrdinaryLayoutProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(LayoutProps), Object.getOwnPropertyDescriptors({
  get timePanelData() {
    return {
      groupedData: [],
      leftVirtualCellCount: 0,
      rightVirtualCellCount: 0,
      topVirtualRowCount: 0,
      bottomVirtualRowCount: 0
    };
  },

  get groupPanelData() {
    return {
      groupPanelItems: [],
      baseColSpan: 1
    };
  },

  intervalCount: 1,
  className: "",
  isRenderDateHeader: true,

  get groups() {
    return [];
  },

  groupByDate: false,
  groupPanelClassName: "dx-scheduler-work-space-vertical-group-table",
  isAllDayPanelCollapsed: true,
  isAllDayPanelVisible: false,
  isRenderHeaderEmptyCell: true
})));
import { createRef as infernoCreateRef } from "inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class OrdinaryLayout extends InfernoComponent {
  constructor(props) {
    super(props);
    this.timePanelRef = infernoCreateRef();
    this.groupPanelRef = infernoCreateRef();
    this.state = {
      groupPanelHeight: undefined,
      headerEmptyCellWidth: undefined
    };
    this.groupPanelHeightEffect = this.groupPanelHeightEffect.bind(this);
    this.headerEmptyCellWidthEffect = this.headerEmptyCellWidthEffect.bind(this);
  }

  createEffects() {
    var _this$props$allDayPan, _this$props$allDayPan2;

    return [new InfernoEffect(this.groupPanelHeightEffect, [this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan = this.props.allDayPanelRef) === null || _this$props$allDayPan === void 0 ? void 0 : _this$props$allDayPan.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate]), new InfernoEffect(this.headerEmptyCellWidthEffect, [this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan2 = this.props.allDayPanelRef) === null || _this$props$allDayPan2 === void 0 ? void 0 : _this$props$allDayPan2.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate])];
  }

  updateEffects() {
    var _this$_effects$, _this$props$allDayPan3, _this$_effects$2, _this$props$allDayPan4;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan3 = this.props.allDayPanelRef) === null || _this$props$allDayPan3 === void 0 ? void 0 : _this$props$allDayPan3.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.props.headerPanelTemplate, this.props.dateTableTemplate, this.props.timePanelTemplate, this.props.resourceCellTemplate, this.props.timeCellTemplate, this.props.dateCellTemplate, this.props.timePanelData, this.props.dateHeaderData, this.props.groupPanelData, this.props.intervalCount, this.props.className, this.props.isRenderDateHeader, this.props.groups, this.props.groupByDate, this.props.groupPanelClassName, this.props.isWorkSpaceWithOddCells, this.props.isAllDayPanelCollapsed, this.props.isAllDayPanelVisible, this.props.isRenderHeaderEmptyCell, this.props.scrollingDirection, (_this$props$allDayPan4 = this.props.allDayPanelRef) === null || _this$props$allDayPan4 === void 0 ? void 0 : _this$props$allDayPan4.current, this.props.appointments, this.props.allDayAppointments, this.props.viewData, this.props.groupOrientation, this.props.leftVirtualCellWidth, this.props.rightVirtualCellWidth, this.props.topVirtualRowHeight, this.props.bottomVirtualRowHeight, this.props.addDateTableClass, this.props.dataCellTemplate]);
  }

  groupPanelHeightEffect() {
    this.setState(__state_argument => {
      var _this$props$dateTable;

      return {
        groupPanelHeight: (_this$props$dateTable = this.props.dateTableRef.current) === null || _this$props$dateTable === void 0 ? void 0 : _this$props$dateTable.getBoundingClientRect().height
      };
    });
  }

  headerEmptyCellWidthEffect() {
    var _this$timePanelRef$cu, _this$timePanelRef$cu2, _this$groupPanelRef$c, _this$groupPanelRef$c2;

    var timePanelWidth = (_this$timePanelRef$cu = (_this$timePanelRef$cu2 = this.timePanelRef.current) === null || _this$timePanelRef$cu2 === void 0 ? void 0 : _this$timePanelRef$cu2.getBoundingClientRect().width) !== null && _this$timePanelRef$cu !== void 0 ? _this$timePanelRef$cu : 0;
    var groupPanelWidth = (_this$groupPanelRef$c = (_this$groupPanelRef$c2 = this.groupPanelRef.current) === null || _this$groupPanelRef$c2 === void 0 ? void 0 : _this$groupPanelRef$c2.getBoundingClientRect().width) !== null && _this$groupPanelRef$c !== void 0 ? _this$groupPanelRef$c : 0;
    this.setState(__state_argument => ({
      headerEmptyCellWidth: timePanelWidth + groupPanelWidth
    }));
  }

  get classes() {
    var {
      className,
      groupByDate,
      groupOrientation,
      groups,
      intervalCount,
      isAllDayPanelCollapsed,
      isAllDayPanelVisible,
      isWorkSpaceWithOddCells
    } = this.props;
    return combineClasses({
      [className]: !!className,
      "dx-scheduler-work-space-count": intervalCount > 1,
      "dx-scheduler-work-space-odd-cells": !!isWorkSpaceWithOddCells,
      "dx-scheduler-work-space-all-day-collapsed": isAllDayPanelCollapsed && isAllDayPanelVisible,
      "dx-scheduler-work-space-all-day": isAllDayPanelVisible,
      "dx-scheduler-work-space-group-by-date": groupByDate,
      "dx-scheduler-work-space-grouped": groups.length > 0,
      "dx-scheduler-work-space-vertical-grouped": isVerticalGroupingApplied(groups, groupOrientation),
      "dx-scheduler-group-row-count-one": isHorizontalGroupingApplied(groups, groupOrientation) && groups.length === 1,
      "dx-scheduler-group-row-count-two": isHorizontalGroupingApplied(groups, groupOrientation) && groups.length === 2,
      "dx-scheduler-group-row-count-three": isHorizontalGroupingApplied(groups, groupOrientation) && groups.length === 3,
      "dx-scheduler-group-column-count-one": isVerticalGroupingApplied(groups, groupOrientation) && groups.length === 1,
      "dx-scheduler-group-column-count-two": isVerticalGroupingApplied(groups, groupOrientation) && groups.length === 2,
      "dx-scheduler-group-column-count-three": isVerticalGroupingApplied(groups, groupOrientation) && groups.length === 3,
      "dx-scheduler-work-space": true
    });
  }

  get isRenderGroupPanel() {
    var {
      groupOrientation,
      groups
    } = this.props;
    return isVerticalGroupingApplied(groups, groupOrientation);
  }

  get isStandaloneAllDayPanel() {
    var {
      groupOrientation,
      groups,
      isAllDayPanelVisible
    } = this.props;
    return !isVerticalGroupingApplied(groups, groupOrientation) && isAllDayPanelVisible;
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
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
  }

}
OrdinaryLayout.defaultProps = OrdinaryLayoutProps;