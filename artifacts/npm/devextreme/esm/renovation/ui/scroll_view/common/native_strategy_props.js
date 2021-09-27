/**
* DevExtreme (esm/renovation/ui/scroll_view/common/native_strategy_props.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { nativeScrolling } from "../../../../core/utils/support";
import devices from "../../../../core/devices";
import browser from "../../../../core/utils/browser";
import { BaseScrollableProps } from "./base_scrollable_props";
import { getDefaultNativeRefreshStrategy } from "../utils/get_default_option_value";
export var ScrollableNativeProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(BaseScrollableProps), Object.getOwnPropertyDescriptors({
  get useSimulatedScrollbar() {
    return !!nativeScrolling && devices.real().platform === "android" && !browser.mozilla;
  },

  showScrollbar: "onScroll",

  get refreshStrategy() {
    return getDefaultNativeRefreshStrategy();
  }

})));
