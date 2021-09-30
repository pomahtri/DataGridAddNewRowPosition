/**
* DevExtreme (esm/ui/scheduler/publisher_mixin.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var publisherMixin = {
  notifyObserver: function notifyObserver(subject, args) {
    var observer = this.option('observer');

    if (observer) {
      observer.fire(subject, args);
    }
  },
  invoke: function invoke() {
    var observer = this.option('observer');

    if (observer) {
      return observer.fire.apply(observer, arguments);
    }
  }
};
export default publisherMixin;
