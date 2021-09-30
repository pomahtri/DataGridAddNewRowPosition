/**
* DevExtreme (renovation/ui/scroll_view/utils/get_offset_distance.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getOffsetDistance = getOffsetDistance;

var _common = require("../../../../core/utils/common");

function getOffsetDistance(targetLocation, scrollOffset) {
  return {
    top: (0, _common.ensureDefined)(targetLocation.top, scrollOffset.top) - scrollOffset.top,
    left: (0, _common.ensureDefined)(targetLocation.left, scrollOffset.left) - scrollOffset.left
  };
}
