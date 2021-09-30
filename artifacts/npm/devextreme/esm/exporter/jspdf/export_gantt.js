/**
* DevExtreme (esm/exporter/jspdf/export_gantt.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
function exportGantt(options) {
  var component = options.component;
  return component === null || component === void 0 ? void 0 : component.exportToPdf(options);
}

export { exportGantt };
