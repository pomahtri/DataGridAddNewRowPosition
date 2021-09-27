import _extends from "@babel/runtime/helpers/esm/extends";
import VerticalAppointmentsStrategy from './rendering_strategies/strategy_vertical';
import HorizontalAppointmentsStrategy from './rendering_strategies/strategy_horizontal';
import HorizontalMonthLineAppointmentsStrategy from './rendering_strategies/strategy_horizontal_month_line';
import HorizontalMonthAppointmentsStrategy from './rendering_strategies/strategy_horizontal_month';
import AgendaAppointmentsStrategy from './rendering_strategies/strategy_agenda';
var RENDERING_STRATEGIES = {
  'horizontal': HorizontalAppointmentsStrategy,
  'horizontalMonth': HorizontalMonthAppointmentsStrategy,
  'horizontalMonthLine': HorizontalMonthLineAppointmentsStrategy,
  'vertical': VerticalAppointmentsStrategy,
  'agenda': AgendaAppointmentsStrategy
};
export class AppointmentViewModel {
  initRenderingStrategy(options) {
    var RenderingStrategy = RENDERING_STRATEGIES[options.appointmentRenderingStrategyName];
    this.renderingStrategy = new RenderingStrategy(options);
  }

  generate(options) {
    var {
      isRenovatedAppointments,
      filteredItems,
      appointmentRenderingStrategyName
    } = options;
    var appointments = filteredItems ? filteredItems.slice() : [];
    this.initRenderingStrategy(options);
    var positionMap = this.getRenderingStrategy().createTaskPositionMap(appointments); // TODO - appointments are mutated inside!

    var viewModel = this.postProcess(appointments, positionMap, appointmentRenderingStrategyName, isRenovatedAppointments);

    if (isRenovatedAppointments) {
      // TODO this structure should be by default after remove old render
      viewModel = this.makeRenovatedViewModel(viewModel);
    }

    return {
      positionMap,
      viewModel
    };
  }

  postProcess(filteredItems, positionMap, appointmentRenderingStrategyName, isRenovatedAppointments) {
    return filteredItems.map((data, index) => {
      // TODO research do we need this code
      if (!this.getRenderingStrategy().keepAppointmentSettings()) {
        delete data.settings;
      } // TODO Seems we can analize direction in the rendering strategies


      var appointmentSettings = positionMap[index];
      appointmentSettings.forEach(item => {
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
  }

  makeRenovatedViewModel(viewModel) {
    var result = [];
    var strategy = this.getRenderingStrategy();
    viewModel.forEach(_ref => {
      var {
        itemData,
        settings
      } = _ref;
      var items = settings.map(options => {
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
      result.push(...items);
    });
    return result;
  }

  getRenderingStrategy() {
    return this.renderingStrategy;
  }

}