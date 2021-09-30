/**
* DevExtreme (esm/core/http_request.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWindow } from './utils/window';
var window = getWindow();
import injector from './utils/dependency_injector';
var nativeXMLHttpRequest = {
  getXhr: function getXhr() {
    return new window.XMLHttpRequest();
  }
};
export default injector(nativeXMLHttpRequest);
