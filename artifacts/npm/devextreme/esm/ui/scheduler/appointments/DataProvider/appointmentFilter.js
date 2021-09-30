/**
* DevExtreme (esm/ui/scheduler/appointments/DataProvider/appointmentFilter.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../../../../core/config';
import dateUtils from '../../../../core/utils/date';
import { equalByValue } from '../../../../core/utils/common';
import dateSerialization from '../../../../core/utils/date_serialization';
import { getRecurrenceProcessor } from '../../recurrence';
import { inArray, wrapToArray } from '../../../../core/utils/array';
import { extend } from '../../../../core/utils/extend';
import { map, each } from '../../../../core/utils/iterator';
import { isFunction, isDefined, isString } from '../../../../core/utils/type';
import query from '../../../../data/query';
import { createAppointmentAdapter } from '../../appointmentAdapter';
import { isDateAndTimeView as calculateIsDateAndTimeView } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { getResourcesDataByGroups } from '../../resources/utils';
import { compareDateWithStartDayHour, compareDateWithEndDayHour, getTrimDates, _isEndDateWrong, getAppointmentTakesSeveralDays, _appointmentPartInInterval, getRecurrenceException, getAppointmentTakesAllDay } from './utils';
var toMs = dateUtils.dateToMilliseconds;
var DATE_FILTER_POSITION = 0;
var USER_FILTER_POSITION = 1;
var RECURRENCE_FREQ = 'freq';
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};

class FilterMaker {
  constructor(dataAccessors) {
    this._filterRegistry = null;
    this.dataAccessors = dataAccessors;
  }

  isRegistered() {
    return !!this._filterRegistry;
  }

  clearRegistry() {
    delete this._filterRegistry;
  }

  make(type, args) {
    if (!this._filterRegistry) {
      this._filterRegistry = {};
    }

    this._make(type).apply(this, args);
  }

  _make(type) {
    switch (type) {
      case 'date':
        return (min, max, useAccessors) => {
          var startDate = useAccessors ? this.dataAccessors.getter.startDate : this.dataAccessors.expr.startDateExpr;
          var endDate = useAccessors ? this.dataAccessors.getter.endDate : this.dataAccessors.expr.endDateExpr;
          var recurrenceRule = this.dataAccessors.expr.recurrenceRuleExpr;
          this._filterRegistry.date = [[[endDate, '>=', min], [startDate, '<', max]], 'or', [recurrenceRule, 'startswith', 'freq'], 'or', [[endDate, min], [startDate, min]]];

          if (!recurrenceRule) {
            this._filterRegistry.date.splice(1, 2);
          }
        };

      case 'user':
        return userFilter => {
          this._filterRegistry.user = userFilter;
        };
    }
  }

  combine() {
    var filter = [];
    this._filterRegistry.date && filter.push(this._filterRegistry.date);
    this._filterRegistry.user && filter.push(this._filterRegistry.user);
    return filter;
  }

  dateFilter() {
    var _this$_filterRegistry;

    return (_this$_filterRegistry = this._filterRegistry) === null || _this$_filterRegistry === void 0 ? void 0 : _this$_filterRegistry.date;
  }

}

export class AppointmentFilterBaseStrategy {
  constructor(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.preparedItems = [];

    this._init();
  }

  get strategyName() {
    return FilterStrategies.standard;
  }

  get key() {
    return this.options.key;
  } // TODO - Use DI to get appropriate services


  get scheduler() {
    return this.options.scheduler;
  } // TODO get rid


  get workspace() {
    return this.scheduler.getWorkSpace();
  } // TODO get rid


  get viewDataProvider() {
    return this.workspace.viewDataProvider;
  }

  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }

  get viewStartDayHour() {
    return this.options.startDayHour;
  }

  get viewEndDayHour() {
    return this.options.endDayHour;
  }

  get appointmentDuration() {
    return this.options.appointmentDuration;
  }

  get timezone() {
    return this.options.timezone;
  }

  get firstDayOfWeek() {
    return this.options.firstDayOfWeek;
  }

  get showAllDayPanel() {
    return this.options.showAllDayPanel;
  }

  _init() {
    this.setDataAccessors(this.dataAccessors);
    this.setDataSource(this.dataSource);
  }

  filter() {
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
  }

  filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this.dataSource) {
      return;
    }

    var [trimMin, trimMax] = getTrimDates(min, max);

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
  }

  hasAllDayAppointments(appointments) {
    var result = false;

    if (appointments) {
      each(appointments, (_, item) => {
        if (getAppointmentTakesAllDay(item, this.viewStartDayHour, this.viewEndDayHour)) {
          result = true;
          return false;
        }
      });
    }

    return result;
  } //


  setDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.filterMaker = new FilterMaker(this.dataAccessors);
  }

  setDataSource(dataSource) {
    var _this$filterMaker;

    this.dataSource = dataSource;

    this._updatePreparedDataItems();

    (_this$filterMaker = this.filterMaker) === null || _this$filterMaker === void 0 ? void 0 : _this$filterMaker.clearRegistry();
  }

  _updatePreparedDataItems() {
    var updateItems = items => this.preparedItems = this.getPreparedDataItems(items);

    if (this.dataSource) {
      var store = this.dataSource.store();
      store.on('loaded', items => {
        updateItems(items);
      });

      if (this.dataSource.isLoaded()) {
        updateItems(this.dataSource.items());
      }
    }
  }

  calculateAppointmentEndDate(isAllDay, startDate) {
    if (isAllDay) {
      return dateUtils.setToDayEnd(new Date(startDate));
    }

    return new Date(startDate.getTime() + this.appointmentDuration * toMs('minute'));
  }

  replaceWrongEndDate(appointment, startDate, endDate) {
    if (_isEndDateWrong(startDate, endDate)) {
      var calculatedEndDate = this.calculateAppointmentEndDate(appointment.allDay, startDate);
      this.dataAccessors.setter.endDate(appointment, calculatedEndDate);
    }
  }

  _createAllDayAppointmentFilter(filterOptions) {
    var {
      viewStartDayHour,
      viewEndDayHour
    } = filterOptions;
    return [[appointment => getAppointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour)]];
  }

  _createCombinedFilter(filterOptions) {
    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var {
      startDayHour,
      endDayHour,
      viewStartDayHour,
      viewEndDayHour,
      resources,
      firstDayOfWeek,
      checkIntersectViewport
    } = filterOptions;
    var [trimMin, trimMax] = getTrimDates(min, max);
    var useRecurrence = isDefined(this.dataAccessors.getter.recurrenceRule);
    return [[appointment => {
      var _appointment$visible;

      var appointmentVisible = (_appointment$visible = appointment.visible) !== null && _appointment$visible !== void 0 ? _appointment$visible : true;

      if (!appointmentVisible) {
        return false;
      }

      var {
        startDate,
        endDate,
        hasRecurrenceRule
      } = appointment;

      if (!hasRecurrenceRule) {
        if (!(endDate >= trimMin && startDate < trimMax || dateUtils.sameDate(endDate, trimMin) && dateUtils.sameDate(startDate, trimMin))) {
          return false;
        }
      }

      var recurrenceRule;

      if (useRecurrence) {
        recurrenceRule = appointment.recurrenceRule;
      }

      var appointmentTakesAllDay = getAppointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);
      var appointmentTakesSeveralDays = getAppointmentTakesSeveralDays(appointment);
      var isAllDay = appointment.allDay;
      var isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;

      if (resources !== null && resources !== void 0 && resources.length && !this._filterAppointmentByResources(appointment.rawAppointment, resources)) {
        return false;
      }

      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        return false;
      }

      if (hasRecurrenceRule) {
        var recurrenceException = getRecurrenceException(appointment, this.timeZoneCalculator, this.timezone);

        if (!this._filterAppointmentByRRule({
          startDate,
          endDate,
          recurrenceRule,
          recurrenceException,
          allDay: appointmentTakesAllDay
        }, min, max, startDayHour, endDayHour, firstDayOfWeek)) {
          return false;
        }
      } // NOTE: Long appointment part without allDay field and recurrence rule should be filtered by min


      if (endDate < min && isLongAppointment && !isAllDay && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
        return false;
      }

      if (isDefined(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        if (!compareDateWithStartDayHour(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
          return false;
        }
      }

      if (isDefined(endDayHour)) {
        if (!compareDateWithEndDayHour({
          startDate: startDate,
          endDate: endDate,
          startDayHour,
          endDayHour,
          viewStartDayHour,
          viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min,
          max,
          checkIntersectViewport
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
  }

  _createAppointmentFilter(filterOptions) {
    if (this.filterMaker.isRegistered()) {
      this.filterMaker.make('user', undefined);
    }

    return this._createCombinedFilter(filterOptions);
  }

  _excessFiltering() {
    var dateFilter = this.filterMaker.dateFilter();
    var dataSourceFilter = this.dataSource.filter();
    return dateFilter && dataSourceFilter && (equalByValue(dataSourceFilter, dateFilter) || dataSourceFilter.length && equalByValue(dataSourceFilter[DATE_FILTER_POSITION], dateFilter));
  }

  _combineRemoteFilter(dateSerializationFormat) {
    var combinedFilter = this.filterMaker.combine();
    return this._serializeRemoteFilter(combinedFilter, dateSerializationFormat);
  }

  _serializeRemoteFilter(filter, dateSerializationFormat) {
    if (!Array.isArray(filter)) {
      return filter;
    }

    filter = extend([], filter);
    var startDate = this.dataAccessors.expr.startDateExpr;
    var endDate = this.dataAccessors.expr.endDateExpr;

    if (isString(filter[0])) {
      if (config().forceIsoDateParsing && filter.length > 1) {
        if (filter[0] === startDate || filter[0] === endDate) {
          // TODO: wrap filter value to new Date only necessary for case T838165(details in note)
          filter[filter.length - 1] = dateSerialization.serializeDate(new Date(filter[filter.length - 1]), dateSerializationFormat);
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      filter[i] = this._serializeRemoteFilter(filter[i], dateSerializationFormat);
    }

    return filter;
  }

  _createFilter(min, max, remoteFiltering, dateSerializationFormat) {
    if (remoteFiltering) {
      this.filterMaker.make('date', [min, max]);
      var userFilterPosition = this._excessFiltering() ? this.dataSource.filter()[USER_FILTER_POSITION] : this.dataSource.filter();
      this.filterMaker.make('user', [userFilterPosition]);
      this.dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
    }
  }

  _filterAppointmentByResources(appointment, resources) {
    var checkAppointmentResourceValues = (resourceName, resourceIndex) => {
      var resourceGetter = this.dataAccessors.resources.getter[resourceName];
      var resource;

      if (isFunction(resourceGetter)) {
        resource = resourceGetter(appointment);
      }

      var appointmentResourceValues = wrapToArray(resource);
      var resourceData = map(resources[resourceIndex].items, item => {
        return item.id;
      });

      for (var j = 0; j < appointmentResourceValues.length; j++) {
        if (inArray(appointmentResourceValues[j], resourceData) > -1) {
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
  }

  _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var recurrenceRule = appointment.recurrenceRule;
    var recurrenceException = appointment.recurrenceException;
    var allDay = appointment.allDay;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = getRecurrenceProcessor();

    if (allDay || _appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      var [trimMin, trimMax] = getTrimDates(min, max);
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
  }

  getPreparedDataItems(dataItems) {
    var result = [];
    dataItems === null || dataItems === void 0 ? void 0 : dataItems.forEach(rawAppointment => {
      var startDate = new Date(this.dataAccessors.getter.startDate(rawAppointment));
      var endDate = new Date(this.dataAccessors.getter.endDate(rawAppointment));
      this.replaceWrongEndDate(rawAppointment, startDate, endDate);
      var adapter = createAppointmentAdapter(this.key, rawAppointment);
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
        hasRecurrenceRule,
        allDay: adapter.allDay,
        visible: rawAppointment.visible,
        rawAppointment
      };

      if (item.startDate && item.endDate) {
        result.push(item);
      }
    });
    return result;
  }

  filterLoadedAppointments(filterOptions) {
    var filteredItems = this.filterPreparedItems(filterOptions);
    return filteredItems.map(_ref => {
      var {
        rawAppointment
      } = _ref;
      return rawAppointment;
    });
  }

  filterPreparedItems(filterOptions) {
    var combinedFilter = this._createAppointmentFilter(filterOptions);

    return query(this.preparedItems).filter(combinedFilter).toArray();
  }

  filterAllDayAppointments(filterOptions) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOptions);

    return query(this.preparedItems).filter(combinedFilter).toArray().map(_ref2 => {
      var {
        rawAppointment
      } = _ref2;
      return rawAppointment;
    });
  }

}
export class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
  get strategyName() {
    return FilterStrategies.virtual;
  }

  filter() {
    var hourMs = toMs('hour');
    var isCalculateStartAndEndDayHour = calculateIsDateAndTimeView(this.workspace.type);
    var checkIntersectViewport = isCalculateStartAndEndDayHour && this.workspace.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.workspace.supportAllDayRow();
    var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
    var endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(item => {
      var groupIndex = item.groupIndex;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : this.viewEndDayHour;

      var resources = this._getPrerenderFilterResources(groupIndex);

      var allDayPanel = this.viewDataProvider.getAllDayPanel(groupIndex); // TODO split by workspace strategies

      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments({
      filterOptions,
      groupCount: this.workspace._getGroupCount()
    });
  }

  filterPreparedItems(_ref3) {
    var {
      filterOptions,
      groupCount
    } = _ref3;
    var combinedFilters = [];
    var itemsToFilter = this.preparedItems;
    var needPreFilter = groupCount > 0;

    if (needPreFilter) {
      itemsToFilter = itemsToFilter.filter(_ref4 => {
        var {
          rawAppointment
        } = _ref4;

        for (var i = 0; i < filterOptions.length; ++i) {
          var {
            resources
          } = filterOptions[i];

          if (this._filterAppointmentByResources(rawAppointment, resources)) {
            return true;
          }
        }
      });
    }

    filterOptions.forEach(option => {
      combinedFilters.length && combinedFilters.push('or');

      var filter = this._createAppointmentFilter(option);

      combinedFilters.push(filter);
    });
    return query(itemsToFilter).filter(combinedFilters).toArray();
  }

  hasAllDayAppointments() {
    return this.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }).length > 0;
  }

  _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return getResourcesDataByGroups(this.options.getLoadedResources(), this.options.resources, [cellGroup]);
  }

}
