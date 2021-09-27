import { isNumeric } from '../../../core/utils/type';

function normalizeOptions(rows) {
  rows.forEach(row => {
    row.cells.forEach(_ref => {
      var {
        pdfCell
      } = _ref;
      normalizePadding(pdfCell); // TODO: normalizeTextColor()
      // TODO: normalizeBackgroundColor()
      // TODO: ...
    });
  });
}

function normalizePadding(pdfCell) {
  if (isNumeric(pdfCell.padding)) {
    var padding = pdfCell.padding;
    pdfCell.padding = {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  } else {
    var _pdfCell$padding$top, _pdfCell$padding$righ, _pdfCell$padding$bott, _pdfCell$padding$left;

    pdfCell.padding.top = (_pdfCell$padding$top = pdfCell.padding.top) !== null && _pdfCell$padding$top !== void 0 ? _pdfCell$padding$top : 0;
    pdfCell.padding.right = (_pdfCell$padding$righ = pdfCell.padding.right) !== null && _pdfCell$padding$righ !== void 0 ? _pdfCell$padding$righ : 0;
    pdfCell.padding.bottom = (_pdfCell$padding$bott = pdfCell.padding.bottom) !== null && _pdfCell$padding$bott !== void 0 ? _pdfCell$padding$bott : 0;
    pdfCell.padding.left = (_pdfCell$padding$left = pdfCell.padding.left) !== null && _pdfCell$padding$left !== void 0 ? _pdfCell$padding$left : 0;
  }
}

export { normalizeOptions };