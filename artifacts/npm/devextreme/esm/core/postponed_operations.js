/**
* DevExtreme (esm/core/postponed_operations.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Deferred, when } from './utils/deferred';
import { isDefined } from './utils/type';
export class PostponedOperations {
  constructor() {
    this._postponedOperations = {};
  }

  add(key, fn, postponedPromise) {
    if (key in this._postponedOperations) {
      postponedPromise && this._postponedOperations[key].promises.push(postponedPromise);
    } else {
      var completePromise = new Deferred();
      this._postponedOperations[key] = {
        fn: fn,
        completePromise: completePromise,
        promises: postponedPromise ? [postponedPromise] : []
      };
    }

    return this._postponedOperations[key].completePromise.promise();
  }

  callPostponedOperations() {
    for (var key in this._postponedOperations) {
      var operation = this._postponedOperations[key];

      if (isDefined(operation)) {
        if (operation.promises && operation.promises.length) {
          when(...operation.promises).done(operation.fn).then(operation.completePromise.resolve);
        } else {
          operation.fn().done(operation.completePromise.resolve);
        }
      }
    }

    this._postponedOperations = {};
  }

}
