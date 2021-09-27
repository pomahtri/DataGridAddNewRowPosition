/**
* DevExtreme (esm/renovation/ui/scroll_view/common/scrollable_props.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import devices from "../../../../core/devices";
import browser from "../../../../core/utils/browser";
import { ScrollableSimulatedProps } from "./simulated_strategy_props";
import { nativeScrolling } from "../../../../core/utils/support";
import { getDefaultUseNative, getDefaultNativeRefreshStrategy } from "../utils/get_default_option_value";
export var ScrollableProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(ScrollableSimulatedProps), Object.getOwnPropertyDescriptors({
  get useNative() {
    return getDefaultUseNative();
  },

  get useSimulatedScrollbar() {
    return !!nativeScrolling && devices.real().platform === "android" && !browser.mozilla;
  },

  get refreshStrategy() {
    return getDefaultNativeRefreshStrategy();
  }

})));
