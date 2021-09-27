/**
* DevExtreme (cjs/ui/scheduler/appointments/DataProvider/appointmentFilter.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.AppointmentFilterVirtualStrategy = exports.AppointmentFilterBaseStrategy = void 0;

var _config = _interopRequireDefault(require("../../../../core/config"));

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _common = require("../../../../core/utils/common");

var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));

var _recurrence = require("../../recurrence");

var _array = require("../../../../core/utils/array");

var _extend = require("../../../../core/utils/extend");

var _iterator = require("../../../../core/utils/iterator");

var _type = require("../../../../core/utils/type");

var _query = _interopRequireDefault(require("../../../../data/query"));

var _utils = _interopRequireDefault(require("../../utils.timeZone"));

var _appointmentAdapter = require("../../appointmentAdapter");

var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");

var _utils2 = require("../../resources/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var DATE_FILTER_POSITION = 0;
var USER_FILTER_POSITION = 1;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
var RECURRENCE_FREQ = 'freq';
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};

var getTrimDates = function getTrimDates(min, max) {
  var newMin = _date.default.trimTime(min);

  var newMax = _date.default.trimTime(max);

  newMax.setDate(newMax.getDate() + 1);
  return [newMin, newMax];
};

var AppointmentFilterHelper = /*#__PURE__*/function () {
  function AppointmentFilterHelper() {}

  var _proto = AppointmentFilterHelper.prototype;

  _proto.compareDateWithStartDayHour = function compareDateWithStartDayHour(startDate, endDate, startDayHour, allDay, severalDays) {
    var startTime = _date.default.dateTimeFromDecimal(startDayHour);

    var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
    return result;
  };

  _proto.compareDateWithEndDayHour = function compareDateWithEndDayHour(options) {
    var startDate = options.startDate,
        endDate = options.endDate,
        startDayHour = options.startDayHour,
        endDayHour = options.endDayHour,
        viewStartDayHour = options.viewStartDayHour,
        viewEndDayHour = options.viewEndDayHour,
        allDay = options.allDay,
        severalDays = options.severalDays,
        min = options.min,
        max = options.max,
        checkIntersectViewport = options.checkIntersectViewport;
    var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
    var apptDuration = endDate.getTime() - startDate.getTime();
    var delta = (hiddenInterval - apptDuration) / toMs('hour');
    var apptStartHour = startDate.getHours();
    var apptStartMinutes = startDate.getMinutes();
    var result;

    var endTime = _date.default.dateTimeFromDecimal(endDayHour);

    var startTime = _date.default.dateTimeFromDecimal(startDayHour);

    var apptIntersectViewport = startDate < max && endDate > min;
    result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);

    if (apptDuration < hiddenInterval) {
      if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
        result = false;
      }
    }

    return result;
  };

  return AppointmentFilterHelper;
}();

var FilterMaker = /*#__PURE__*/function () {
  function FilterMaker(dataAccessors) {
    this._filterRegistry = null;
    this.dataAccessors = dataAccessors;
  }

  var _proto2 = FilterMaker.prototype;

  _proto2.isRegistered = function isRegistered() {
    return !!this._filterRegistry;
  };

  _proto2.clearRegistry = function clearRegistry() {
    delete this._filterRegistry;
  };

  _proto2.make = function make(type, args) {
    if (!this._filterRegistry) {
      this._filterRegistry = {};
    }

    this._make(type).apply(this, args);
  };

  _proto2._make = function _make(type) {
    var _this = this;

    switch (type) {
      case 'date':
        return function (min, max, useAccessors) {
          var startDate = useAccessors ? _this.dataAccessors.getter.startDate : _this.dataAccessors.expr.startDateExpr;
          var endDate = useAccessors ? _this.dataAccessors.getter.endDate : _this.dataAccessors.expr.endDateExpr;
          var recurrenceRule = _this.dataAccessors.expr.recurrenceRuleExpr;
          _this._filterRegistry.date = [[[endDate, '>=', min], [startDate, '<', max]], 'or', [recurrenceRule, 'startswith', 'freq'], 'or', [[endDate, min], [startDate, min]]];

          if (!recurrenceRule) {
            _this._filterRegistry.date.splice(1, 2);
          }
        };

      case 'user':
        return function (userFilter) {
          _this._filterRegistry.user = userFilter;
        };
    }
  };

  _proto2.combine = function combine() {
    var filter = [];
    this._filterRegistry.date && filter.push(this._filterRegistry.date);
    this._filterRegistry.user && filter.push(this._filterRegistry.user);
    return filter;
  };

  _proto2.dateFilter = function dateFilter() {
    var _this$_filterRegistry;

    return (_this$_filterRegistry = this._filterRegistry) === null || _this$_filterRegistry === void 0 ? void 0 : _this$_filterRegistry.date;
  };

  return FilterMaker;
}();

