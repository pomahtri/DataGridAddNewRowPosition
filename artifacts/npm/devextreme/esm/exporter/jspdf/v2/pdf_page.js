/**
* DevExtreme (esm/exporter/jspdf/v2/pdf_page.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/type';
export class PdfPage {
  constructor(table) {
    this._tables = isDefined(table) ? [table] : [];
  }

  addTable(table) {
    this._tables.push(table);
  }

}
