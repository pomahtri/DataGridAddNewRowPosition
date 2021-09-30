/**
* DevExtreme (esm/ui/text_box/utils.support.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../core/dom_adapter';
import devices from '../../core/devices'; // Must become obsolete after the fix https://bugs.chromium.org/p/chromium/issues/detail?id=947408

function isModernAndroidDevice() {
  var {
    android,
    version
  } = devices.real();
  return android && version[0] > 4;
}

export function isInputEventsL2Supported() {
  return 'onbeforeinput' in domAdapter.createElement('input') || isModernAndroidDevice();
}
