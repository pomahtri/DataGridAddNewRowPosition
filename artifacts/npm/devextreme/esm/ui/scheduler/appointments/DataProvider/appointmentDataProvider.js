/**
* DevExtreme (esm/ui/scheduler/appointments/DataProvider/appointmentDataProvider.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { AppointmentDataSource } from './appointmentDataSource';
import { AppointmentFilterBaseStrategy, AppointmentFilterVirtualStrategy } from './appointmentFilter';
import { ExpressionUtils } from '../../expressionUtils';
import { createAppointmentAdapter } from '../../appointmentAdapter';
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};
export class AppointmentDataProvider {
  constructor(options) {
    this.options = options;
    this.key = this.options.key;
    this.scheduler = this.options.scheduler;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.getDataAccessors(this.key);
    this.filteredItems = [];
    this.appointmentDataSource = new AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }

  get filterMaker() {
    return this.getFilterStrategy().filterMaker;
  }

  get keyName() {
    return this.appointmentDataSource.keyName;
  }

  get filterStrategyName() {
    return this.options.getIsVirtualScrolling() ? FilterStrategies.virtual : FilterStrategies.standard;
  }

  getDataAccessors() {
    return this.dataAccessors;
  }

  getFilterStrategy() {
    if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
      this.initFilterStrategy();
    }

    return this.filterStrategy;
  }

  initFilterStrategy() {
    var filterOptions = {
      key: this.key,
      resources: this.options.resources,
      getLoadedResources: this.options.getLoadedResources,
      scheduler: this.scheduler,
      dataSource: this.dataSource,
      dataAccessors: this.dataAccessors,
      startDayHour: this.options.startDayHour,
      endDayHour: this.options.endDayHour,
      appointmentDuration: this.options.appointmentDuration,
      showAllDayPanel: this.options.showAllDayPanel,
      timeZoneCalculator: this.options.timeZoneCalculator
    };
    this.filterStrategy = this.filterStrategyName === FilterStrategies.virtual ? new AppointmentFilterVirtualStrategy(filterOptions) : new AppointmentFilterBaseStrategy(filterOptions);
  }

  setDataSource(dataSource) {
    this.dataSource = dataSource;
    this.initFilterStrategy();
    this.appointmentDataSource.setDataSource(this.dataSource);
  }

  updateDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.initFilterStrategy();
  } // Filter mapping


  filter() {
    this.filteredItems = this.getFilterStrategy().filter();
  }

  filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    this.getFilterStrategy().filterByDate(min, max, remoteFiltering, dateSerializationFormat);
  }

  appointmentTakesAllDay(rawAppointment, startDayHour, endDayHour) {
    var adapter = createAppointmentAdapter(this.key, rawAppointment);
    return this.getFilterStrategy().appointmentTakesAllDay(adapter, startDayHour, endDayHour);
  }

  hasAllDayAppointments(rawAppointments) {
    var adapters = rawAppointments.map(item => createAppointmentAdapter(this.key, item));
    return this.getFilterStrategy().hasAllDayAppointments(adapters);
  }

  filterLoadedAppointments(filterOption, timeZoneCalculator) {
    return this.getFilterStrategy().filterLoadedAppointments(filterOption, timeZoneCalculator);
  } // From subscribe


  replaceWrongEndDate(rawAppointment, startDate, endDate) {
    var adapter = createAppointmentAdapter(this.key, rawAppointment);
    this.getFilterStrategy().replaceWrongEndDate(adapter, startDate, endDate);
  }

  calculateAppointmentEndDate(isAllDay, startDate) {
    return this.getFilterStrategy().calculateAppointmentEndDate(isAllDay, startDate);
  }

  appointmentTakesSeveralDays(rawAppointment) {
    var adapter = createAppointmentAdapter(this.key, rawAppointment);
    return this.getFilterStrategy().appointmentTakesSeveralDays(adapter);
  }

  sortAppointmentsByStartDate(appointments) {
    appointments.sort((a, b) => {
      var firstDate = new Date(ExpressionUtils.getField(this.key, 'startDate', a.settings || a));
      var secondDate = new Date(ExpressionUtils.getField(this.key, 'startDate', b.settings || b));
      return Math.sign(firstDate.getTime() - secondDate.getTime());
    });
  } // Appointment data source mappings


  cleanState() {
    this.appointmentDataSource.cleanState();
  }

  getUpdatedAppointment() {
    return this.appointmentDataSource._updatedAppointment;
  }

  getUpdatedAppointmentKeys() {
    return this.appointmentDataSource._updatedAppointmentKeys;
  }

  add(rawAppointment) {
    return this.appointmentDataSource.add(rawAppointment);
  }

  update(target, rawAppointment) {
    return this.appointmentDataSource.update(target, rawAppointment);
  }

  remove(rawAppointment) {
    return this.appointmentDataSource.remove(rawAppointment);
  }

}
