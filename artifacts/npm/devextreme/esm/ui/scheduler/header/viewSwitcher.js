/**
* DevExtreme (esm/ui/scheduler/header/viewSwitcher.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { formatViews, getViewName } from './utils';
var VIEW_SWITCHER_CLASS = 'dx-scheduler-view-switcher';
var VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS = 'dx-scheduler-view-switcher-dropdown-button';
var VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS = 'dx-scheduler-view-switcher-dropdown-button-content';

var getViewsAndSelectedView = header => {
  var views = formatViews(header.views);
  var selectedView = getViewName(header.currentView);
  var isSelectedViewInViews = views.some(view => view.name === selectedView);
  selectedView = isSelectedViewInViews ? selectedView : undefined;
  return {
    selectedView,
    views
  };
};

export var getViewSwitcher = (header, item) => {
  var {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  return _extends({
    widget: 'dxButtonGroup',
    locateInMenu: 'auto',
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      keyExpr: 'name',
      selectedItemKeys: [selectedView],
      stylingMode: 'contained',
      onItemClick: e => {
        var view = e.itemData.view;

        header._updateCurrentView(view);
      },
      onContentReady: e => {
        var viewSwitcher = e.component;

        header._addEvent('currentView', view => {
          viewSwitcher.option('selectedItemKeys', [getViewName(view)]);
        });
      }
    }
  }, item);
};
export var getDropDownViewSwitcher = (header, item) => {
  var {
    selectedView,
    views
  } = getViewsAndSelectedView(header);
  return _extends({
    widget: 'dxDropDownButton',
    locateInMenu: 'never',
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      useSelectMode: true,
      keyExpr: 'name',
      selectedItemKey: selectedView,
      displayExpr: 'text',
      elementAttr: {
        class: VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS
      },
      onItemClick: e => {
        var view = e.itemData.view;

        header._updateCurrentView(view);
      },
      onContentReady: e => {
        var viewSwitcher = e.component;

        header._addEvent('currentView', view => {
          viewSwitcher.option('selectedItemKey', getViewName(view));
        });
      },
      dropDownOptions: {
        width: 'max-content',
        wrapperAttr: {
          class: VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS
        }
      }
    }
  }, item);
};
