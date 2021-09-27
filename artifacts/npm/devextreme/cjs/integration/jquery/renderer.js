/**
* DevExtreme (cjs/integration/jquery/renderer.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _renderer_base = _interopRequireDefault(require("../../core/renderer_base"));

var _use_jquery = _interopRequireDefault(require("./use_jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-restricted-imports
var useJQuery = (0, _use_jquery.default)();

if (useJQuery) {
  _renderer_base.default.set(_jquery.default);
}
