/**
* DevExtreme (renovation/ui/scroll_view/utils/clamp_into_range.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.clampIntoRange = clampIntoRange;

function clampIntoRange(value, max, min) {
  return Math.max(Math.min(value, max), min);
}
