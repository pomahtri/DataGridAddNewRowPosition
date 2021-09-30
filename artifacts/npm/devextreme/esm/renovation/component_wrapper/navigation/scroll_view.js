/**
* DevExtreme (esm/renovation/component_wrapper/navigation/scroll_view.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Component from "../common/component";
import { Deferred } from "../../../core/utils/deferred";
export class ScrollViewWrapper extends Component {
  update() {
    var _this$viewRef;

    (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.updateHandler();
    return Deferred().resolve();
  }

  release(preventScrollBottom) {
    this.viewRef.release(preventScrollBottom);
    return Deferred().resolve();
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
