/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_relative_offset.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getRelativeOffset = getRelativeOffset;

function getRelativeOffset(targetElement, sourceElement) {
  var offset = {
    left: 0,
    top: 0
  };
  var currentElement = sourceElement;

  while ((_currentElement = currentElement) !== null && _currentElement !== void 0 && _currentElement.offsetParent && currentElement !== targetElement) {
    var _currentElement;

    var parentOffsetElement = currentElement.offsetParent;
    var currentElementRect = currentElement.getBoundingClientRect();
    var parentOffsetElementRect = parentOffsetElement.getBoundingClientRect();
    offset.left += currentElementRect.left - parentOffsetElementRect.left;
    offset.top += currentElementRect.top - parentOffsetElementRect.top;
    currentElement = currentElement.offsetParent;
  }

  return offset;
}
