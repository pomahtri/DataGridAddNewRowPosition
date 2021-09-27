/**
* DevExtreme (esm/ui/grid_core/ui.grid_core.header_panel.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Toolbar from '../toolbar';
import { ColumnsView } from './ui.grid_core.columns_view';
import { noop } from '../../core/utils/common';
import { isDefined, isString } from '../../core/utils/type';
import { triggerResizeEvent } from '../../events/visibility_change';
import messageLocalization from '../../localization/message';
import '../drop_down_menu';
import { extend } from '../../core/utils/extend';
import { getPathParts } from '../../core/utils/data';
var HEADER_PANEL_CLASS = 'header-panel';
var TOOLBAR_BUTTON_CLASS = 'toolbar-button';
var TOOLBAR_ARIA_LABEL = '-ariaToolbar';
var HeaderPanel = ColumnsView.inherit({
  _getToolbarItems: function _getToolbarItems() {
    return [];
  },
  _getButtonContainer: function _getButtonContainer() {
    return $('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
  },
  _getToolbarButtonClass: function _getToolbarButtonClass(specificClass) {
    var secondClass = specificClass ? ' ' + specificClass : '';
    return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
  },
  _getToolbarOptions: function _getToolbarOptions() {
    var userToolbarOptions = this.option('toolbar');
    var options = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        visible: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.visible,
        disabled: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.disabled,
        onItemRendered: function onItemRendered(e) {
          var itemRenderedCallback = e.itemData.onItemRendered;

          if (itemRenderedCallback) {
            itemRenderedCallback(e);
          }
        }
      }
    };
    var userItems = userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.items;
    options.toolbarOptions.items = this._normalizeToolbarItems(options.toolbarOptions.items, userItems);
    this.executeAction('onToolbarPreparing', options);

    if (options.toolbarOptions && !isDefined(options.toolbarOptions.visible)) {
      var toolbarItems = options.toolbarOptions.items;
      options.toolbarOptions.visible = !!(toolbarItems !== null && toolbarItems !== void 0 && toolbarItems.length);
    }

    return options.toolbarOptions;
  },

  _normalizeToolbarItems(defaultItems, userItems) {
    var isArray = Array.isArray(userItems);

    if (!isDefined(userItems)) {
      return defaultItems;
    }

    if (!isArray) {
      userItems = [userItems];
    }

    var defaultButtonsByNames = {};
    defaultItems.forEach(button => {
      defaultButtonsByNames[button.name] = button;
    });
    var normalizedItems = extend(true, [], userItems.map(button => {
      if (isString(button)) {
        button = {
          name: button
        };
      }

      if (!isDefined(button.name) || !isDefined(defaultButtonsByNames[button.name])) {
        return button;
      }

      return extend(true, defaultButtonsByNames[button.name], button);
    }));
    return isArray ? normalizedItems : normalizedItems[0];
  },

  _renderCore: function _renderCore() {
    if (!this._toolbar) {
      var $headerPanel = this.element();
      $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));
      var label = messageLocalization.format(this.component.NAME + TOOLBAR_ARIA_LABEL);
      var $toolbar = $('<div>').attr('aria-label', label).appendTo($headerPanel);
      this._toolbar = this._createComponent($toolbar, Toolbar, this._toolbarOptions);
    } else {
      this._toolbar.option(this._toolbarOptions);
    }
  },
  _columnOptionChanged: noop,
  _handleDataChanged: function _handleDataChanged() {
    if (this._requireReady) {
      this.render();
    }
  },
  init: function init() {
    this.callBase();
    this.createAction('onToolbarPreparing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  render: function render() {
    this._toolbarOptions = this._getToolbarOptions();
    this.callBase.apply(this, arguments);
  },
  setToolbarItemDisabled: function setToolbarItemDisabled(name, optionValue) {
    var toolbarInstance = this._toolbar;

    if (toolbarInstance) {
      var items = toolbarInstance.option('items') || [];
      var itemIndex = items.indexOf(items.filter(function (item) {
        return item.name === name;
      })[0]);

      if (itemIndex >= 0) {
        var itemOptionPrefix = 'items[' + itemIndex + ']';

        if (toolbarInstance.option(itemOptionPrefix + '.options')) {
          toolbarInstance.option(itemOptionPrefix + '.options.disabled', optionValue);
        } else {
          toolbarInstance.option(itemOptionPrefix + '.disabled', optionValue);
        }
      }
    }
  },
  updateToolbarDimensions: function updateToolbarDimensions() {
    if (this._toolbar) {
      triggerResizeEvent(this.getHeaderPanel());
    }
  },
  getHeaderPanel: function getHeaderPanel() {
    return this.element();
  },
  getHeight: function getHeight() {
    return this.getElementHeight();
  },
  optionChanged: function optionChanged(args) {
    if (args.name === 'onToolbarPreparing') {
      this._invalidate();

      args.handled = true;
    }

    if (args.name === 'toolbar') {
      args.handled = true;

      if (this._toolbar) {
        var parts = getPathParts(args.fullName);
        var optionName = args.fullName.replace(/^toolbar\./, '');

        if (parts.length === 1) {
          // `toolbar` case
          var toolbarOptions = this._getToolbarOptions();

          this._toolbar.option(toolbarOptions);
        } else if (parts[1] === 'items') {
          if (parts.length === 2) {
            // `toolbar.items` case
            var _toolbarOptions = this._getToolbarOptions();

            this._toolbar.option('items', _toolbarOptions.items);
          } else if (parts.length === 3) {
            // `toolbar.items[i]` case
            var normalizedItem = this._normalizeToolbarItems(this._getToolbarItems(), args.value);

            this._toolbar.option(optionName, normalizedItem);
          } else if (parts.length >= 4) {
            // `toolbar.items[i].prop` case
            this._toolbar.option(optionName, args.value);
          }
        } else {
          // `toolbar.visible`, `toolbar.disabled` case
          this._toolbar.option(optionName, args.value);
        }
      }
    }

    this.callBase(args);
  },
  isVisible: function isVisible() {
    return this._toolbarOptions && this._toolbarOptions.visible;
  },
  allowDragging: noop
});
export var headerPanelModule = {
  defaultOptions: function defaultOptions() {
    return {};
  },
  views: {
    headerPanel: HeaderPanel
  },
  extenders: {
    controllers: {
      resizing: {
        _updateDimensionsCore: function _updateDimensionsCore() {
          this.callBase.apply(this, arguments);
          this.getView('headerPanel').updateToolbarDimensions();
        }
      }
    }
  }
};
