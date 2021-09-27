/**
* DevExtreme (esm/ui/scheduler/appointments/rendering_strategies/appointmentsPositioning_strategy_adaptive.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import BasePositioningStrategy from './appointmentsPositioning_strategy_base';
var COLLECTOR_ADAPTIVE_SIZE = 28;
var COLLECTOR_ADAPTIVE_BOTTOM_OFFSET = 40;
var ADAPTIVE_APPOINTMENT_DEFAULT_OFFSET = 35;
var ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH = 30;

class AdaptivePositioningStrategy extends BasePositioningStrategy {
  getDropDownAppointmentWidth(intervalCount, isAllDay) {
    return this.getDropDownButtonAdaptiveSize();
  }

  getDropDownButtonAdaptiveSize() {
    return COLLECTOR_ADAPTIVE_SIZE;
  }

  getCollectorTopOffset(allDay) {
    var renderingStrategy = this.getRenderingStrategy();

    if (renderingStrategy.allDaySupported() && allDay) {
      return (renderingStrategy.allDayHeight - renderingStrategy.getDropDownButtonAdaptiveSize()) / 2;
    } else {
      return this.getRenderingStrategy().cellHeight - COLLECTOR_ADAPTIVE_BOTTOM_OFFSET;
    }
  }

  getCollectorLeftOffset() {
    var collectorWidth = this.getRenderingStrategy().getDropDownAppointmentWidth();
    return (this.getRenderingStrategy().cellWidth - collectorWidth) / 2;
  }

  getAppointmentDefaultOffset() {
    return ADAPTIVE_APPOINTMENT_DEFAULT_OFFSET;
  }

  getDynamicAppointmentCountPerCell() {
    var renderingStrategy = this.getRenderingStrategy();

    if (renderingStrategy.allDaySupported()) {
      return {
        allDay: 0,
        simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
      };
    } else {
      return 0;
    }
  }

  getDropDownAppointmentHeight() {
    return COLLECTOR_ADAPTIVE_SIZE;
  }

  _getAppointmentMinCount() {
    return 0;
  }

  _getAppointmentDefaultWidth() {
    var renderingStrategy = this.getRenderingStrategy();

    if (renderingStrategy.allDaySupported()) {
      return ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH;
    }

    return super._getAppointmentDefaultWidth();
  }

  _calculateDynamicAppointmentCountPerCell() {
    return Math.floor(this.getRenderingStrategy()._getAppointmentMaxWidth() / this.getRenderingStrategy()._getAppointmentDefaultWidth());
  }

}

export default AdaptivePositioningStrategy;
