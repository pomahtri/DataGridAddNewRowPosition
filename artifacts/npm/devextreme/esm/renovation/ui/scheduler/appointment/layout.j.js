/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/layout.j.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from "../../../../core/component_registrator";
import BaseComponent from "../../../component_wrapper/common/component";
import { AppointmentLayout as AppointmentLayoutComponent } from "./layout";
export default class AppointmentLayout extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["appointmentTemplate"],
      props: ["appointments", "appointmentTemplate"]
    };
  }

  get _viewComponent() {
    return AppointmentLayoutComponent;
  }

}
registerComponent("dxAppointmentLayout", AppointmentLayout);
