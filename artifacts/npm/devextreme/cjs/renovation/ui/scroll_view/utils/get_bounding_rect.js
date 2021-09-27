/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_bounding_rect.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getBoundingRect = getBoundingRect;

function getBoundingRect(el) {
  return el ? el.getBoundingClientRect() : {
    width: 0,
    height: 0,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  };
}
