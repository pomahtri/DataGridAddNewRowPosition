/**
* DevExtreme (esm/renovation/component_wrapper/navigation/scrollable.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Component from "../common/component";
import { Deferred } from "../../../core/utils/deferred";
export class ScrollableWrapper extends Component {
  handleMove(event) {
    this.viewRef.scrollableRef.handleMove(event);
  }

  update() {
    var _this$viewRef;

    (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.updateHandler();
    return Deferred().resolve();
  }

  _visibilityChanged() {}

  $content() {
    return this.$element().find(".dx-scrollable-content").eq(0);
  }

  _moveIsAllowed(event) {
    return this.viewRef.scrollableRef.moveIsAllowed(event);
  }

  _prepareDirections(value) {
    this.viewRef.scrollableRef.prepareDirections(value);
  }

  _optionChanged(option) {
    var {
      name
    } = option;

    if (name === "useNative") {
      this._isNodeReplaced = false;
    }

    super._optionChanged(option);
  }

}
