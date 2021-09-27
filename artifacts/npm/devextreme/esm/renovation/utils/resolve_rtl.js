/**
* DevExtreme (esm/renovation/utils/resolve_rtl.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from "../../core/utils/type";
import globalConfig from "../../core/config";
export function resolveRtlEnabled(rtlProp, config) {
  if (rtlProp !== undefined) {
    return rtlProp;
  }

  if ((config === null || config === void 0 ? void 0 : config.rtlEnabled) !== undefined) {
    return config.rtlEnabled;
  }

  return globalConfig().rtlEnabled;
}
export function resolveRtlEnabledDefinition(rtlProp, config) {
  var isPropDefined = isDefined(rtlProp);
  var onlyGlobalDefined = isDefined(globalConfig().rtlEnabled) && !isPropDefined && !isDefined(config === null || config === void 0 ? void 0 : config.rtlEnabled);
  return isPropDefined && rtlProp !== (config === null || config === void 0 ? void 0 : config.rtlEnabled) || onlyGlobalDefined;
}
