/**
* DevExtreme (esm/core/utils/position.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../config';
import { isWindow } from '../utils/type';
import domAdapter from '../dom_adapter';

var getDefaultAlignment = isRtlEnabled => {
  var rtlEnabled = isRtlEnabled !== null && isRtlEnabled !== void 0 ? isRtlEnabled : config().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};

var getBoundingRect = element => {
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }

  if (domAdapter.getDocumentElement()) {
    return element.getBoundingClientRect();
  }

  return 0;
};

export { getBoundingRect, getDefaultAlignment };
