"use strict";

exports.AppointmentViewModel = void 0;

var _strategy_vertical = _interopRequireDefault(require("./rendering_strategies/strategy_vertical"));

var _strategy_horizontal = _interopRequireDefault(require("./rendering_strategies/strategy_horizontal"));

var _strategy_horizontal_month_line = _interopRequireDefault(require("./rendering_strategies/strategy_horizontal_month_line"));

var _strategy_horizontal_month = _interopRequireDefault(require("./rendering_strategies/strategy_horizontal_month"));

var _strategy_agenda = _interopRequireDefault(require("./rendering_strategies/strategy_agenda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RENDERING_STRATEGIES = {
  'horizontal': _strategy_horizontal.default,
  'horizontalMonth': _strategy_horizontal_month.default,
  'horizontalMonthLine': _strategy_horizontal_month_line.default,
  'vertical': _strategy_vertical.default,
  'agenda': _strategy_agenda.default
};

var AppointmentViewModel = /*#__PURE__*/function () {
  function AppointmentViewModel() {}

  var _proto = AppointmentViewModel.prototype;

  _proto.initRenderingStrategy = function initRenderingStrategy(options) {
    var RenderingStrategy = RENDERING_STRATEGIES[options.appointmentRenderingStrategyName];
    this.renderingStrategy = new RenderingStrategy(options);
  };

  _proto.generate = function generate(filteredItems, options) {
    var isRenovatedAppointments = options.isRenovatedAppointments,
        appointmentRenderingStrategyName = options.appointmentRenderingStrategyName;
    var appointments = filteredItems ? filteredItems.slice() : [];
    this.initRenderingStrategy(options);
    var renderingStrategy = this.getRenderingStrategy();
    var positionMap = renderingStrategy.createTaskPositionMap(appointments); // TODO - appointments are mutated inside!

    var viewModel = this.postProcess(appointments, positionMap, appointmentRenderingStrategyName, isRenovatedAppointments);

    if (isRenovatedAppointments) {
      // TODO this structure should be by default after remove old render
      viewModel = this.makeRenovatedViewModel(viewModel);
    }

    return {
      positionMap: positionMap,
      viewModel: viewModel
    };
  };

  _proto.postProcess = function postProcess(filteredItems, positionMap, appointmentRenderingStrategyName, isRenovatedAppointments) {
    var _this = this;

    return filteredItems.map(function (data, index) {
      // TODO research do we need this code
      if (!_this.getRenderingStrategy().keepAppointmentSettings()) {
        delete data.settings;
      } // TODO Seems we can analize direction in the rendering strategies


      var appointmentSettings = positionMap[index];
      appointmentSettings.forEach(function (item) {
        item.direction = appointmentRenderingStrategyName === 'vertical' && !item.allDay ? 'vertical' : 'horizontal';
      });
      var item = {
        itemData: data,
        settings: appointmentSettings
      };

      if (!isRenovatedAppointments) {
        item.needRepaint = true;
        item.needRemove = false;
      }

      return item;
    });
  };

  _proto.makeRenovatedViewModel = function makeRenovatedViewModel(viewModel) {
    var result = [];
    var strategy = this.getRenderingStrategy();
    viewModel.forEach(function (_ref) {
      var itemData = _ref.itemData,
          settings = _ref.settings;
      var items = settings.map(function (options) {
        var geometry = strategy.getAppointmentGeometry(options);
        return {
          appointment: itemData,
          geometry: _extends({}, geometry, {
            // TODO move to the rendering strategies
            leftVirtualWidth: options.leftVirtualWidth,
            topVirtualHeight: options.topVirtualHeight
          }),
          info: options.info
        };
      });
      result.push.apply(result, _toConsumableArray(items));
    });
    return result;
  };

  _proto.getRenderingStrategy = function getRenderingStrategy() {
    return this.renderingStrategy;
  };

  return AppointmentViewModel;
}();

exports.AppointmentViewModel = AppointmentViewModel;