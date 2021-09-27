/**
* DevExtreme (esm/renovation/component_wrapper/editors/check_box.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor from "./editor";
export default class CheckBox extends Editor {
  _useTemplates() {
    return false;
  }

  getSupportedKeyNames() {
    return ["space"];
  }

}
