/**
* DevExtreme (esm/renovation/ui/toolbar/toolbar.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "items", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/runtime/inferno";
import LegacyToolbar from "../../../ui/toolbar";
import { DomComponentWrapper } from "../common/dom_component_wrapper";
import { ToolbarProps } from "./toolbar_props";
import { isObject } from "../../../core/utils/type";
import { ConfigContext } from "../../common/config_context";
import { resolveRtlEnabled } from "../../utils/resolve_rtl";
export var viewFunction = _ref => {
  var {
    componentProps,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyToolbar,
    "componentProps": componentProps
  }, restAttributes)));
};
export class Toolbar extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get config() {
    if ("ConfigContext" in this.context) {
      return this.context.ConfigContext;
    }

    return ConfigContext;
  }

  get componentProps() {
    var {
      items
    } = this.props;
    var toolbarItems = items === null || items === void 0 ? void 0 : items.map(item => {
      var _item$options, _options$rtlEnabled;

      if (!isObject(item)) {
        return item;
      }

      var options = (_item$options = item.options) !== null && _item$options !== void 0 ? _item$options : {};
      options.rtlEnabled = (_options$rtlEnabled = options.rtlEnabled) !== null && _options$rtlEnabled !== void 0 ? _options$rtlEnabled : this.resolvedRtlEnabled;
      return _extends({}, item, {
        options
      });
    });
    return _extends({}, this.props, {
      items: toolbarItems
    });
  }

  get resolvedRtlEnabled() {
    var {
      rtlEnabled
    } = this.props;
    return !!resolveRtlEnabled(rtlEnabled, this.config);
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      config: this.config,
      componentProps: this.componentProps,
      resolvedRtlEnabled: this.resolvedRtlEnabled,
      restAttributes: this.restAttributes
    });
  }

}
Toolbar.defaultProps = ToolbarProps;
