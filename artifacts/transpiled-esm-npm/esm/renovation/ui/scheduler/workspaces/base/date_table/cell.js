import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplate", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isFocused", "isLastGroupCell", "isSelected", "otherMonth", "startDate", "text", "today"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/runtime/inferno";
import { CellBase as Cell, CellBaseProps } from "../cell";
import { combineClasses } from "../../../../../utils/combine_classes";
var ADD_APPOINTMENT_LABEL = "Add appointment";
export var viewFunction = _ref => {
  var {
    ariaLabel,
    classes,
    dataCellTemplateProps,
    props: {
      children,
      dataCellTemplate,
      isFirstGroupCell,
      isLastGroupCell
    }
  } = _ref;
  return createComponentVNode(2, Cell, {
    "isFirstGroupCell": isFirstGroupCell,
    "isLastGroupCell": isLastGroupCell,
    "contentTemplate": dataCellTemplate,
    "contentTemplateProps": dataCellTemplateProps,
    "className": classes,
    "ariaLabel": ariaLabel,
    children: children
  });
};
export var DateTableCellBaseProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(CellBaseProps), Object.getOwnPropertyDescriptors({
  otherMonth: false,
  today: false,
  firstDayOfMonth: false,
  isSelected: false,
  isFocused: false
})));

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class DateTableCellBase extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get classes() {
    var {
      allDay,
      className,
      isFocused,
      isSelected
    } = this.props;
    return combineClasses({
      "dx-scheduler-cell-sizes-horizontal": true,
      "dx-scheduler-cell-sizes-vertical": !allDay,
      "dx-scheduler-date-table-cell": !allDay,
      "dx-state-focused": isSelected,
      "dx-scheduler-focused-cell": isFocused,
      [className]: true
    });
  }

  get dataCellTemplateProps() {
    var {
      allDay,
      contentTemplateProps,
      endDate,
      groupIndex,
      groups,
      index,
      startDate
    } = this.props;
    return {
      data: _extends({
        startDate,
        endDate,
        groups,
        groupIndex: groups ? groupIndex : undefined,
        text: "",
        allDay: !!allDay || undefined
      }, contentTemplateProps.data),
      index
    };
  }

  get ariaLabel() {
    return this.props.isSelected ? ADD_APPOINTMENT_LABEL : undefined;
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
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      classes: this.classes,
      dataCellTemplateProps: this.dataCellTemplateProps,
      ariaLabel: this.ariaLabel,
      restAttributes: this.restAttributes
    });
  }

}
DateTableCellBase.defaultProps = DateTableCellBaseProps;