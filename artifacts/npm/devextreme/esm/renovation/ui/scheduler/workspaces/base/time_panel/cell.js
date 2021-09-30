/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/time_panel/cell.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplate", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text", "timeCellTemplate"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/runtime/inferno";
import { CellBase as Cell, CellBaseProps } from "../cell";
export var viewFunction = viewModel => createComponentVNode(2, Cell, {
  "isFirstGroupCell": viewModel.props.isFirstGroupCell,
  "isLastGroupCell": viewModel.props.isLastGroupCell,
  "contentTemplate": viewModel.props.timeCellTemplate,
  "contentTemplateProps": viewModel.timeCellTemplateProps,
  "className": "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ".concat(viewModel.props.className),
  children: createVNode(1, "div", null, viewModel.props.text, 0)
});
export var TimePanelCellProps = CellBaseProps;

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class TimePanelCell extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get timeCellTemplateProps() {
    var {
      groupIndex,
      groups,
      index,
      startDate,
      text
    } = this.props;
    return {
      data: {
        date: startDate,
        groups,
        groupIndex,
        text
      },
      index
    };
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
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      timeCellTemplateProps: this.timeCellTemplateProps,
      restAttributes: this.restAttributes
    });
  }

}
TimePanelCell.defaultProps = TimePanelCellProps;
