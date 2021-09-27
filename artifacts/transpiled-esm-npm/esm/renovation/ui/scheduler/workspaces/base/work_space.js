import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "allDayAppointments", "allDayPanelExpanded", "allowMultipleCellSelection", "appointments", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "dataCellTemplate", "dateCellTemplate", "disabled", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groupOrientation", "groups", "height", "hint", "hoursInterval", "hoverStateEnabled", "indicatorTime", "indicatorUpdateInterval", "intervalCount", "onClick", "onKeyDown", "onViewRendered", "resourceCellTemplate", "rtlEnabled", "schedulerHeight", "schedulerWidth", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDate", "startDayHour", "tabIndex", "timeCellTemplate", "type", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/runtime/inferno";
import { OrdinaryLayout } from "./ordinary_layout";
import ViewDataProvider from "../../../../../ui/scheduler/workspaces/view_model/view_data_provider";
import { createCellElementMetaData, getTotalCellCount } from "./utils";
import { WorkSpaceProps } from "../props";
import { getViewRenderConfigByType } from "./work_space_config";
import { isVerticalGroupingApplied } from "../utils";

var prepareGenerationOptions = (workSpaceProps, renderConfig, isAllDayPanelVisible) => {
  var {
    cellDuration,
    currentDate,
    endDayHour,
    firstDayOfWeek,
    groupByDate,
    groupOrientation,
    groups,
    hoursInterval,
    intervalCount,
    startDate,
    startDayHour,
    type
  } = workSpaceProps;
  var {
    getDateForHeaderText,
    headerCellTextFormat,
    isGenerateWeekDaysHeaderData,
    isProvideVirtualCellsWidth,
    isRenderTimePanel
  } = renderConfig;
  return {
    startRowIndex: 0,
    startCellIndex: 0,
    groupOrientation,
    groupByDate,
    groups,
    isProvideVirtualCellsWidth,
    isAllDayPanelVisible,
    selectedCells: undefined,
    focusedCell: undefined,
    headerCellTextFormat,
    getDateForHeaderText,
    startDayHour,
    endDayHour,
    cellDuration,
    viewType: type,
    intervalCount,
    hoursInterval,
    currentDate,
    startDate,
    firstDayOfWeek,
    isGenerateTimePanelData: isRenderTimePanel,
    isGenerateWeekDaysHeaderData
  };
};

