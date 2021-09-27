/**
* DevExtreme (esm/core/utils/stubs.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function stubComponent(componentName) {
  return class NoComponent {
    constructor() {
      // TODO: make correct exceptions here and in decorators
      throw new Error("Module '".concat(componentName, "' not found"));
    }

    static getInstance() {}

  };
}
