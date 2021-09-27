/**
* DevExtreme (esm/integration/angular/action_executors.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Action from '../../core/action'; // eslint-disable-next-line no-restricted-imports

import angular from 'angular';

if (angular) {
  Action.registerExecutor({
    'ngExpression': {
      execute: function execute(e) {
        if (typeof e.action === 'string') {
          e.context.$eval(e.action);
        }
      }
    }
  });
}
