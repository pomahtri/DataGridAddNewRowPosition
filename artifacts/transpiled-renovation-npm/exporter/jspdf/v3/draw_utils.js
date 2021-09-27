"use strict";

exports.drawCellsContent = drawCellsContent;
exports.drawCellsLines = drawCellsLines;
exports.drawGridLines = drawGridLines;
exports.getDocumentStyles = getDocumentStyles;
exports.setDocumentStyles = setDocumentStyles;

var _type = require("../../../core/utils/type");

var _pdf_utils_v = require("./pdf_utils_v3");

var _extend = require("../../../core/utils/extend");

var defaultBorderLineWidth = 1;

function drawCellsContent(doc, cellsArray, docStyles) {
  cellsArray.forEach(function (cell) {
    drawCellBackground(doc, cell);
    drawCellText(doc, cell, docStyles);
  });
}

function drawCellBackground(doc, cell) {
  if ((0, _type.isDefined)(cell.backgroundColor)) {
    doc.setFillColor(cell.backgroundColor);
    (0, _pdf_utils_v.drawRect)(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h, 'F');
  }
}

function drawCellText(doc, cell, docStyles) {
  if ((0, _type.isDefined)(cell.text) && cell.text !== '') {
    // TODO: use cell.text.trim() ?
    var textColor = cell.textColor,
        font = cell.font,
        _rect = cell._rect,
        padding = cell.padding;
    setTextStyles(doc, {
      textColor: textColor,
      font: font
    }, docStyles);
    var textRect = {
      x: _rect.x + padding.left,
      y: _rect.y + padding.top,
      w: _rect.w - (padding.left + padding.right),
      h: _rect.h - (padding.top + padding.bottom)
    };
    (0, _pdf_utils_v.drawTextInRect)(doc, cell.text, textRect, cell.verticalAlign, cell.wordWrapEnabled, cell.jsPdfTextOptions);
  }
}

function drawCellsLines(doc, cellsArray, docStyles) {
  cellsArray.filter(function (cell) {
    return !(0, _type.isDefined)(cell.borderColor);
  }).forEach(function (cell) {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
  cellsArray.filter(function (cell) {
    return (0, _type.isDefined)(cell.borderColor);
  }).forEach(function (cell) {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
}

function drawGridLines(doc, rect, docStyles) {
  drawBorders(doc, rect, {}, docStyles);
}

function drawBorders(doc, rect, _ref, docStyles) {
  var borderColor = _ref.borderColor,
      _ref$drawLeftBorder = _ref.drawLeftBorder,
      drawLeftBorder = _ref$drawLeftBorder === void 0 ? true : _ref$drawLeftBorder,
      _ref$drawRightBorder = _ref.drawRightBorder,
      drawRightBorder = _ref$drawRightBorder === void 0 ? true : _ref$drawRightBorder,
      _ref$drawTopBorder = _ref.drawTopBorder,
      drawTopBorder = _ref$drawTopBorder === void 0 ? true : _ref$drawTopBorder,
      _ref$drawBottomBorder = _ref.drawBottomBorder,
      drawBottomBorder = _ref$drawBottomBorder === void 0 ? true : _ref$drawBottomBorder;

  if (!(0, _type.isDefined)(rect)) {
    throw 'rect is required';
  }

  if (!drawLeftBorder && !drawRightBorder && !drawTopBorder && !drawBottomBorder) {
    return;
  } else if (drawLeftBorder && drawRightBorder && drawTopBorder && drawBottomBorder) {
    setLinesStyles(doc, {
      borderColor: borderColor
    }, docStyles);
    (0, _pdf_utils_v.drawRect)(doc, rect.x, rect.y, rect.w, rect.h);
  } else {
    setLinesStyles(doc, {
      borderColor: borderColor
    }, docStyles);

    if (drawTopBorder) {
      (0, _pdf_utils_v.drawLine)(doc, rect.x, rect.y, rect.x + rect.w, rect.y); // top
    }

    if (drawLeftBorder) {
      (0, _pdf_utils_v.drawLine)(doc, rect.x, rect.y, rect.x, rect.y + rect.h); // left
    }

    if (drawRightBorder) {
      (0, _pdf_utils_v.drawLine)(doc, rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h); // right
    }

    if (drawBottomBorder) {
      (0, _pdf_utils_v.drawLine)(doc, rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h); // bottom
    }
  }
}

function setTextStyles(doc, _ref2, docStyles) {
  var textColor = _ref2.textColor,
      font = _ref2.font;
  var currentTextColor = (0, _type.isDefined)(textColor) ? textColor : docStyles.textColor;

  if (currentTextColor !== doc.getTextColor()) {
    doc.setTextColor(currentTextColor);
  }

  var currentFont = (0, _type.isDefined)(font) ? (0, _extend.extend)({}, docStyles.font, font) : docStyles.font;
  var docFont = doc.getFont();

  if (currentFont.name !== docFont.fontName || currentFont.style !== docFont.fontStyle || (0, _type.isDefined)(currentFont.weight) // fontWeight logic, https://raw.githack.com/MrRio/jsPDF/master/docs/jspdf.js.html#line4842
  ) {
    doc.setFont(currentFont.name, currentFont.style, currentFont.weight);
  }

  if (currentFont.size !== doc.getFontSize()) {
    doc.setFontSize(currentFont.size);
  }
}

function setLinesStyles(doc, _ref3, docStyles) {
  var borderColor = _ref3.borderColor;
  doc.setLineWidth(defaultBorderLineWidth);
  var currentBorderColor = (0, _type.isDefined)(borderColor) ? borderColor : docStyles.borderColor;

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
  var borderColor = styles.borderColor,
      font = styles.font,
      textColor = styles.textColor;
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