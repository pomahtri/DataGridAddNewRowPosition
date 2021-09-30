"use strict";

exports.convertToRenderFieldItemOptions = convertToRenderFieldItemOptions;
exports.getLabelMarkText = getLabelMarkText;
exports.convertToLabelMarkOptions = convertToLabelMarkOptions;

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _iterator = require("../../core/utils/iterator");

var _inflector = require("../../core/utils/inflector");

var _array = require("../../core/utils/array");

var _guid = _interopRequireDefault(require("../../core/guid"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider'];

function convertToRenderFieldItemOptions(_ref) {
  var $parent = _ref.$parent,
      rootElementCssClassList = _ref.rootElementCssClassList,
      parentComponent = _ref.parentComponent,
      createComponentCallback = _ref.createComponentCallback,
      useFlexLayout = _ref.useFlexLayout,
      item = _ref.item,
      template = _ref.template,
      name = _ref.name,
      formLabelLocation = _ref.formLabelLocation,
      requiredMessageTemplate = _ref.requiredMessageTemplate,
      validationGroup = _ref.validationGroup,
      editorValue = _ref.editorValue,
      canAssignUndefinedValueToEditor = _ref.canAssignUndefinedValueToEditor,
      editorValidationBoundary = _ref.editorValidationBoundary,
      editorStylingMode = _ref.editorStylingMode,
      showColonAfterLabel = _ref.showColonAfterLabel,
      managerLabelLocation = _ref.managerLabelLocation,
      itemId = _ref.itemId,
      managerMarkOptions = _ref.managerMarkOptions,
      labelMode = _ref.labelMode;
  var isRequired = (0, _type.isDefined)(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  var isSimpleItem = item.itemType === _constants.SIMPLE_ITEM_TYPE;
  var helpID = item.helpText ? 'dx-' + new _guid.default() : null;
  var helpText = item.helpText;

  var labelOptions = _convertToLabelOptions({
    item: item,
    id: itemId,
    isRequired: isRequired,
    managerMarkOptions: managerMarkOptions,
    showColonAfterLabel: showColonAfterLabel,
    labelLocation: managerLabelLocation
  });

  var isDefaultLabelMode = labelMode === 'default';
  var needRenderLabel = labelOptions.visible && labelOptions.text && isDefaultLabelMode;
  var labelLocation = labelOptions.location,
      labelID = labelOptions.labelID;
  var labelNeedBaselineAlign = labelLocation !== 'top' && (!!item.helpText && !useFlexLayout || (0, _array.inArray)(item.editorType, ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor']) !== -1);
  return {
    $parent: $parent,
    rootElementCssClassList: rootElementCssClassList,
    parentComponent: parentComponent,
    createComponentCallback: createComponentCallback,
    useFlexLayout: useFlexLayout,
    labelOptions: labelOptions,
    labelNeedBaselineAlign: labelNeedBaselineAlign,
    labelLocation: labelLocation,
    needRenderLabel: needRenderLabel,
    item: item,
    isSimpleItem: isSimpleItem,
    isRequired: isRequired,
    template: template,
    helpID: helpID,
    labelID: labelID,
    name: name,
    helpText: helpText,
    formLabelLocation: formLabelLocation,
    requiredMessageTemplate: requiredMessageTemplate,
    validationGroup: validationGroup,
    editorOptions: _convertToEditorOptions({
      editorType: item.editorType,
      editorValue: editorValue,
      defaultEditorName: item.dataField,
      canAssignUndefinedValueToEditor: canAssignUndefinedValueToEditor,
      externalEditorOptions: item.editorOptions,
      editorInputId: itemId,
      editorValidationBoundary: editorValidationBoundary,
      editorStylingMode: editorStylingMode,
      labelMode: isDefaultLabelMode ? 'hidden' : labelMode,
      labelText: isDefaultLabelMode ? undefined : labelOptions.text,
      labelMark: getLabelMarkText(labelOptions.markOptions)
    })
  };
}

function getLabelMarkText(_ref2) {
  var isRequiredMark = _ref2.isRequiredMark,
      requiredMark = _ref2.requiredMark,
      isOptionalMark = _ref2.isOptionalMark,
      optionalMark = _ref2.optionalMark;

  if (!isRequiredMark && !isOptionalMark) {
    return '';
  }

  return String.fromCharCode(160) + (isRequiredMark ? requiredMark : optionalMark);
}

function convertToLabelMarkOptions(_ref3, isRequired) {
  var showRequiredMark = _ref3.showRequiredMark,
      requiredMark = _ref3.requiredMark,
      showOptionalMark = _ref3.showOptionalMark,
      optionalMark = _ref3.optionalMark;
  return {
    isRequiredMark: showRequiredMark && isRequired,
    requiredMark: requiredMark,
    isOptionalMark: showOptionalMark && !isRequired,
    optionalMark: optionalMark
  };
}

function _convertToEditorOptions(_ref4) {
  var editorType = _ref4.editorType,
      defaultEditorName = _ref4.defaultEditorName,
      editorValue = _ref4.editorValue,
      canAssignUndefinedValueToEditor = _ref4.canAssignUndefinedValueToEditor,
      externalEditorOptions = _ref4.externalEditorOptions,
      editorInputId = _ref4.editorInputId,
      editorValidationBoundary = _ref4.editorValidationBoundary,
      editorStylingMode = _ref4.editorStylingMode,
      labelMode = _ref4.labelMode,
      labelText = _ref4.labelText,
      labelMark = _ref4.labelMark;
  var editorOptionsWithValue = {};

  if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }

  if (EDITORS_WITH_ARRAY_VALUE.indexOf(editorType) !== -1) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }

  var result = (0, _extend.extend)(true, editorOptionsWithValue, externalEditorOptions, {
    inputAttr: {
      id: editorInputId
    },
    validationBoundary: editorValidationBoundary,
    stylingMode: editorStylingMode,
    label: labelText,
    labelMode: labelMode,
    labelMark: labelMark
  });

  if (externalEditorOptions) {
    if (result.dataSource) {
      result.dataSource = externalEditorOptions.dataSource;
    }

    if (result.items) {
      result.items = externalEditorOptions.items;
    }
  }

  if (defaultEditorName && !result.name) {
    result.name = defaultEditorName;
  }

  return result;
}

function _hasRequiredRuleInSet(rules) {
  var hasRequiredRule;

  if (rules && rules.length) {
    (0, _iterator.each)(rules, function (index, rule) {
      if (rule.type === 'required') {
        hasRequiredRule = true;
        return false;
      }
    });
  }

  return hasRequiredRule;
}

function _convertToLabelOptions(_ref5) {
  var item = _ref5.item,
      id = _ref5.id,
      isRequired = _ref5.isRequired,
      managerMarkOptions = _ref5.managerMarkOptions,
      showColonAfterLabel = _ref5.showColonAfterLabel,
      labelLocation = _ref5.labelLocation;
  var labelOptions = (0, _extend.extend)({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id: id,
    visible: true,
    isRequired: isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired)
  });
  var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor']; // TODO: support "dxCalendar"

  if ((0, _array.inArray)(item.editorType, editorsRequiringIdForLabel) !== -1) {
    labelOptions.labelID = "dx-label-".concat(new _guid.default());
  }

  if (!labelOptions.text && item.dataField) {
    labelOptions.text = (0, _inflector.captionize)(item.dataField);
  }

  if (labelOptions.text) {
    labelOptions.text += labelOptions.showColon ? ':' : '';
  }

  return labelOptions;
}