var AppointmentFilterBaseStrategy = /*#__PURE__*/function () {
  function AppointmentFilterBaseStrategy(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.preparedItems = [];
    this.filterHelper = new AppointmentFilterHelper();

    this._init();
  }

  var _proto3 = AppointmentFilterBaseStrategy.prototype;

  _proto3._init = function _init() {
    this.setDataAccessors(this.dataAccessors);
    this.setDataSource(this.dataSource);
  };

  _proto3.filter = function filter() {
    var dateRange = this.workspace.getDateRange();
    var allDay;

    if (!this.showAllDayPanel && this.workspace.supportAllDayRow()) {
      allDay = false;
    }

    return this.filterLoadedAppointments({
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour,
      min: dateRange[0],
      max: dateRange[1],
      resources: this.options.getLoadedResources(),
      allDay: allDay,
      firstDayOfWeek: this.firstDayOfWeek
    });
  };

  _proto3.getRecurrenceException = function getRecurrenceException(appointmentAdapter) {
    var recurrenceException = appointmentAdapter.recurrenceException;

    if (recurrenceException) {
      var exceptions = recurrenceException.split(',');

      for (var i = 0; i < exceptions.length; i++) {
        exceptions[i] = this._convertRecurrenceException(exceptions[i], appointmentAdapter.startDate);
      }

      return exceptions.join();
    }

    return recurrenceException;
  };

  _proto3._convertRecurrenceException = function _convertRecurrenceException(exceptionString, startDate) {
    var _this2 = this;

    exceptionString = exceptionString.replace(/\s/g, '');

    var getConvertedToTimeZone = function getConvertedToTimeZone(date) {
      return _this2.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
    };

    var exceptionDate = _date_serialization.default.deserializeDate(exceptionString);

    var convertedStartDate = getConvertedToTimeZone(startDate);
    var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
    convertedExceptionDate = _utils.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, this.timeZone);
    exceptionString = _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
    return exceptionString;
  };

  _proto3.filterByDate = function filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this.dataSource) {
      return;
    }

    var _getTrimDates = getTrimDates(min, max),
        _getTrimDates2 = _slicedToArray(_getTrimDates, 2),
        trimMin = _getTrimDates2[0],
        trimMax = _getTrimDates2[1];

    if (!this.filterMaker.isRegistered()) {
      this._createFilter(trimMin, trimMax, remoteFiltering, dateSerializationFormat);
    } else {
      var _this$dataSource$filt;

      if (((_this$dataSource$filt = this.dataSource.filter()) === null || _this$dataSource$filt === void 0 ? void 0 : _this$dataSource$filt.length) > 1) {
        // TODO: serialize user filter value only necessary for case T838165(details in note)
        var userFilter = this._serializeRemoteFilter([this.dataSource.filter()[1]], dateSerializationFormat);

        this.filterMaker.make('user', userFilter);
      }

      if (remoteFiltering) {
        this.filterMaker.make('date', [trimMin, trimMax]);
        this.dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
      }
    }
  };

  _proto3.hasAllDayAppointments = function hasAllDayAppointments(appointments) {
    var _this3 = this;

    var result = false;

    if (appointments) {
      (0, _iterator.each)(appointments, function (_, item) {
        if (_this3.appointmentTakesAllDay(item, _this3.viewStartDayHour, _this3.viewEndDayHour)) {
          result = true;
          return false;
        }
      });
    }

    return result;
  } //
  ;

  _proto3.setDataAccessors = function setDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.filterMaker = new FilterMaker(this.dataAccessors);
  };

  _proto3.setDataSource = function setDataSource(dataSource) {
    var _this$filterMaker;

    this.dataSource = dataSource;

    this._updatePreparedDataItems();

    (_this$filterMaker = this.filterMaker) === null || _this$filterMaker === void 0 ? void 0 : _this$filterMaker.clearRegistry();
  };

  _proto3._updatePreparedDataItems = function _updatePreparedDataItems() {
    var _this4 = this;

    var updateItems = function updateItems(items) {
      return _this4.preparedItems = _this4.getPreparedDataItems(items);
    };

    if (this.dataSource) {
      var store = this.dataSource.store();
      store.on('loaded', function (items) {
        updateItems(items);
      });

      if (this.dataSource.isLoaded()) {
        updateItems(this.dataSource.items());
      }
    }
  };

  _proto3._getAppointmentDurationInHours = function _getAppointmentDurationInHours(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / toMs('hour');
  };

  _proto3.appointmentTakesSeveralDays = function appointmentTakesSeveralDays(adapter) {
    return !_date.default.sameDate(adapter.startDate, adapter.endDate);
  };

  _proto3._appointmentHasShortDayDuration = function _appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour) {
    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    var shortDayDurationInHours = endDayHour - startDayHour;
    return appointmentDurationInHours >= shortDayDurationInHours && startDate.getHours() === startDayHour && endDate.getHours() === endDayHour;
  };

  _proto3._appointmentHasAllDayDuration = function _appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var dayDuration = 24;

    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    return appointmentDurationInHours >= dayDuration || this._appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour);
  };

  _proto3._isEndDateWrong = function _isEndDateWrong(startDate, endDate) {
    return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
  };

  _proto3.calculateAppointmentEndDate = function calculateAppointmentEndDate(isAllDay, startDate) {
    if (isAllDay) {
      return _date.default.setToDayEnd(new Date(startDate));
    }

    return new Date(startDate.getTime() + this.appointmentDuration * toMs('minute'));
  };

  _proto3.replaceWrongEndDate = function replaceWrongEndDate(appointment, startDate, endDate) {
    if (this._isEndDateWrong(startDate, endDate)) {
      var calculatedEndDate = this.calculateAppointmentEndDate(appointment.allDay, startDate);
      this.dataAccessors.setter.endDate(appointment, calculatedEndDate);
    }
  };

  _proto3.appointmentTakesAllDay = function appointmentTakesAllDay(appointment, startDayHour, endDayHour) {
    return appointment.allDay || this._appointmentHasAllDayDuration(appointment.startDate, appointment.endDate, startDayHour, endDayHour);
  };

  _proto3._createAllDayAppointmentFilter = function _createAllDayAppointmentFilter(filterOptions) {
    var viewStartDayHour = filterOptions.viewStartDayHour,
        viewEndDayHour = filterOptions.viewEndDayHour;
    var that = this;
    return [[function (appointment) {
      return that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);
    }]];
  };

  _proto3._createCombinedFilter = function _createCombinedFilter(filterOptions) {
    var _this5 = this;

    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var startDayHour = filterOptions.startDayHour,
        endDayHour = filterOptions.endDayHour,
        viewStartDayHour = filterOptions.viewStartDayHour,
        viewEndDayHour = filterOptions.viewEndDayHour,
        resources = filterOptions.resources,
        firstDayOfWeek = filterOptions.firstDayOfWeek,
        checkIntersectViewport = filterOptions.checkIntersectViewport;

    var _getTrimDates3 = getTrimDates(min, max),
        _getTrimDates4 = _slicedToArray(_getTrimDates3, 2),
        trimMin = _getTrimDates4[0],
        trimMax = _getTrimDates4[1];

    var useRecurrence = (0, _type.isDefined)(this.dataAccessors.getter.recurrenceRule);
    return [[function (appointment) {
      var _appointment$visible;

      var appointmentVisible = (_appointment$visible = appointment.visible) !== null && _appointment$visible !== void 0 ? _appointment$visible : true;

      if (!appointmentVisible) {
        return false;
      }

      var startDate = appointment.startDate,
          endDate = appointment.endDate,
          hasRecurrenceRule = appointment.hasRecurrenceRule;

      if (!hasRecurrenceRule) {
        if (!(endDate >= trimMin && startDate < trimMax || _date.default.sameDate(endDate, trimMin) && _date.default.sameDate(startDate, trimMin))) {
          return false;
        }
      }

      var recurrenceRule;

      if (useRecurrence) {
        recurrenceRule = appointment.recurrenceRule;
      }

      var appointmentTakesAllDay = _this5.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);

      var appointmentTakesSeveralDays = _this5.appointmentTakesSeveralDays(appointment);

      var isAllDay = appointment.allDay;
      var isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;

      if (resources !== null && resources !== void 0 && resources.length && !_this5._filterAppointmentByResources(appointment.rawAppointment, resources)) {
        return false;
      }

      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        return false;
      }

      if (hasRecurrenceRule) {
        var recurrenceException = _this5.getRecurrenceException(appointment);

        if (!_this5._filterAppointmentByRRule({
          startDate: startDate,
          endDate: endDate,
          recurrenceRule: recurrenceRule,
          recurrenceException: recurrenceException,
          allDay: appointmentTakesAllDay
        }, min, max, startDayHour, endDayHour, firstDayOfWeek)) {
          return false;
        }
      } // NOTE: Long appointment part without allDay field and recurrence rule should be filtered by min


      if (endDate < min && isLongAppointment && !isAllDay && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
        return false;
      }

      if ((0, _type.isDefined)(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        if (!_this5.filterHelper.compareDateWithStartDayHour(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
          return false;
        }
      }

      if ((0, _type.isDefined)(endDayHour)) {
        if (!_this5.filterHelper.compareDateWithEndDayHour({
          startDate: startDate,
          endDate: endDate,
          startDayHour: startDayHour,
          endDayHour: endDayHour,
          viewStartDayHour: viewStartDayHour,
          viewEndDayHour: viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min: min,
          max: max,
          checkIntersectViewport: checkIntersectViewport
        })) {
          return false;
        }
      }

      if (useRecurrence && !hasRecurrenceRule) {
        if (endDate < min && !isAllDay) {
          return false;
        }
      }

      return true;
    }]];
  };

  _proto3._createAppointmentFilter = function _createAppointmentFilter(filterOptions) {
    if (this.filterMaker.isRegistered()) {
      this.filterMaker.make('user', undefined);
    }

    return this._createCombinedFilter(filterOptions);
  };

  _proto3._excessFiltering = function _excessFiltering() {
    var dateFilter = this.filterMaker.dateFilter();
    var dataSourceFilter = this.dataSource.filter();
    return dateFilter && dataSourceFilter && ((0, _common.equalByValue)(dataSourceFilter, dateFilter) || dataSourceFilter.length && (0, _common.equalByValue)(dataSourceFilter[DATE_FILTER_POSITION], dateFilter));
  };

  _proto3._combineRemoteFilter = function _combineRemoteFilter(dateSerializationFormat) {
    var combinedFilter = this.filterMaker.combine();
    return this._serializeRemoteFilter(combinedFilter, dateSerializationFormat);
  };

  _proto3._serializeRemoteFilter = function _serializeRemoteFilter(filter, dateSerializationFormat) {
    if (!Array.isArray(filter)) {
      return filter;
    }

    filter = (0, _extend.extend)([], filter);
    var startDate = this.dataAccessors.expr.startDateExpr;
    var endDate = this.dataAccessors.expr.endDateExpr;

    if ((0, _type.isString)(filter[0])) {
      if ((0, _config.default)().forceIsoDateParsing && filter.length > 1) {
        if (filter[0] === startDate || filter[0] === endDate) {
          // TODO: wrap filter value to new Date only necessary for case T838165(details in note)
          filter[filter.length - 1] = _date_serialization.default.serializeDate(new Date(filter[filter.length - 1]), dateSerializationFormat);
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      filter[i] = this._serializeRemoteFilter(filter[i], dateSerializationFormat);
    }

    return filter;
  };

  _proto3._createFilter = function _createFilter(min, max, remoteFiltering, dateSerializationFormat) {
    if (remoteFiltering) {
      this.filterMaker.make('date', [min, max]);
      var userFilterPosition = this._excessFiltering() ? this.dataSource.filter()[USER_FILTER_POSITION] : this.dataSource.filter();
      this.filterMaker.make('user', [userFilterPosition]);
      this.dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
    }
  };

  _proto3._filterAppointmentByResources = function _filterAppointmentByResources(appointment, resources) {
    var _this6 = this;

    var checkAppointmentResourceValues = function checkAppointmentResourceValues(resourceName, resourceIndex) {
      var resourceGetter = _this6.dataAccessors.resources.getter[resourceName];
      var resource;

      if ((0, _type.isFunction)(resourceGetter)) {
        resource = resourceGetter(appointment);
      }

      var appointmentResourceValues = (0, _array.wrapToArray)(resource);
      var resourceData = (0, _iterator.map)(resources[resourceIndex].items, function (item) {
        return item.id;
      });

      for (var j = 0; j < appointmentResourceValues.length; j++) {
        if ((0, _array.inArray)(appointmentResourceValues[j], resourceData) > -1) {
          return true;
        }
      }

      return false;
    };

    var result = false;

    for (var i = 0; i < resources.length; i++) {
      var resourceName = resources[i].name;
      result = checkAppointmentResourceValues(resourceName, i);

      if (!result) {
        return false;
      }
    }

    return result;
  };

  _proto3._appointmentPartInInterval = function _appointmentPartInInterval(startDate, endDate, startDayHour, endDayHour) {
    var apptStartDayHour = startDate.getHours();
    var apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
  };

  _proto3._filterAppointmentByRRule = function _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var recurrenceRule = appointment.recurrenceRule;
    var recurrenceException = appointment.recurrenceException;
    var allDay = appointment.allDay;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();

    if (allDay || this._appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      var _getTrimDates5 = getTrimDates(min, max),
          _getTrimDates6 = _slicedToArray(_getTrimDates5, 2),
          trimMin = _getTrimDates6[0],
          trimMax = _getTrimDates6[1];

      min = trimMin;
      max = new Date(trimMax.getTime() - toMs('minute'));
    }

    if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = appointmentEndDate > min && appointmentStartDate <= max;
    }

    if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = recurrenceProcessor.hasRecurrence({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: appointmentStartDate,
        end: appointmentEndDate,
        min: min,
        max: max,
        firstDayOfWeek: firstDayOfWeek
      });
    }

    return result;
  };

  _proto3.getPreparedDataItems = function getPreparedDataItems(dataItems) {
    var _this7 = this;

    var result = [];
    dataItems === null || dataItems === void 0 ? void 0 : dataItems.forEach(function (rawAppointment) {
      var startDate = new Date(_this7.dataAccessors.getter.startDate(rawAppointment));
      var endDate = new Date(_this7.dataAccessors.getter.endDate(rawAppointment));

      _this7.replaceWrongEndDate(rawAppointment, startDate, endDate);

      var adapter = (0, _appointmentAdapter.createAppointmentAdapter)(_this7.key, rawAppointment);
      var comparableStartDate = adapter.startDate && adapter.calculateStartDate('toGrid');
      var comparableEndDate = adapter.endDate && adapter.calculateEndDate('toGrid') || comparableStartDate;
      var regex = new RegExp(RECURRENCE_FREQ, 'gi');
      var recurrenceRule = adapter.recurrenceRule;
      var hasRecurrenceRule = !!(recurrenceRule !== null && recurrenceRule !== void 0 && recurrenceRule.match(regex).length);
      var item = {
        startDate: comparableStartDate,
        endDate: comparableEndDate,
        recurrenceRule: adapter.recurrenceRule,
        recurrenceException: adapter.recurrenceException,
        hasRecurrenceRule: hasRecurrenceRule,
        allDay: adapter.allDay,
        visible: rawAppointment.visible,
        rawAppointment: rawAppointment
      };

      if (item.startDate && item.endDate) {
        result.push(item);
      }
    });
    return result;
  };

  _proto3.filterLoadedAppointments = function filterLoadedAppointments(filterOptions) {
    var filteredItems = this.filterPreparedItems(filterOptions);
    return filteredItems.map(function (_ref) {
      var rawAppointment = _ref.rawAppointment;
      return rawAppointment;
    });
  };

  _proto3.filterPreparedItems = function filterPreparedItems(filterOptions) {
    var combinedFilter = this._createAppointmentFilter(filterOptions);

    return (0, _query.default)(this.preparedItems).filter(combinedFilter).toArray();
  };

  _proto3.filterAllDayAppointments = function filterAllDayAppointments(filterOptions) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOptions);

    return (0, _query.default)(this.preparedItems).filter(combinedFilter).toArray().map(function (_ref2) {
      var rawAppointment = _ref2.rawAppointment;
      return rawAppointment;
    });
  };

  _createClass(AppointmentFilterBaseStrategy, [{
    key: "strategyName",
    get: function get() {
      return FilterStrategies.standard;
    }
  }, {
    key: "key",
    get: function get() {
      return this.options.key;
    } // TODO - Use DI to get appropriate services

  }, {
    key: "scheduler",
    get: function get() {
      return this.options.scheduler;
    } // TODO get rid

  }, {
    key: "workspace",
    get: function get() {
      return this.scheduler.getWorkSpace();
    } // TODO get rid

  }, {
    key: "viewDataProvider",
    get: function get() {
      return this.workspace.viewDataProvider;
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "viewStartDayHour",
    get: function get() {
      return this.options.startDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function get() {
      return this.options.endDayHour;
    }
  }, {
    key: "appointmentDuration",
    get: function get() {
      return this.options.appointmentDuration;
    }
  }, {
    key: "timezone",
    get: function get() {
      return this.options.timezone;
    }
  }, {
    key: "firstDayOfWeek",
    get: function get() {
      return this.options.firstDayOfWeek;
    }
  }, {
    key: "showAllDayPanel",
    get: function get() {
      return this.options.showAllDayPanel;
    }
  }]);

  return AppointmentFilterBaseStrategy;
}();

exports.AppointmentFilterBaseStrategy = AppointmentFilterBaseStrategy;

var AppointmentFilterVirtualStrategy = /*#__PURE__*/function (_AppointmentFilterBas) {
  _inheritsLoose(AppointmentFilterVirtualStrategy, _AppointmentFilterBas);

  function AppointmentFilterVirtualStrategy() {
    return _AppointmentFilterBas.apply(this, arguments) || this;
  }

  var _proto4 = AppointmentFilterVirtualStrategy.prototype;

  _proto4.filter = function filter() {
    var _this8 = this;

    var hourMs = toMs('hour');
    var isCalculateStartAndEndDayHour = (0, _base.isDateAndTimeView)(this.workspace.type);
    var checkIntersectViewport = isCalculateStartAndEndDayHour && this.workspace.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.workspace.supportAllDayRow();
    var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
    var endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(function (item) {
      var groupIndex = item.groupIndex;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : _this8.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : _this8.viewEndDayHour;

      var resources = _this8._getPrerenderFilterResources(groupIndex);

      var allDayPanel = _this8.viewDataProvider.getAllDayPanel(groupIndex); // TODO split by workspace strategies


      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        viewStartDayHour: _this8.viewStartDayHour,
        viewEndDayHour: _this8.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        allDay: supportAllDayAppointment,
        resources: resources,
        firstDayOfWeek: _this8.firstDayOfWeek,
        checkIntersectViewport: checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments({
      filterOptions: filterOptions,
      groupCount: this.workspace._getGroupCount()
    });
  };

  _proto4.filterPreparedItems = function filterPreparedItems(_ref3) {
    var _this9 = this;

    var filterOptions = _ref3.filterOptions,
        groupCount = _ref3.groupCount;
    var combinedFilters = [];
    var itemsToFilter = this.preparedItems;
    var needPreFilter = groupCount > 0;

    if (needPreFilter) {
      itemsToFilter = itemsToFilter.filter(function (_ref4) {
        var rawAppointment = _ref4.rawAppointment;

        for (var i = 0; i < filterOptions.length; ++i) {
          var resources = filterOptions[i].resources;

          if (_this9._filterAppointmentByResources(rawAppointment, resources)) {
            return true;
          }
        }
      });
    }

    filterOptions.forEach(function (option) {
      combinedFilters.length && combinedFilters.push('or');

      var filter = _this9._createAppointmentFilter(option);

      combinedFilters.push(filter);
    });
    return (0, _query.default)(itemsToFilter).filter(combinedFilters).toArray();
  };

  _proto4.hasAllDayAppointments = function hasAllDayAppointments() {
    return this.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }).length > 0;
  };

  _proto4._getPrerenderFilterResources = function _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return (0, _utils2.getResourcesDataByGroups)(this.options.getLoadedResources(), this.options.resources, [cellGroup]);
  };

  _createClass(AppointmentFilterVirtualStrategy, [{
    key: "strategyName",
    get: function get() {
      return FilterStrategies.virtual;
    }
  }]);

  return AppointmentFilterVirtualStrategy;
}(AppointmentFilterBaseStrategy);

exports.AppointmentFilterVirtualStrategy = AppointmentFilterVirtualStrategy;
