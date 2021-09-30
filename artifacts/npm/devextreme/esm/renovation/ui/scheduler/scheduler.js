/**
* DevExtreme (esm/renovation/ui/scheduler/scheduler.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "adaptivityEnabled", "allDayExpr", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "disabled", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "height", "hint", "hoverStateEnabled", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onClick", "onKeyDown", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "rtlEnabled", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "tabIndex", "textExpr", "timeCellTemplate", "timeZone", "toolbar", "useDropDownViewSwitcher", "views", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/runtime/inferno";
import { SchedulerProps } from "./props";
import { Widget } from "../common/widget";
import { getCurrentViewConfig, getCurrentViewProps } from "./model/views";
import { WorkSpace } from "./workspaces/base/work_space";
import { SchedulerToolbar } from "./header/header";
import { getViewDataGeneratorByViewType } from "../../../ui/scheduler/workspaces/view_model/utils";
import { createDataAccessors, createTimeZoneCalculator } from "./common";
import { loadResources } from "../../../ui/scheduler/resources/utils";
export var viewFunction = _ref => {
  var {
    currentViewConfig,
    loadedResources,
    onViewRendered,
    props: {
      accessKey,
      activeStateEnabled,
      className,
      currentView,
      customizeDateNavigatorText,
      disabled,
      height,
      hint,
      hoverStateEnabled,
      max,
      min,
      rtlEnabled,
      tabIndex,
      toolbar: toolbarItems,
      useDropDownViewSwitcher,
      views,
      visible,
      width
    },
    restAttributes,
    setCurrentDate,
    setCurrentView,
    startViewDate
  } = _ref;
  var {
    allDayPanelExpanded,
    allowMultipleCellSelection,
    cellDuration,
    crossScrollingEnabled,
    currentDate,
    endDayHour,
    firstDayOfWeek,
    groupByDate,
    groupOrientation,
    hoursInterval,
    indicatorTime,
    indicatorUpdateInterval,
    intervalCount,
    scrolling,
    shadeUntilCurrentTime,
    showAllDayPanel,
    showCurrentTimeIndicator,
    startDate,
    startDayHour,
    type
  } = currentViewConfig;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "classes": "dx-scheduler",
    "accessKey": accessKey,
    "activeStateEnabled": activeStateEnabled,
    "disabled": disabled,
    "focusStateEnabled": false,
    "height": height,
    "hint": hint,
    "hoverStateEnabled": hoverStateEnabled,
    "rtlEnabled": rtlEnabled,
    "tabIndex": tabIndex,
    "visible": visible,
    "width": width,
    "className": className
  }, restAttributes, {
    children: createVNode(1, "div", "dx-scheduler-container", [toolbarItems.length !== 0 && createComponentVNode(2, SchedulerToolbar, {
      "items": toolbarItems,
      "views": views,
      "currentView": currentView,
      "onCurrentViewUpdate": setCurrentView,
      "currentDate": currentDate,
      "onCurrentDateUpdate": setCurrentDate,
      "startViewDate": startViewDate,
      "min": min,
      "max": max,
      "intervalCount": intervalCount,
      "firstDayOfWeek": firstDayOfWeek,
      "useDropDownViewSwitcher": useDropDownViewSwitcher,
      "customizationFunction": customizeDateNavigatorText
    }), createComponentVNode(2, WorkSpace, {
      "firstDayOfWeek": firstDayOfWeek,
      "startDayHour": startDayHour,
      "endDayHour": endDayHour,
      "cellDuration": cellDuration,
      "groupByDate": groupByDate,
      "scrolling": scrolling,
      "currentDate": currentDate,
      "intervalCount": intervalCount,
      "groupOrientation": groupOrientation,
      "startDate": startDate,
      "showAllDayPanel": showAllDayPanel,
      "showCurrentTimeIndicator": showCurrentTimeIndicator,
      "indicatorUpdateInterval": indicatorUpdateInterval,
      "shadeUntilCurrentTime": shadeUntilCurrentTime,
      "crossScrollingEnabled": crossScrollingEnabled,
      "hoursInterval": hoursInterval,
      "groups": loadedResources,
      "type": type,
      "indicatorTime": indicatorTime,
      "allowMultipleCellSelection": allowMultipleCellSelection,
      "allDayPanelExpanded": allDayPanelExpanded,
      "onViewRendered": onViewRendered,
      "appointments": createVNode(1, "div", "appointments"),
      "allDayAppointments": createVNode(1, "div", "all-day-appointments")
    })], 0)
  })));
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class Scheduler extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      instance: undefined,
      viewDataProvider: undefined,
      cellsMetaData: undefined,
      resourcePromisesMap: new Map(),
      loadedResources: [],
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.props.defaultCurrentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.props.defaultCurrentView
    };
    this.getComponentInstance = this.getComponentInstance.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.updateAppointment = this.updateAppointment.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.getEndViewDate = this.getEndViewDate.bind(this);
    this.getStartViewDate = this.getStartViewDate.bind(this);
    this.hideAppointmentPopup = this.hideAppointmentPopup.bind(this);
    this.hideAppointmentTooltip = this.hideAppointmentTooltip.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToTime = this.scrollToTime.bind(this);
    this.showAppointmentPopup = this.showAppointmentPopup.bind(this);
    this.showAppointmentTooltip = this.showAppointmentTooltip.bind(this);
    this.dispose = this.dispose.bind(this);
    this.loadGroupResources = this.loadGroupResources.bind(this);
    this.onViewRendered = this.onViewRendered.bind(this);
    this.setCurrentView = this.setCurrentView.bind(this);
    this.setCurrentDate = this.setCurrentDate.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.dispose, []), new InfernoEffect(this.loadGroupResources, [this.props.groups, this.props.resources, this.state.resourcePromisesMap])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.groups, this.props.resources, this.state.resourcePromisesMap]);
  }

  dispose() {
    return () => {
      this.state.instance.dispose();
    };
  }

  loadGroupResources() {
    var {
      groups,
      resources
    } = this.props;
    loadResources(groups, resources, this.state.resourcePromisesMap).then(loadedResources => {
      this.setState(__state_argument => ({
        loadedResources: loadedResources
      }));
    });
  }

  get currentViewProps() {
    var {
      views
    } = this.props;
    return getCurrentViewProps(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, views);
  }

  get currentViewConfig() {
    return getCurrentViewConfig(this.currentViewProps, _extends({}, this.props, {
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
    }));
  }

  get dataAccessors() {
    return createDataAccessors(_extends({}, this.props, {
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
    }));
  }

  get startViewDate() {
    var type = this.props.currentView !== undefined ? this.props.currentView : this.state.currentView;
    var {
      currentDate,
      firstDayOfWeek,
      intervalCount,
      startDate,
      startDayHour
    } = this.currentViewConfig;
    var options = {
      currentDate,
      startDayHour,
      startDate,
      intervalCount,
      firstDayOfWeek
    };
    var viewDataGenerator = getViewDataGeneratorByViewType(type);
    var startViewDate = viewDataGenerator.getStartViewDate(options);
    return startViewDate;
  }

  get isVirtualScrolling() {
    var _this$currentViewProp;

    return this.props.scrolling.mode === "virtual" || ((_this$currentViewProp = this.currentViewProps.scrolling) === null || _this$currentViewProp === void 0 ? void 0 : _this$currentViewProp.mode) === "virtual";
  }

  get timeZoneCalculator() {
    return createTimeZoneCalculator(this.props.timeZone);
  }

  onViewRendered(viewMetaData) {
    this.setState(__state_argument => ({
      viewDataProvider: viewMetaData.viewDataProvider
    }));
    this.setState(__state_argument => ({
      cellsMetaData: viewMetaData.cellsMetaData
    }));
  }

  setCurrentView(view) {
    {
      var __newValue;

      this.setState(__state_argument => {
        __newValue = view;
        return {
          currentView: __newValue
        };
      });
      this.props.currentViewChange(__newValue);
    }
  }

  setCurrentDate(date) {
    {
      var __newValue;

      this.setState(__state_argument => {
        __newValue = date;
        return {
          currentDate: __newValue
        };
      });
      this.props.currentDateChange(__newValue);
    }
  }

  get restAttributes() {
    var _this$props$currentDa = _extends({}, this.props, {
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$currentDa, _excluded);

    return restProps;
  }

  getComponentInstance() {
    return this.state.instance;
  }

  addAppointment(appointment) {
    this.state.instance.addAppointment(appointment);
  }

  deleteAppointment(appointment) {
    this.state.instance.deleteAppointment(appointment);
  }

  updateAppointment(target, appointment) {
    this.state.instance.updateAppointment(target, appointment);
  }

  getDataSource() {
    return this.state.instance.getDataSource();
  }

  getEndViewDate() {
    return this.state.instance.getEndViewDate();
  }

  getStartViewDate() {
    return this.state.instance.getStartViewDate();
  }

  hideAppointmentPopup(saveChanges) {
    this.state.instance.hideAppointmentPopup(saveChanges);
  }

  hideAppointmentTooltip() {
    this.state.instance.hideAppointmentTooltip();
  }

  scrollTo(date, group, allDay) {
    this.state.instance.scrollTo(date, group, allDay);
  }

  scrollToTime(hours, minutes, date) {
    this.state.instance.scrollToTime(hours, minutes, date);
  }

  showAppointmentPopup(appointmentData, createNewAppointment, currentAppointmentData) {
    this.state.instance.showAppointmentPopup(appointmentData, createNewAppointment, currentAppointmentData);
  }

  showAppointmentTooltip(appointmentData, target, currentAppointmentData) {
    this.state.instance.showAppointmentTooltip(appointmentData, target, currentAppointmentData);
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView,
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate),
        appointmentTemplate: getTemplate(props.appointmentTemplate),
        appointmentTooltipTemplate: getTemplate(props.appointmentTooltipTemplate)
      }),
      instance: this.state.instance,
      viewDataProvider: this.state.viewDataProvider,
      cellsMetaData: this.state.cellsMetaData,
      resourcePromisesMap: this.state.resourcePromisesMap,
      loadedResources: this.state.loadedResources,
      currentViewProps: this.currentViewProps,
      currentViewConfig: this.currentViewConfig,
      dataAccessors: this.dataAccessors,
      startViewDate: this.startViewDate,
      isVirtualScrolling: this.isVirtualScrolling,
      timeZoneCalculator: this.timeZoneCalculator,
      onViewRendered: this.onViewRendered,
      setCurrentView: this.setCurrentView,
      setCurrentDate: this.setCurrentDate,
      restAttributes: this.restAttributes
    });
  }

}
Scheduler.defaultProps = SchedulerProps;
