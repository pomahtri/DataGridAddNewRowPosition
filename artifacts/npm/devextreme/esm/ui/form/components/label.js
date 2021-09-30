/**
* DevExtreme (esm/ui/form/components/label.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["innerHTML"];
import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
import { getLabelMarkText } from '../ui.form.layout_manager.utils';
import { WIDGET_CLASS, FIELD_ITEM_LABEL_CONTENT_CLASS, FIELD_ITEM_LABEL_CLASS } from '../constants'; // TODO: exported for tests only

export var GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
export var FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
export var FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
export var FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
export var FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
export function renderLabel(_ref) {
  var {
    text,
    id,
    location,
    alignment,
    labelID = null,
    markOptions = {}
  } = _ref;

  if (!isDefined(text) || text.length <= 0) {
    return null;
  }

  return $('<label>').addClass(FIELD_ITEM_LABEL_CLASS + ' ' + FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr('for', id).attr('id', labelID).css('textAlign', alignment).append($('<span>').addClass(FIELD_ITEM_LABEL_CONTENT_CLASS).append($('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS).text(text), _renderLabelMark(markOptions)));
}

function _renderLabelMark(markOptions) {
  var markText = getLabelMarkText(markOptions);

  if (markText === '') {
    return null;
  }

  return $('<span>').addClass(markOptions.isRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(markText);
}

export function getLabelWidthByInnerHTML(options) {
  var {
    innerHTML
  } = options,
      renderLabelOptions = _objectWithoutPropertiesLoose(options, _excluded);

  var $hiddenContainer = $('<div>').addClass(WIDGET_CLASS).addClass(GET_LABEL_WIDTH_BY_TEXT_CLASS).appendTo('body');
  renderLabelOptions.text = ' '; // space was in initial PR https://hg/mobile/rev/27b4f57f10bb

  var $label = renderLabel(renderLabelOptions).appendTo($hiddenContainer);
  var labelTextElement = $label.find('.' + FIELD_ITEM_LABEL_TEXT_CLASS)[0]; // this code has slow performance
  // innerHTML was added in https://hg/mobile/rev/3ed89cf230a4 for T350537
  // innerHTML is received from a DOM element (see _getLabelInnerHTML in ui.form.js)

  labelTextElement.innerHTML = innerHTML;
  var result = labelTextElement.offsetWidth;
  $hiddenContainer.remove();
  return result;
}
