/**
* DevExtreme (cjs/exporter/jspdf/v2/pdf_page.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.PdfPage = void 0;

var _type = require("../../../core/utils/type");

var PdfPage = /*#__PURE__*/function () {
  function PdfPage(table) {
    this._tables = (0, _type.isDefined)(table) ? [table] : [];
  }

  var _proto = PdfPage.prototype;

  _proto.addTable = function addTable(table) {
    this._tables.push(table);
  };

  return PdfPage;
}();

exports.PdfPage = PdfPage;
