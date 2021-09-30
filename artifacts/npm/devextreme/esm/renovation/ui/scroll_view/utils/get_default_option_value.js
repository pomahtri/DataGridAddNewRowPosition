/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_default_option_value.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from "../../../../core/devices";
import { nativeScrolling } from "../../../../core/utils/support";
import browser from "../../../../core/utils/browser";
export function isDesktop() {
  return !devices.isSimulator() && devices.real().deviceType === "desktop" && devices.current().platform === "generic";
}
export function getDefaultUseSimulatedScrollbar() {
  return !!nativeScrolling && devices.real().platform === "android" && !browser.mozilla;
}
export function getDefaultBounceEnabled() {
  return !isDesktop();
}
export function getDefaultUseNative() {
  return !!nativeScrolling;
}
export function getDefaultNativeRefreshStrategy() {
  return devices.real().platform === "android" ? "swipeDown" : "pullDown";
}
