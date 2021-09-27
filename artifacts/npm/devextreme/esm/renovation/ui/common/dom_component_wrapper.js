/**
* DevExtreme (esm/renovation/ui/common/dom_component_wrapper.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["itemTemplate", "valueChange"],
    _excluded2 = ["componentProps", "componentType", "rootElementRef"];
import { createVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/runtime/inferno";
import { ConfigContext } from "../../common/config_context";
import { renderTemplate } from "../../utils/render_template";
import { getUpdatedOptions } from "./utils/get_updated_options";
export var viewFunction = _ref => {
  var {
    props: {
      componentProps: {
        className
      }
    },
    restAttributes,
    widgetRef
  } = _ref;
  return normalizeProps(createVNode(1, "div", className, null, 1, _extends({}, restAttributes), null, widgetRef));
};
export var DomComponentWrapperProps = {};
import { createRef as infernoCreateRef } from "inferno";
export class DomComponentWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRef = infernoCreateRef();
    this.getInstance = this.getInstance.bind(this);
    this.setupWidget = this.setupWidget.bind(this);
    this.setRootElementRef = this.setRootElementRef.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
  }

  get config() {
    if ("ConfigContext" in this.context) {
      return this.context.ConfigContext;
    }

    return ConfigContext;
  }

  createEffects() {
    return [new InfernoEffect(this.setupWidget, []), new InfernoEffect(this.setRootElementRef, []), new InfernoEffect(this.updateWidget, [this.props.componentProps, this.config])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[2]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.componentProps, this.config]);
  }

  setupWidget() {
    var componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
    this.instance = componentInstance;
    return () => {
      componentInstance.dispose();
      this.instance = null;
    };
  }

  setRootElementRef() {
    var {
      rootElementRef
    } = this.props;

    if (rootElementRef) {
      rootElementRef.current = this.widgetRef.current;
    }
  }

  updateWidget() {
    var instance = this.getInstance();

    if (!instance) {
      return;
    }

    var updatedOptions = getUpdatedOptions(this.prevProps || {}, this.properties);

    if (updatedOptions.length) {
      instance.beginUpdate();
      updatedOptions.forEach(_ref2 => {
        var {
          path,
          value
        } = _ref2;
        instance.option(path, value);
      });
      instance.endUpdate();
    }

    this.prevProps = this.properties;
  }

  get properties() {
    var _this$config;

    var _this$props$component = this.props.componentProps,
        {
      itemTemplate,
      valueChange
    } = _this$props$component,
        restProps = _objectWithoutPropertiesLoose(_this$props$component, _excluded);

    var properties = _extends({
      rtlEnabled: !!((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled)
    }, restProps);

    if (valueChange) {
      properties.onValueChanged = _ref3 => {
        var {
          value
        } = _ref3;
        return valueChange(value);
      };
    }

    if (itemTemplate) {
      properties.itemTemplate = (item, index, container) => {
        renderTemplate(itemTemplate, {
          item,
          index,
          container
        }, container);
      };
    }

    return properties;
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);

    return restProps;
  }

  getInstance() {
    return this.instance;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRef: this.widgetRef,
      config: this.config,
      properties: this.properties,
      restAttributes: this.restAttributes
    });
  }

}
DomComponentWrapper.defaultProps = DomComponentWrapperProps;
