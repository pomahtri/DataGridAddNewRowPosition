"use strict";

exports.getDropDownViewSwitcher = exports.getViewSwitcher = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var VIEW_SWITCHER_CLASS = "dx-scheduler-view-switcher";
var VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS = "dx-scheduler-view-switcher-dropdown-button";
var VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS = "dx-scheduler-view-switcher-dropdown-button-content";

var getViewSwitcher = function getViewSwitcher(item, selectedView, views, setCurrentView) {
  return _extends({
    widget: "dxButtonGroup",
    locateInMenu: "auto",
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      keyExpr: "name",
      selectedItemKeys: [selectedView],
      stylingMode: "contained",
      onItemClick: function onItemClick(e) {
        setCurrentView(e.itemData);
      }
    }
  }, item);
};

exports.getViewSwitcher = getViewSwitcher;

var getDropDownViewSwitcher = function getDropDownViewSwitcher(item, selectedView, views, setCurrentView) {
  return _extends({
    widget: "dxDropDownButton",
    locateInMenu: "never",
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      useSelectMode: true,
      keyExpr: "name",
      selectedItemKey: selectedView,
      displayExpr: "text",
      elementAttr: {
        class: VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS
      },
      onItemClick: function onItemClick(e) {
        setCurrentView(e.itemData);
      },
      dropDownOptions: {
        width: "max-content",
        wrapperAttr: {
          class: VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS
        }
      }
    }
  }, item);
};

exports.getDropDownViewSwitcher = getDropDownViewSwitcher;