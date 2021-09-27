"use strict";

exports.calculateRowHeight = calculateRowHeight;
exports.calculateTextHeight = calculateTextHeight;
exports.calculateTargetRectWidth = calculateTargetRectWidth;
exports.drawLine = drawLine;
exports.drawRect = drawRect;
exports.drawTextInRect = drawTextInRect;

var _type = require("../../../core/utils/type");

var _extend = require("../../../core/utils/extend");

function round(value) {
  return Math.round(value * 1000) / 1000; // checked with browser zoom - 500%
}

function getTextLines(doc, text, font, _ref) {
  var wordWrapEnabled = _ref.wordWrapEnabled,
      targetRectWidth = _ref.targetRectWidth;

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
  var wordWrapEnabled = _ref2.wordWrapEnabled,
      targetRectWidth = _ref2.targetRectWidth;
  var height = doc.getTextDimensions(text, {
    fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
  }).h;
  var linesCount = getTextLines(doc, text, font, {
    wordWrapEnabled: wordWrapEnabled,
    targetRectWidth: targetRectWidth
  }).length;
  return height * linesCount * doc.getLineHeightFactor();
}

function calculateRowHeight(doc, cells, columnWidths) {
  if (cells.length !== columnWidths.length) {
    throw 'the cells count must be equal to the count of the columns';
  }

  var rowHeight = 0;

  for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if ((0, _type.isDefined)(cells[cellIndex].rowSpan)) {
      // height will be computed at the recalculateHeightForMergedRows step
      continue;
    }

    var cellText = cells[cellIndex].pdfCell.text;
    var cellPadding = cells[cellIndex].pdfCell.padding;
    var font = cells[cellIndex].pdfCell.font;
    var wordWrapEnabled = cells[cellIndex].pdfCell.wordWrapEnabled;
    var columnWidth = columnWidths[cellIndex];
    var targetRectWidth = calculateTargetRectWidth(columnWidth, cellPadding);

    if ((0, _type.isDefined)(cellText)) {
      var cellHeight = calculateTextHeight(doc, cellText, font, {
        wordWrapEnabled: wordWrapEnabled,
        targetRectWidth: targetRectWidth
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
  if ((0, _type.isDefined)(style)) {
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
    wordWrapEnabled: wordWrapEnabled,
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
  var textOptions = (0, _extend.extend)({
    baseline: vAlign
  }, jsPdfTextOptions);
  doc.text(textArray.join('\n'), round(rect.x), round(y), textOptions);
}