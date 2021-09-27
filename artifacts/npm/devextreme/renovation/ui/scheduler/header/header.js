/**
* DevExtreme (renovation/ui/scheduler/header/header.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.defaultOptions = defaultOptions;
exports.SchedulerToolbar = exports.SchedulerToolbarProps = exports.SchedulerToolbarBaseProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _inferno2 = require("@devextreme/runtime/inferno");

var _devices = _interopRequireDefault(require("../../../../core/devices"));

var _toolbar = require("../../toolbar/toolbar");

require("../../../../ui/button_group");

require("../../../../ui/drop_down_button");

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _utils = require("../../../../ui/scheduler/header/utils");

var _utils2 = require("./utils");

var _props = require("../props");

var _calendar = require("./calendar");

var _utils3 = require("../../../../core/options/utils");

var _excluded = ["agendaDuration", "currentDate", "currentView", "currentViewChange", "customizationFunction", "defaultCurrentView", "firstDayOfWeek", "intervalCount", "items", "max", "min", "onCurrentDateUpdate", "onCurrentViewUpdate", "startViewDate", "useDropDownViewSwitcher", "useShortDateFormat", "views"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var trimTime = _date.default.trimTime;

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      currentDate = _viewModel$props.currentDate,
      firstDayOfWeek = _viewModel$props.firstDayOfWeek,
      max = _viewModel$props.max,
      min = _viewModel$props.min;
  var calendarVisible = viewModel.calendarVisible,
      changeCalendarDate = viewModel.changeCalendarDate,
      changeCalendarVisible = viewModel.changeCalendarVisible,
      items = viewModel.items;
  return (0, _inferno.createVNode)(1, "div", "dx-scheduler-header", [(0, _inferno.createComponentVNode)(2, _calendar.SchedulerCalendar, {
    "currentDate": currentDate,
    "onCurrentDateUpdate": changeCalendarDate,
    "min": min,
    "max": max,
    "firstDayOfWeek": firstDayOfWeek,
    "visible": calendarVisible,
    "onVisibleUpdate": changeCalendarVisible
  }), (0, _inferno.createComponentVNode)(2, _toolbar.Toolbar, {
    "items": items
  })], 4);
};

exports.viewFunction = viewFunction;
var SchedulerToolbarBaseProps = Object.defineProperties({
  intervalCount: 1,
  firstDayOfWeek: 0,
  agendaDuration: 7
}, {
  useShortDateFormat: {
    get: function get() {
      return !_devices.default.real().generic || _devices.default.isSimulator();
    },
    configurable: true,
    enumerable: true
  }
});
exports.SchedulerToolbarBaseProps = SchedulerToolbarBaseProps;
var SchedulerToolbarProps = Object.defineProperties({}, {
  intervalCount: {
    get: function get() {
      return SchedulerToolbarBaseProps.intervalCount;
    },
    configurable: true,
    enumerable: true
  },
  firstDayOfWeek: {
    get: function get() {
      return SchedulerToolbarBaseProps.firstDayOfWeek;
    },
    configurable: true,
    enumerable: true
  },
  agendaDuration: {
    get: function get() {
      return SchedulerToolbarBaseProps.agendaDuration;
    },
    configurable: true,
    enumerable: true
  },
  useShortDateFormat: {
    get: function get() {
      return SchedulerToolbarBaseProps.useShortDateFormat;
    },
    configurable: true,
    enumerable: true
  },
  useDropDownViewSwitcher: {
    get: function get() {
      return _props.SchedulerProps.useDropDownViewSwitcher;
    },
    configurable: true,
    enumerable: true
  },
  defaultCurrentView: {
    get: function get() {
      return _props.SchedulerProps.currentView;
    },
    configurable: true,
    enumerable: true
  },
  currentViewChange: {
    get: function get() {
      return function () {};
    },
    configurable: true,
    enumerable: true
  }
});
exports.SchedulerToolbarProps = SchedulerToolbarProps;

var SchedulerToolbar = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(SchedulerToolbar, _BaseInfernoComponent);

  function SchedulerToolbar(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.__getterCache = {};
    _this.state = {
      calendarVisible: false,
      currentView: _this.props.currentView !== undefined ? _this.props.currentView : _this.props.defaultCurrentView
    };
    _this.setCurrentView = _this.setCurrentView.bind(_assertThisInitialized(_this));
    _this.setCurrentDate = _this.setCurrentDate.bind(_assertThisInitialized(_this));
    _this.getNextDate = _this.getNextDate.bind(_assertThisInitialized(_this));
    _this.updateDateByDirection = _this.updateDateByDirection.bind(_assertThisInitialized(_this));
    _this.isPreviousButtonDisabled = _this.isPreviousButtonDisabled.bind(_assertThisInitialized(_this));
    _this.isNextButtonDisabled = _this.isNextButtonDisabled.bind(_assertThisInitialized(_this));
    _this.changeCalendarDate = _this.changeCalendarDate.bind(_assertThisInitialized(_this));
    _this.changeCalendarVisible = _this.changeCalendarVisible.bind(_assertThisInitialized(_this));
    _this.showCalendar = _this.showCalendar.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = SchedulerToolbar.prototype;

  _proto.setCurrentView = function setCurrentView(view) {
    if (view.name !== (this.props.currentView !== undefined ? this.props.currentView : this.state.currentView)) {
      this.props.onCurrentViewUpdate(view.name);
    }
  };

  _proto.setCurrentDate = function setCurrentDate(date) {
    if (date.getTime() !== this.props.currentDate.getTime()) {
      this.props.onCurrentDateUpdate(new Date(date));
    }
  };

  _proto.getNextDate = function getNextDate(direction, initialDate) {
    var date = initialDate !== null && initialDate !== void 0 ? initialDate : this.props.currentDate;

    var options = _extends({}, this.intervalOptions, {
      date: date
    });

    return (0, _utils.getNextIntervalDate)(options, direction);
  };

  _proto.updateDateByDirection = function updateDateByDirection(direction) {
    var date = this.getNextDate(direction);
    this.setCurrentDate(date);
  };

  _proto.isPreviousButtonDisabled = function isPreviousButtonDisabled() {
    if (this.props.min === undefined) {
      return false;
    }

    var min = trimTime(new Date(this.props.min));
    var startDate = this.caption.startDate;
    var previousDate = this.getNextDate(-1, startDate);
    return previousDate < min;
  };

  _proto.isNextButtonDisabled = function isNextButtonDisabled() {
    if (this.props.max === undefined) {
      return false;
    }

    var max = new Date(new Date(this.props.max).setHours(23, 59, 59));
    var endDate = this.caption.endDate;
    var nextDate = this.getNextDate(1, endDate);
    return nextDate > max;
  };

  _proto.changeCalendarDate = function changeCalendarDate(date) {
    this.setState(function (__state_argument) {
      return {
        calendarVisible: false
      };
    });
    this.setCurrentDate(date);
  };

  _proto.changeCalendarVisible = function changeCalendarVisible(visible) {
    this.setState(function (__state_argument) {
      return {
        calendarVisible: visible
      };
    });
  };

  _proto.showCalendar = function showCalendar() {
    this.changeCalendarVisible(true);
  };

  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props["views"] !== nextProps["views"]) {
      this.__getterCache["views"] = undefined;
    }

    if (this.state["currentView"] !== nextState["currentView"] || this.props["currentView"] !== nextProps["currentView"] || this.props["intervalCount"] !== nextProps["intervalCount"] || this.props["firstDayOfWeek"] !== nextProps["firstDayOfWeek"] || this.props["agendaDuration"] !== nextProps["agendaDuration"]) {
      this.__getterCache["intervalOptions"] = undefined;
    }

    if (this.props["useDropDownViewSwitcher"] !== nextProps["useDropDownViewSwitcher"] || this.state["currentView"] !== nextState["currentView"] || this.props["currentView"] !== nextProps["currentView"] || this.props["views"] !== nextProps["views"] || this.props["onCurrentViewUpdate"] !== nextProps["onCurrentViewUpdate"] || this.props["intervalCount"] !== nextProps["intervalCount"] || this.props["firstDayOfWeek"] !== nextProps["firstDayOfWeek"] || this.props["agendaDuration"] !== nextProps["agendaDuration"] || this.props["startViewDate"] !== nextProps["startViewDate"] || this.props["useShortDateFormat"] !== nextProps["useShortDateFormat"] || this.props["customizationFunction"] !== nextProps["customizationFunction"] || this.props["currentDate"] !== nextProps["currentDate"] || this.props["onCurrentDateUpdate"] !== nextProps["onCurrentDateUpdate"] || this.props["min"] !== nextProps["min"] || this.props["max"] !== nextProps["max"] || this.props["items"] !== nextProps["items"]) {
      this.__getterCache["items"] = undefined;
    }
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
      }),
      calendarVisible: this.state.calendarVisible,
      step: this.step,
      displayedDate: this.displayedDate,
      caption: this.caption,
      captionText: this.captionText,
      views: this.views,
      selectedView: this.selectedView,
      setCurrentView: this.setCurrentView,
      setCurrentDate: this.setCurrentDate,
      intervalOptions: this.intervalOptions,
      getNextDate: this.getNextDate,
      updateDateByDirection: this.updateDateByDirection,
      isPreviousButtonDisabled: this.isPreviousButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      changeCalendarDate: this.changeCalendarDate,
      changeCalendarVisible: this.changeCalendarVisible,
      showCalendar: this.showCalendar,
      items: this.items,
      restAttributes: this.restAttributes
    });
  };

  _createClass(SchedulerToolbar, [{
    key: "step",
    get: function get() {
      return (0, _utils.getStep)(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView);
    }
  }, {
    key: "displayedDate",
    get: function get() {
      var startViewDate = new Date(this.props.startViewDate);

      if ((0, _utils2.isMonthView)(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView)) {
        return (0, _utils.nextWeek)(startViewDate);
      }

      return startViewDate;
    }
  }, {
    key: "caption",
    get: function get() {
      var options = {
        step: this.step,
        intervalCount: this.props.intervalCount,
        firstDayOfWeek: this.props.firstDayOfWeek,
        agendaDuration: this.props.agendaDuration,
        date: trimTime(this.displayedDate)
      };
      return (0, _utils.getCaption)(options, this.props.useShortDateFormat, this.props.customizationFunction);
    }
  }, {
    key: "captionText",
    get: function get() {
      return this.caption.text;
    }
  }, {
    key: "views",
    get: function get() {
      var _this2 = this;

      if (this.__getterCache["views"] !== undefined) {
        return this.__getterCache["views"];
      }

      return this.__getterCache["views"] = function () {
        return (0, _utils2.formatViews)(_this2.props.views);
      }();
    }
  }, {
    key: "selectedView",
    get: function get() {
      return (0, _utils.getViewName)(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView);
    }
  }, {
    key: "intervalOptions",
    get: function get() {
      var _this3 = this;

      if (this.__getterCache["intervalOptions"] !== undefined) {
        return this.__getterCache["intervalOptions"];
      }

      return this.__getterCache["intervalOptions"] = function () {
        return {
          step: _this3.step,
          intervalCount: _this3.props.intervalCount,
          firstDayOfWeek: _this3.props.firstDayOfWeek,
          agendaDuration: _this3.props.agendaDuration
        };
      }();
    }
  }, {
    key: "items",
    get: function get() {
      var _this4 = this;

      if (this.__getterCache["items"] !== undefined) {
        return this.__getterCache["items"];
      }

      return this.__getterCache["items"] = function () {
        var options = {
          useDropDownViewSwitcher: _this4.props.useDropDownViewSwitcher,
          selectedView: _this4.selectedView,
          views: _this4.views,
          setCurrentView: function setCurrentView(view) {
            return _this4.setCurrentView(view);
          },
          showCalendar: function showCalendar() {
            return _this4.showCalendar();
          },
          captionText: _this4.captionText,
          updateDateByDirection: function updateDateByDirection(direction) {
            return _this4.updateDateByDirection(direction);
          },
          isPreviousButtonDisabled: _this4.isPreviousButtonDisabled(),
          isNextButtonDisabled: _this4.isNextButtonDisabled()
        };
        return _this4.props.items.map(function (item) {
          return (0, _utils2.formToolbarItem)(item, options);
        });
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$currentVi = _extends({}, this.props, {
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
      }),
          agendaDuration = _this$props$currentVi.agendaDuration,
          currentDate = _this$props$currentVi.currentDate,
          currentView = _this$props$currentVi.currentView,
          currentViewChange = _this$props$currentVi.currentViewChange,
          customizationFunction = _this$props$currentVi.customizationFunction,
          defaultCurrentView = _this$props$currentVi.defaultCurrentView,
          firstDayOfWeek = _this$props$currentVi.firstDayOfWeek,
          intervalCount = _this$props$currentVi.intervalCount,
          items = _this$props$currentVi.items,
          max = _this$props$currentVi.max,
          min = _this$props$currentVi.min,
          onCurrentDateUpdate = _this$props$currentVi.onCurrentDateUpdate,
          onCurrentViewUpdate = _this$props$currentVi.onCurrentViewUpdate,
          startViewDate = _this$props$currentVi.startViewDate,
          useDropDownViewSwitcher = _this$props$currentVi.useDropDownViewSwitcher,
          useShortDateFormat = _this$props$currentVi.useShortDateFormat,
          views = _this$props$currentVi.views,
          restProps = _objectWithoutProperties(_this$props$currentVi, _excluded);

      return restProps;
    }
  }]);

  return SchedulerToolbar;
}(_inferno2.BaseInfernoComponent);

exports.SchedulerToolbar = SchedulerToolbar;

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["currentView"];
  return Object.keys(defaultProps).reduce(function (props, propName) {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(function (p) {
      return p === propName;
    }) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

SchedulerToolbar.defaultProps = SchedulerToolbarProps;
var __defaultOptionRules = [];

function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  SchedulerToolbar.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(SchedulerToolbar.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils3.convertRulesToOptions)(__defaultOptionRules)))));
}
