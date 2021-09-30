/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/main_layout_props.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { LayoutProps } from "./layout_props";
export var MainLayoutProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(LayoutProps), Object.getOwnPropertyDescriptors({
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
  isRenderHeaderEmptyCell: true,
  isRenderGroupPanel: false,
  isStandaloneAllDayPanel: false
})));
