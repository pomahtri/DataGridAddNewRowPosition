import _extends from "@babel/runtime/helpers/esm/extends";
import { getRelativeOffset } from "./get_relative_offset";
import { DIRECTION_VERTICAL, SCROLLABLE_CONTENT_CLASS } from "../common/consts";
export function getElementLocationInternal(targetElement, direction, containerElement, scrollOffset, offset) {
  var additionalOffset = _extends({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, offset);

  var isVertical = direction === DIRECTION_VERTICAL;
  var prop = isVertical ? "top" : "left";
  var inverseProp = isVertical ? "bottom" : "right";
  var dimension = isVertical ? "Height" : "Width";
  var relativeElementOffset = getRelativeOffset(targetElement.closest(".".concat(SCROLLABLE_CONTENT_CLASS)), targetElement)[prop];
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