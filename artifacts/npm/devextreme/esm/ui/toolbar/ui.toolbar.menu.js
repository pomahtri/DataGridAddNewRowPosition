/**
* DevExtreme (esm/ui/toolbar/ui.toolbar.menu.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import registerComponent from '../../core/component_registrator';
import { each } from '../../core/utils/iterator';
import { ListBase } from '../list/ui.list.base';
var TOOLBAR_MENU_ACTION_CLASS = 'dx-toolbar-menu-action';
var TOOLBAR_HIDDEN_BUTTON_CLASS = 'dx-toolbar-hidden-button';
var TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS = 'dx-toolbar-hidden-button-group';
var TOOLBAR_MENU_SECTION_CLASS = 'dx-toolbar-menu-section';
var TOOLBAR_MENU_LAST_SECTION_CLASS = 'dx-toolbar-menu-last-section';
var ToolbarMenu = ListBase.inherit({
  _activeStateUnit: '.' + TOOLBAR_MENU_ACTION_CLASS,
  _initMarkup: function _initMarkup() {
    this._renderSections();

    this.callBase();
  },
  _getSections: function _getSections() {
    return this._itemContainer().children();
  },
  _itemElements: function _itemElements() {
    return this._getSections().children(this._itemSelector());
  },
  _renderSections: function _renderSections() {
    var that = this;

    var $container = this._itemContainer();

    each(['before', 'center', 'after', 'menu'], function () {
      var sectionName = '_$' + this + 'Section';
      var $section = that[sectionName];

      if (!$section) {
        that[sectionName] = $section = $('<div>').addClass(TOOLBAR_MENU_SECTION_CLASS);
      }

      $section.appendTo($container);
    });
  },
  _renderItems: function _renderItems() {
    this.callBase.apply(this, arguments);

    this._updateSections();
  },
  _updateSections: function _updateSections() {
    var $sections = this.$element().find('.' + TOOLBAR_MENU_SECTION_CLASS);
    $sections.removeClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
    $sections.not(':empty').eq(-1).addClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
  },
  _renderItem: function _renderItem(index, item, itemContainer, $after) {
    var location = item.location || 'menu';
    var $container = this['_$' + location + 'Section'];
    var itemElement = this.callBase(index, item, $container, $after);

    if (this._getItemTemplateName({
      itemData: item
    })) {
      itemElement.addClass('dx-toolbar-menu-custom');
    }

    if (location === 'menu' || item.widget === 'dxButton' || item.widget === 'dxButtonGroup' || item.isAction) {
      itemElement.addClass(TOOLBAR_MENU_ACTION_CLASS);
    }

    if (item.widget === 'dxButton') {
      itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_CLASS);
    }

    if (item.widget === 'dxButtonGroup') {
      itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS);
    }

    itemElement.addClass(item.cssClass);
    return itemElement;
  },
  _getItemTemplateName: function _getItemTemplateName(args) {
    var template = this.callBase(args);
    var data = args.itemData;
    var menuTemplate = data && data['menuItemTemplate'];
    return menuTemplate || template;
  },
  _itemClickHandler: function _itemClickHandler(e, args, config) {
    if ($(e.target).closest('.' + TOOLBAR_MENU_ACTION_CLASS).length) {
      this.callBase(e, args, config);
    }
  },
  _clean: function _clean() {
    this._getSections().empty();

    this.callBase();
  }
});
registerComponent('dxToolbarMenu', ToolbarMenu);
export default ToolbarMenu;
