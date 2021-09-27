/**
* DevExtreme (esm/renovation/ui/scroll_view/common/simulated_strategy_props.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseScrollableProps } from "./base_scrollable_props";
import { isDesktop } from "../utils/get_default_option_value";
export var ScrollableSimulatedProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(BaseScrollableProps), Object.getOwnPropertyDescriptors({
  inertiaEnabled: true,
  useKeyboard: true,

  get showScrollbar() {
    return isDesktop() ? "onHover" : "onScroll";
  },

  get scrollByThumb() {
    return isDesktop();
  },

  refreshStrategy: "simulated"
})));
