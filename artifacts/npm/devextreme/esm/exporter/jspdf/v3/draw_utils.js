/**
* DevExtreme (esm/exporter/jspdf/v3/draw_utils.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/type';
import { drawTextInRect, drawLine, drawRect } from './pdf_utils_v3';
import { extend } from '../../../core/utils/extend';
var defaultBorderLineWidth = 1;

function drawCellsContent(doc, cellsArray, docStyles) {
  cellsArray.forEach(cell => {
    drawCellBackground(doc, cell);
    drawCellText(doc, cell, docStyles);
  });
}

function drawCellBackground(doc, cell) {
  if (isDefined(cell.backgroundColor)) {
    doc.setFillColor(cell.backgroundColor);
    drawRect(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h, 'F');
  }
}

function drawCellText(doc, cell, docStyles) {
  if (isDefined(cell.text) && cell.text !== '') {
    // TODO: use cell.text.trim() ?
    var {
      textColor,
      font,
      _rect,
      padding
    } = cell;
    setTextStyles(doc, {
      textColor,
      font
    }, docStyles);
    var textRect = {
      x: _rect.x + padding.left,
      y: _rect.y + padding.top,
      w: _rect.w - (padding.left + padding.right),
      h: _rect.h - (padding.top + padding.bottom)
    };
    drawTextInRect(doc, cell.text, textRect, cell.verticalAlign, cell.wordWrapEnabled, cell.jsPdfTextOptions);
  }
}

function drawCellsLines(doc, cellsArray, docStyles) {
  cellsArray.filter(cell => !isDefined(cell.borderColor)).forEach(cell => {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
  cellsArray.filter(cell => isDefined(cell.borderColor)).forEach(cell => {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
}

function drawGridLines(doc, rect, docStyles) {
  drawBorders(doc, rect, {}, docStyles);
}

function drawBorders(doc, rect, _ref, docStyles) {
  var {
    borderColor,
    drawLeftBorder = true,
    drawRightBorder = true,
    drawTopBorder = true,
    drawBottomBorder = true
  } = _ref;

  if (!isDefined(rect)) {
    throw 'rect is required';
  }

  if (!drawLeftBorder && !drawRightBorder && !drawTopBorder && !drawBottomBorder) {
    return;
  } else if (drawLeftBorder && drawRightBorder && drawTopBorder && drawBottomBorder) {
    setLinesStyles(doc, {
      borderColor
    }, docStyles);
    drawRect(doc, rect.x, rect.y, rect.w, rect.h);
  } else {
    setLinesStyles(doc, {
      borderColor
    }, docStyles);

    if (drawTopBorder) {
      drawLine(doc, rect.x, rect.y, rect.x + rect.w, rect.y); // top
    }

    if (drawLeftBorder) {
      drawLine(doc, rect.x, rect.y, rect.x, rect.y + rect.h); // left
    }

    if (drawRightBorder) {
      drawLine(doc, rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h); // right
    }

    if (drawBottomBorder) {
      drawLine(doc, rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h); // bottom
    }
  }
}

function setTextStyles(doc, _ref2, docStyles) {
  var {
    textColor,
    font
  } = _ref2;
  var currentTextColor = isDefined(textColor) ? textColor : docStyles.textColor;

  if (currentTextColor !== doc.getTextColor()) {
    doc.setTextColor(currentTextColor);
  }

  var currentFont = isDefined(font) ? extend({}, docStyles.font, font) : docStyles.font;
  var docFont = doc.getFont();

  if (currentFont.name !== docFont.fontName || currentFont.style !== docFont.fontStyle || isDefined(currentFont.weight) // fontWeight logic, https://raw.githack.com/MrRio/jsPDF/master/docs/jspdf.js.html#line4842
  ) {
    doc.setFont(currentFont.name, currentFont.style, currentFont.weight);
  }

  if (currentFont.size !== doc.getFontSize()) {
    doc.setFontSize(currentFont.size);
  }
}

function setLinesStyles(doc, _ref3, docStyles) {
  var {
    borderColor
  } = _ref3;
  doc.setLineWidth(defaultBorderLineWidth);
  var currentBorderColor = isDefined(borderColor) ? borderColor : docStyles.borderColor;

  if (currentBorderColor !== doc.getDrawColor()) {
    doc.setDrawColor(currentBorderColor);
  }
}

function getDocumentStyles(doc) {
  var docFont = doc.getFont();
  return {
    borderColor: doc.getDrawColor(),
    font: {
      name: docFont.fontName,
      style: docFont.fontStyle,
      size: doc.getFontSize()
    },
    textColor: doc.getTextColor()
  };
}

function setDocumentStyles(doc, styles) {
  var {
    borderColor,
    font,
    textColor
  } = styles;
  var docFont = doc.getFont();

  if (docFont.fontName !== font.name || docFont.fontStyle !== font.style) {
    doc.setFont(font.name, font.style, undefined);
  }

  var docFontSize = doc.getFontSize();

  if (docFontSize !== font.size) {
    doc.setFontSize(font.size);
  }

  if (doc.getDrawColor() !== borderColor) {
    doc.setDrawColor(borderColor);
  }

  if (doc.getTextColor() !== textColor) {
    doc.setTextColor(textColor);
  }
}

export { drawCellsContent, drawCellsLines, drawGridLines, getDocumentStyles, setDocumentStyles };
