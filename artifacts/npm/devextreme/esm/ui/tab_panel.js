/**
* DevExtreme (esm/ui/tab_panel.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getOuterHeight } from '../core/utils/size';
import $ from '../core/renderer';
import { touch } from '../core/utils/support';
import { extend } from '../core/utils/extend';
import devices from '../core/devices';
import domAdapter from '../core/dom_adapter';
import registerComponent from '../core/component_registrator';
import MultiView from './multi_view';
import Tabs from './tabs';
import { default as TabPanelItem } from './tab_panel/item';
import { getImageContainer } from '../core/utils/icon';
import { getPublicElement } from '../core/element';
import { isPlainObject, isDefined } from '../core/utils/type';
import { BindableTemplate } from '../core/templates/bindable_template';
import { hasWindow } from '../core/utils/window'; // STYLE tabPanel

var TABPANEL_CLASS = 'dx-tabpanel';
var TABPANEL_TABS_CLASS = 'dx-tabpanel-tabs';
var TABPANEL_CONTAINER_CLASS = 'dx-tabpanel-container';
var TABS_ITEM_TEXT_CLASS = 'dx-tab-text';
var TabPanel = MultiView.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      itemTitleTemplate: 'title',
      hoverStateEnabled: true,
      showNavButtons: false,
      scrollByContent: true,
      scrollingEnabled: true,
      onTitleClick: null,
      onTitleHold: null,
      onTitleRendered: null,
      badgeExpr: function badgeExpr(data) {
        return data ? data.badge : undefined;
      }
      /**
      * @name dxTabPanelItem.visible
      * @hidden
      */

    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function device() {
        return !touch;
      },
      options: {
        swipeEnabled: false
      }
    }, {
      device: {
        platform: 'generic'
      },
      options: {
        animationEnabled: false
      }
    }]);
  },
  _init: function _init() {
    this.callBase();
    this.$element().addClass(TABPANEL_CLASS);
    this.setAria('role', 'tabpanel');
  },
  _initMarkup: function _initMarkup() {
    this.callBase();

    this._createTitleActions();

    this._renderLayout();
  },
  _initTemplates: function _initTemplates() {
    this.callBase();

    this._templateManager.addDefaultTemplates({
      title: new BindableTemplate(function ($container, data) {
        if (isPlainObject(data)) {
          var $iconElement = getImageContainer(data.icon);

          if ($iconElement) {
            $container.append($iconElement);
          }

          if (isDefined(data.title) && !isPlainObject(data.title)) {
            $container.append(domAdapter.createTextNode(data.title));
          }
        } else {
          if (isDefined(data)) {
            $container.text(String(data));
          }
        }

        $container.wrapInner($('<span>').addClass(TABS_ITEM_TEXT_CLASS));
      }, ['title', 'icon'], this.option('integrationOptions.watchMethod'))
    });
  },
  _createTitleActions: function _createTitleActions() {
    this._createTitleClickAction();

    this._createTitleHoldAction();

    this._createTitleRenderedAction();
  },
  _createTitleClickAction: function _createTitleClickAction() {
    this._titleClickAction = this._createActionByOption('onTitleClick');
  },
  _createTitleHoldAction: function _createTitleHoldAction() {
    this._titleHoldAction = this._createActionByOption('onTitleHold');
  },
  _createTitleRenderedAction: function _createTitleRenderedAction() {
    this._titleRenderedAction = this._createActionByOption('onTitleRendered');
  },
  _renderContent: function _renderContent() {
    var that = this;
    this.callBase();

    if (this.option('templatesRenderAsynchronously')) {
      this._resizeEventTimer = setTimeout(function () {
        that._updateLayout();
      }, 0);
    }
  },
  _renderLayout: function _renderLayout() {
    if (this._tabs) {
      this._updateLayout();

      return;
    }

    var $element = this.$element();
    this._$tabContainer = $('<div>').addClass(TABPANEL_TABS_CLASS).appendTo($element);
    var $tabs = $('<div>').appendTo(this._$tabContainer);
    this._tabs = this._createComponent($tabs, Tabs, this._tabConfig());
    this._$container = $('<div>').addClass(TABPANEL_CONTAINER_CLASS).appendTo($element);

    this._$container.append(this._$wrapper);

    this._updateLayout();
  },
  _updateLayout: function _updateLayout() {
    if (hasWindow()) {
      var tabsHeight = getOuterHeight(this._$tabContainer);

      this._$container.css({
        'marginTop': -tabsHeight,
        'paddingTop': tabsHeight
      });
    }
  },
  _refreshActiveDescendant: function _refreshActiveDescendant() {
    if (!this._tabs) {
      return;
    }

    var tabs = this._tabs;
    var tabItems = tabs.itemElements();
    var $activeTab = $(tabItems[tabs.option('selectedIndex')]);
    var id = this.getFocusedItemId();
    this.setAria('controls', undefined, $(tabItems));
    this.setAria('controls', id, $activeTab);
  },
  _tabConfig: function _tabConfig() {
    return {
      selectOnFocus: true,
      focusStateEnabled: this.option('focusStateEnabled'),
      hoverStateEnabled: this.option('hoverStateEnabled'),
      repaintChangesOnly: this.option('repaintChangesOnly'),
      tabIndex: this.option('tabIndex'),
      selectedIndex: this.option('selectedIndex'),
      badgeExpr: this.option('badgeExpr'),
      onItemClick: this._titleClickAction.bind(this),
      onItemHold: this._titleHoldAction.bind(this),
      itemHoldTimeout: this.option('itemHoldTimeout'),
      onSelectionChanged: function (e) {
        this.option('selectedIndex', e.component.option('selectedIndex'));

        this._refreshActiveDescendant();
      }.bind(this),
      onItemRendered: this._titleRenderedAction.bind(this),
      itemTemplate: this._getTemplateByOption('itemTitleTemplate'),
      items: this.option('items'),
      noDataText: null,
      scrollingEnabled: this.option('scrollingEnabled'),
      scrollByContent: this.option('scrollByContent'),
      showNavButtons: this.option('showNavButtons'),
      itemTemplateProperty: 'tabTemplate',
      loopItemFocus: this.option('loop'),
      selectionRequired: true,
      onOptionChanged: function (args) {
        if (args.name === 'focusedElement') {
          if (args.value) {
            var $value = $(args.value);

            var $newItem = this._itemElements().eq($value.index());

            this.option('focusedElement', getPublicElement($newItem));
          } else {
            this.option('focusedElement', args.value);
          }
        }
      }.bind(this),
      onFocusIn: function (args) {
        this._focusInHandler(args.event);
      }.bind(this),
      onFocusOut: function (args) {
        if (!this._isFocusOutHandlerExecuting) {
          this._focusOutHandler(args.event);
        }
      }.bind(this)
    };
  },
  _renderFocusTarget: function _renderFocusTarget() {
    this._focusTarget().attr('tabIndex', -1);
  },
  _updateFocusState: function _updateFocusState(e, isFocused) {
    this.callBase(e, isFocused);

    if (e.target === this._tabs._focusTarget().get(0)) {
      this._toggleFocusClass(isFocused, this._focusTarget());
    }
  },
  _focusOutHandler: function _focusOutHandler(e) {
    this._isFocusOutHandlerExecuting = true;
    this.callBase.apply(this, arguments);

    this._tabs._focusOutHandler(e);

    this._isFocusOutHandlerExecuting = false;
  },
  _setTabsOption: function _setTabsOption(name, value) {
    if (this._tabs) {
      this._tabs.option(name, value);
    }
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      this._tabs._dimensionChanged();

      this._updateLayout();
    }
  },
  registerKeyHandler: function registerKeyHandler(key, handler) {
    this.callBase(key, handler);

    if (this._tabs) {
      this._tabs.registerKeyHandler(key, handler);
    }
  },
  repaint: function repaint() {
    this.callBase();

    this._tabs.repaint();
  },
  _optionChanged: function _optionChanged(args) {
    var name = args.name;
    var value = args.value;
    var fullName = args.fullName;

    switch (name) {
      case 'dataSource':
        this.callBase(args);
        break;

      case 'items':
        this._setTabsOption(name, this.option(name));

        this._updateLayout();

        if (!this.option('repaintChangesOnly')) {
          this._tabs.repaint();
        }

        this.callBase(args);
        break;

      case 'width':
        this.callBase(args);

        this._tabs.repaint();

        break;

      case 'selectedIndex':
      case 'selectedItem':
        {
          this._setTabsOption(fullName, value);

          this.callBase(args);

          if (this.option('focusStateEnabled') === true) {
            var selectedIndex = this.option('selectedIndex');

            var selectedTabContent = this._itemElements().eq(selectedIndex);

            this.option('focusedElement', getPublicElement(selectedTabContent));
          }

          break;
        }

      case 'itemHoldTimeout':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._setTabsOption(fullName, value);

        this.callBase(args);
        break;

      case 'scrollingEnabled':
      case 'scrollByContent':
      case 'showNavButtons':
        this._setTabsOption(fullName, value);

        break;

      case 'focusedElement':
        {
          var id = value ? $(value).index() : value;
          var newItem = value ? this._tabs._itemElements().eq(id) : value;

          this._setTabsOption('focusedElement', getPublicElement(newItem));

          this.callBase(args);
          break;
        }

      case 'itemTitleTemplate':
        this._setTabsOption('itemTemplate', this._getTemplateByOption('itemTitleTemplate'));

        break;

      case 'onTitleClick':
        this._createTitleClickAction();

        this._setTabsOption('onItemClick', this._titleClickAction.bind(this));

        break;

      case 'onTitleHold':
        this._createTitleHoldAction();

        this._setTabsOption('onItemHold', this._titleHoldAction.bind(this));

        break;

      case 'onTitleRendered':
        this._createTitleRenderedAction();

        this._setTabsOption('onItemRendered', this._titleRenderedAction.bind(this));

        break;

      case 'loop':
        this._setTabsOption('loopItemFocus', value);

        break;

      case 'badgeExpr':
        this._invalidate();

        break;

      default:
        this.callBase(args);
    }
  },
  _clean: function _clean() {
    clearTimeout(this._resizeEventTimer);
    this.callBase();
  }
});
TabPanel.ItemClass = TabPanelItem;
registerComponent('dxTabPanel', TabPanel);
export default TabPanel;
/**
 * @name dxTabPanelItem
 * @inherits dxMultiViewItem
 * @type object
 */
