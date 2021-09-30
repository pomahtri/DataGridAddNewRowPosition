/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/subscribe_to_resize.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import resizeObserverSingleton from "../../../../core/resize_observer";
import { hasWindow } from "../../../../core/utils/window";
export function subscribeToResize(element, handler) {
  if (hasWindow() && element) {
    resizeObserverSingleton.observe(element, _ref => {
      var {
        target
      } = _ref;
      handler(target);
    });
    return () => {
      resizeObserverSingleton.unobserve(element);
    };
  }

  return undefined;
}
