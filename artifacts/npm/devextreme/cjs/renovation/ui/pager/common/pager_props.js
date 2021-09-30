/**
* DevExtreme (cjs/renovation/ui/pager/common/pager_props.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.InternalPagerProps = exports.PagerProps = void 0;

var _base_pager_props = require("./base_pager_props");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PagerProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_pager_props.BasePagerProps), Object.getOwnPropertyDescriptors({
  defaultPageSize: 5,
  pageSizeChange: function pageSizeChange() {},
  defaultPageIndex: 1,
  pageIndexChange: function pageIndexChange() {}
})));
exports.PagerProps = PagerProps;
var InternalPagerProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_pager_props.BasePagerProps), Object.getOwnPropertyDescriptors({
  pageSize: 5,
  pageIndex: 1
})));
exports.InternalPagerProps = InternalPagerProps;
