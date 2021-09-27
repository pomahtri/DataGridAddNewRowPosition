import devices from "../../../../core/devices";
import { nativeScrolling } from "../../../../core/utils/support";
export function isDesktop() {
  return !devices.isSimulator() && devices.real().deviceType === "desktop" && devices.current().platform === "generic";
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