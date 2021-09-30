/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/group_panel/group_panel.j.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from "../../../../../../core/component_registrator";
import BaseComponent from "../../../../../component_wrapper/common/component";
import { GroupPanel as GroupPanelComponent } from "./group_panel";
export default class GroupPanel extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["resourceCellTemplate"],
      props: ["groups", "groupOrientation", "groupPanelData", "groupByDate", "height", "className", "resourceCellTemplate"]
    };
  }

  get _viewComponent() {
    return GroupPanelComponent;
  }

}
registerComponent("dxGroupPanel", GroupPanel);
