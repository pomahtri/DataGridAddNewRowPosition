/**
* DevExtreme (esm/exporter/jspdf/v3/pdf_utils_v3.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/type';
import { extend } from '../../../core/utils/extend';

function round(value) {
  return Math.round(value * 1000) / 1000; // checked with browser zoom - 500%
}

function getTextLines(doc, text, font, _ref) {
  var {
    wordWrapEnabled,
    targetRectWidth
  } = _ref;

  if (wordWrapEnabled) {
    // it also splits text by '\n' automatically
    return doc.splitTextToSize(text, targetRectWidth, {
      fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
    });
  }

  return text.split('\n');
}

function calculateTargetRectWidth(columnWidth, padding) {
  return columnWidth - (padding.left + padding.right);
}

function calculateTextHeight(doc, text, font, _ref2) {
  var {
    wordWrapEnabled,
    targetRectWidth
  } = _ref2;
  var height = doc.getTextDimensions(text, {
    fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
  }).h;
  var linesCount = getTextLines(doc, text, font, {
    wordWrapEnabled,
    targetRectWidth
  }).length;
  return height * linesCount * doc.getLineHeightFactor();
}

function calculateRowHeight(doc, cells, columnWidths) {
  if (cells.length !== columnWidths.length) {
    throw 'the cells count must be equal to the count of the columns';
  }

  var rowHeight = 0;

  for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (isDefined(cells[cellIndex].rowSpan)) {
      // height will be computed at the recalculateHeightForMergedRows step
      continue;
    }

    var cellText = cells[cellIndex].pdfCell.text;
    var cellPadding = cells[cellIndex].pdfCell.padding;
    var font = cells[cellIndex].pdfCell.font;
    var wordWrapEnabled = cells[cellIndex].pdfCell.wordWrapEnabled;
    var columnWidth = columnWidths[cellIndex];
    var targetRectWidth = calculateTargetRectWidth(columnWidth, cellPadding);

    if (isDefined(cellText)) {
      var cellHeight = calculateTextHeight(doc, cellText, font, {
        wordWrapEnabled,
        targetRectWidth
      }) + cellPadding.top + cellPadding.bottom;

      if (rowHeight < cellHeight) {
        rowHeight = cellHeight;
      }
    }
  }

  return rowHeight;
}

function drawLine(doc, startX, startY, endX, endY) {
  doc.line(round(startX), round(startY), round(endX), round(endY));
}

function drawRect(doc, x, y, width, height, style) {
  if (isDefined(style)) {
    doc.rect(round(x), round(y), round(width), round(height), style);
  } else {
    doc.rect(round(x), round(y), round(width), round(height));
  }
}

function getLineHeightShift(doc) {
  var DEFAULT_LINE_HEIGHT = 1.15; // TODO: check lineHeightFactor from text options. Currently supports only doc options - https://github.com/MrRio/jsPDF/issues/3234

  return (doc.getLineHeightFactor() - DEFAULT_LINE_HEIGHT) * doc.getFontSize();
}

function drawTextInRect(doc, text, rect, verticalAlign, wordWrapEnabled, jsPdfTextOptions) {
  var textArray = getTextLines(doc, text, doc.getFont(), {
    wordWrapEnabled,
    targetRectWidth: rect.w
  });
  var linesCount = textArray.length;
  var heightOfOneLine = calculateTextHeight(doc, textArray[0], doc.getFont(), {
    wordWrapEnabled: false
  });
  var vAlign = verticalAlign !== null && verticalAlign !== void 0 ? verticalAlign : 'middle';
  var verticalAlignCoefficientsMap = {
    top: 0,
    middle: 0.5,
    bottom: 1
  };
  var y = rect.y + rect.h * verticalAlignCoefficientsMap[vAlign] - heightOfOneLine * (linesCount - 1) * verticalAlignCoefficientsMap[vAlign] + getLineHeightShift(doc);
  var textOptions = extend({
    baseline: vAlign
  }, jsPdfTextOptions);
  doc.text(textArray.join('\n'), round(rect.x), round(y), textOptions);
}

export { calculateRowHeight, calculateTextHeight, calculateTargetRectWidth, drawLine, drawRect, drawTextInRect };
