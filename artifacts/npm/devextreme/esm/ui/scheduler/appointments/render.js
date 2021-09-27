/**
* DevExtreme (esm/ui/scheduler/appointments/render.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { utils } from '../utils';
import dxrAppointmentLayout from '../../../renovation/ui/scheduler/appointment/layout.j'; // This is temporary - to creating appointments from the old code

export var renderAppointments = options => {
  var {
    instance,
    $dateTable,
    viewModel
  } = options;
  var container = getAppointmentsContainer($dateTable);
  utils.renovation.renderComponent(instance, container, dxrAppointmentLayout, 'renovatedAppointments', viewModel);
};

var getAppointmentsContainer = $dateTable => {
  var container = $('.dx-appointments-container');

  if (container.length === 0) {
    container = $('<div>').addClass('dx-appointments-container').appendTo($dateTable);
  }

  return container;
};