export var viewFunction = _ref => {
  var {
    allDayPanelRef,
    dateTableRef,
    dateTableTemplate,
    groupPanelData,
    headerPanelTemplate,
    isAllDayPanelVisible,
    isRenderHeaderEmptyCell,
    layout: Layout,
    props: {
      allDayAppointments,
      allDayPanelExpanded,
      appointments,
      dataCellTemplate,
      dateCellTemplate,
      groupByDate,
      groupOrientation,
      groups,
      intervalCount,
      resourceCellTemplate,
      timeCellTemplate
    },
    renderConfig: {
      className,
      isRenderDateHeader,
      scrollingDirection
    },
    timePanelTemplate,
    viewDataProvider
  } = _ref;
  return createComponentVNode(2, Layout, {
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
import { createRef as infernoCreateRef } from "inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class WorkSpace extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.dateTableRef = infernoCreateRef();
    this.allDayPanelRef = infernoCreateRef();
    this.onViewRendered = this.onViewRendered.bind(this);
    this.createDateTableElementsMeta = this.createDateTableElementsMeta.bind(this);
    this.createAllDayPanelElementsMeta = this.createAllDayPanelElementsMeta.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.onViewRendered, [this.props.currentDate, this.props.endDayHour, this.props.groupOrientation, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.onViewRendered, this.props.startDayHour, this.props.type, this.props])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.currentDate, this.props.endDayHour, this.props.groupOrientation, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.onViewRendered, this.props.startDayHour, this.props.type, this.props]);
  }

  onViewRendered() {
    var {
      currentDate,
      endDayHour,
      groupOrientation,
      groups,
      hoursInterval,
      intervalCount,
      onViewRendered,
      startDayHour,
      type
    } = this.props;
    var cellCount = this.viewDataProvider.getCellCount({
      intervalCount,
      currentDate,
      viewType: type,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var totalCellCount = getTotalCellCount(cellCount, groupOrientation, groups);
    var dateTableCellsMeta = this.createDateTableElementsMeta(totalCellCount);
    var allDayPanelCellsMeta = this.createAllDayPanelElementsMeta();
    onViewRendered({
      viewDataProvider: this.viewDataProvider,
      cellsMetaData: {
        dateTableCellsMeta,
        allDayPanelCellsMeta
      }
    });
  }

  get renderConfig() {
    return getViewRenderConfigByType(this.props.type, this.props.intervalCount);
  }

  get layout() {
    return this.props.crossScrollingEnabled ? OrdinaryLayout : OrdinaryLayout;
  }

  get isAllDayPanelVisible() {
    var {
      showAllDayPanel
    } = this.props;
    var {
      isAllDayPanelSupported
    } = this.renderConfig;
    return isAllDayPanelSupported && showAllDayPanel;
  }

  get viewData() {
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

  get dateHeaderData() {
    return {
      dataMap: [[]],
      leftVirtualCellCount: 0,
      rightVirtualCellCount: 0,
      leftVirtualCellWidth: 0,
      rightVirtualCellWidth: 0
    };
  }

  get timePanelData() {
    return {
      groupedData: [],
      leftVirtualCellCount: 0,
      rightVirtualCellCount: 0,
      topVirtualRowCount: 0,
      bottomVirtualRowCount: 0
    };
  }

  get viewDataProvider() {
    var {
      type
    } = this.props;
    var viewDataProvider = new ViewDataProvider(type);
    var generationOptions = prepareGenerationOptions(this.props, this.renderConfig, this.isAllDayPanelVisible);
    viewDataProvider.update(generationOptions, true);
    return viewDataProvider;
  }

  get groupPanelData() {
    var generationOptions = prepareGenerationOptions(this.props, this.renderConfig, this.isAllDayPanelVisible);
    return this.viewDataProvider.getGroupPanelData(generationOptions);
  }

  get headerPanelTemplate() {
    var {
      headerPanelTemplate
    } = this.renderConfig;
    return headerPanelTemplate;
  }

  get dateTableTemplate() {
    var {
      dateTableTemplate
    } = this.renderConfig;
    return dateTableTemplate;
  }

  get timePanelTemplate() {
    var {
      timePanelTemplate
    } = this.renderConfig;
    return timePanelTemplate;
  }

  get isRenderHeaderEmptyCell() {
    var isVerticalGrouping = isVerticalGroupingApplied(this.props.groups, this.props.groupOrientation);
    return isVerticalGrouping || !!this.timePanelTemplate;
  }

  createDateTableElementsMeta(totalCellCount) {
    var dateTableCells = this.dateTableRef.current.querySelectorAll("td");
    var dateTableRect = this.dateTableRef.current.getBoundingClientRect();
    var dateTableCellsMeta = [];
    dateTableCells.forEach((cellElement, index) => {
      if (index % totalCellCount === 0) {
        dateTableCellsMeta.push([]);
      }

      var cellRect = cellElement.getBoundingClientRect();
      var validCellRect = createCellElementMetaData(dateTableRect, cellRect);
      dateTableCellsMeta[dateTableCellsMeta.length - 1].push(validCellRect);
    });
    return dateTableCellsMeta;
  }

  createAllDayPanelElementsMeta() {
    if (!this.allDayPanelRef.current) {
      return [];
    }

    var allDayPanelCells = this.allDayPanelRef.current.querySelectorAll("td");
    var allDayPanelRect = this.allDayPanelRef.current.getBoundingClientRect();
    var allDayPanelCellsMeta = [];
    allDayPanelCells.forEach(cellElement => {
      var cellRect = cellElement.getBoundingClientRect();
      allDayPanelCellsMeta.push(createCellElementMetaData(allDayPanelRect, cellRect));
    });
    return allDayPanelCellsMeta;
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
  }

}
WorkSpace.defaultProps = WorkSpaceProps;