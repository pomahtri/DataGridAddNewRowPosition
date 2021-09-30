/**
* DevExtreme (renovation/ui/scroll_view/utils/get_element_location_internal.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getElementLocationInternal = getElementLocationInternal;

var _get_relative_offset = require("./get_relative_offset");

var _consts = require("../common/consts");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getElementLocationInternal(targetElement, direction, containerElement, scrollOffset, offset) {
  var additionalOffset = _extends({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, offset);

  var isVertical = direction === _consts.DIRECTION_VERTICAL;
  var prop = isVertical ? "top" : "left";
  var inverseProp = isVertical ? "bottom" : "right";
  var dimension = isVertical ? "Height" : "Width";
  var relativeElementOffset = (0, _get_relative_offset.getRelativeOffset)(targetElement.closest(".".concat(_consts.SCROLLABLE_CONTENT_CLASS)), targetElement)[prop];
  var containerScrollOffset = scrollOffset[prop];
  var containerSize = containerElement["client".concat(dimension)];
  var targetElementRect = targetElement.getBoundingClientRect();
  var elementSize = targetElementRect[inverseProp] - targetElementRect[prop];
  var relativeStartOffset = containerScrollOffset - relativeElementOffset + additionalOffset[prop];
  var relativeEndOffset = containerScrollOffset - relativeElementOffset - elementSize + containerSize - additionalOffset[inverseProp];

  if (relativeStartOffset <= 0 && relativeEndOffset >= 0) {
    return containerScrollOffset;
  }

  return containerScrollOffset - (Math.abs(relativeStartOffset) > Math.abs(relativeEndOffset) ? relativeEndOffset : relativeStartOffset);
}
