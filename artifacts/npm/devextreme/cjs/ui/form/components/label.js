/**
* DevExtreme (cjs/ui/form/components/label.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.renderLabel = renderLabel;
exports.getLabelWidthByInnerHTML = getLabelWidthByInnerHTML;
exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _type = require("../../../core/utils/type");

var _uiFormLayout_manager = require("../ui.form.layout_manager.utils");

var _constants = require("../constants");

var _excluded = ["innerHTML"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// TODO: exported for tests only
var GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = GET_LABEL_WIDTH_BY_TEXT_CLASS;
var FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
exports.FIELD_ITEM_REQUIRED_MARK_CLASS = FIELD_ITEM_REQUIRED_MARK_CLASS;
var FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
exports.FIELD_ITEM_LABEL_LOCATION_CLASS = FIELD_ITEM_LABEL_LOCATION_CLASS;
var FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = FIELD_ITEM_OPTIONAL_MARK_CLASS;
var FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
exports.FIELD_ITEM_LABEL_TEXT_CLASS = FIELD_ITEM_LABEL_TEXT_CLASS;

function renderLabel(_ref) {
  var text = _ref.text,
      id = _ref.id,
      location = _ref.location,
      alignment = _ref.alignment,
      _ref$labelID = _ref.labelID,
      labelID = _ref$labelID === void 0 ? null : _ref$labelID,
      _ref$markOptions = _ref.markOptions,
      markOptions = _ref$markOptions === void 0 ? {} : _ref$markOptions;

  if (!(0, _type.isDefined)(text) || text.length <= 0) {
    return null;
  }

  return (0, _renderer.default)('<label>').addClass(_constants.FIELD_ITEM_LABEL_CLASS + ' ' + FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr('for', id).attr('id', labelID).css('textAlign', alignment).append((0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS).append((0, _renderer.default)('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS).text(text), _renderLabelMark(markOptions)));
}

function _renderLabelMark(markOptions) {
  var markText = (0, _uiFormLayout_manager.getLabelMarkText)(markOptions);

  if (markText === '') {
    return null;
  }

  return (0, _renderer.default)('<span>').addClass(markOptions.isRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(markText);
}

function getLabelWidthByInnerHTML(options) {
  var innerHTML = options.innerHTML,
      renderLabelOptions = _objectWithoutProperties(options, _excluded);

  var $hiddenContainer = (0, _renderer.default)('<div>').addClass(_constants.WIDGET_CLASS).addClass(GET_LABEL_WIDTH_BY_TEXT_CLASS).appendTo('body');
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
