/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_scrollbar_size.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getScrollbarSize = getScrollbarSize;

function getScrollbarSize(element, direction) {
  if (direction === "vertical") {
    return element.offsetWidth - element.clientWidth;
  }

  return element.offsetHeight - element.clientHeight;
}
