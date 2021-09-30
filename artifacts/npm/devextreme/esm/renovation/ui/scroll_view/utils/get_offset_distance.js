/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_offset_distance.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ensureDefined } from "../../../../core/utils/common";
export function getOffsetDistance(targetLocation, scrollOffset) {
  return {
    top: ensureDefined(targetLocation.top, scrollOffset.top) - scrollOffset.top,
    left: ensureDefined(targetLocation.left, scrollOffset.left) - scrollOffset.left
  };
}
