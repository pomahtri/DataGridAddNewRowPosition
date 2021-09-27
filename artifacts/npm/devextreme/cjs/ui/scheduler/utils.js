/**
* DevExtreme (cjs/ui/scheduler/utils.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.utils = void 0;

var _size = require("../../core/utils/size");

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _iterator = require("../../core/utils/iterator");

var _constants = require("./constants");

var _element = require("../../core/element");

var _data = require("../../core/utils/data");

var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var utils = {
  dataAccessors: {
    getAppointmentSettings: function getAppointmentSettings(element) {
      return (0, _renderer.default)(element).data(_constants.APPOINTMENT_SETTINGS_KEY);
    },
    getAppointmentInfo: function getAppointmentInfo(element) {
      var settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    },
    create: function create(instance, fields, currentDataAccessors, forceIsoDateParsing, getDateSerializationFormat, setDateSerializationFormat) {
      var isDateField = function isDateField(field) {
        return field === 'startDate' || field === 'endDate';
      };

      var defaultDataAccessors = {
        getter: {},
        setter: {},
        expr: {}
      };
      var dataAccessors = currentDataAccessors ? _extends({}, currentDataAccessors) : defaultDataAccessors;
      (0, _iterator.each)(fields, function (name, expr) {
        if (expr) {
          var getter = (0, _data.compileGetter)(expr);
          var setter = (0, _data.compileSetter)(expr);
          var dateGetter;
          var dateSetter;

          if (isDateField(name)) {
            dateGetter = function dateGetter() {
              var value = getter.apply(instance, arguments);

              if (forceIsoDateParsing) {
                if (!getDateSerializationFormat()) {
                  var format = _date_serialization.default.getDateSerializationFormat(value);

                  if (format) {
                    setDateSerializationFormat(format);
                  }
                }

                value = _date_serialization.default.deserializeDate(value);
              }

              return value;
            };

            dateSetter = function dateSetter(object, value) {
              if (forceIsoDateParsing || getDateSerializationFormat()) {
                value = _date_serialization.default.serializeDate(value, getDateSerializationFormat());
              }

              setter.call(this, object, value);
            };
          }

          dataAccessors.getter[name] = dateGetter || getter;
          dataAccessors.setter[name] = dateSetter || setter;
          dataAccessors.expr["".concat(name, "Expr")] = expr;
        } else {
          delete dataAccessors.getter[name];
          delete dataAccessors.setter[name];
          delete dataAccessors.expr["".concat(name, "Expr")];
        }
      });
      return dataAccessors;
    }
  },
  DOM: {
    getHeaderHeight: function getHeaderHeight(header) {
      return header ? header._$element && parseInt((0, _size.getOuterHeight)(header._$element), 10) : 0;
    }
  },
  renovation: {
    renderComponent: function renderComponent(widget, parentElement, componentClass, componentName, viewModel) {
      var component = widget[componentName];

      if (!component) {
        var container = (0, _element.getPublicElement)(parentElement);
        component = widget._createComponent(container, componentClass, viewModel);
        widget[componentName] = component;
      } else {
        // TODO: this is a workaround for setTablesSizes. Remove after CSS refactoring
        var $element = component.$element();
        var elementStyle = $element.get(0).style;
        var height = elementStyle.height;
        var width = elementStyle.width;
        component.option(viewModel);

        if (height) {
          (0, _size.setHeight)($element, height);
        }

        if (width) {
          (0, _size.setWidth)($element, width);
        }
      }
    }
  }
};
exports.utils = utils;
