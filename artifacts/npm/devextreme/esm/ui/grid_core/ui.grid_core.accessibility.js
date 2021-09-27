/**
* DevExtreme (esm/ui/grid_core/ui.grid_core.accessibility.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as accessibility from '../../ui/shared/accessibility';
export var registerKeyboardAction = function registerKeyboardAction(viewName, instance, $element, selector, action) {
  var keyboardController = instance.getController('keyboardNavigation');

  if (instance.option('useLegacyKeyboardNavigation') || keyboardController && !keyboardController.isKeyboardEnabled()) {
    return;
  }

  var executeKeyDown = args => {
    instance.executeAction('onKeyDown', args);
  };

  instance.createAction('onKeyDown');
  accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown);
};
