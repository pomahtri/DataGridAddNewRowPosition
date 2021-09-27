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