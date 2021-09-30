/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_device_pixel_ratio.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWindow, hasWindow } from "../../../../core/utils/window";
export function getDevicePixelRatio() {
  return hasWindow() ? getWindow().devicePixelRatio : 1;
}
