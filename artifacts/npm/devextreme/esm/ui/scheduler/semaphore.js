/**
* DevExtreme (esm/ui/scheduler/semaphore.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export default class Semaphore {
  constructor() {
    this.counter = 0;
  }

  isFree() {
    return this.counter === 0;
  }

  take() {
    this.counter++;
  }

  release() {
    this.counter--;

    if (this.counter < 0) {
      this.counter = 0;
    }
  }

}
