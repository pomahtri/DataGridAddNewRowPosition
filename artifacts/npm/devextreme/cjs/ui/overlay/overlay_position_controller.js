/**
* DevExtreme (cjs/ui/overlay/overlay_position_controller.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.PopoverPositionController = exports.POPOVER_POSITION_ALIASES = exports.PopupPositionController = exports.OverlayPositionController = exports.OVERLAY_POSITION_ALIASES = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _type = require("../../core/utils/type");

var _extend = require("../../core/utils/extend");

var _position = _interopRequireDefault(require("../../animation/position"));

var _translator = require("../../animation/translator");

var _window = require("../../core/utils/window");

var _view_port = require("../../core/utils/view_port");

var _common = require("../../core/utils/common");

var _utils = require("../../renovation/ui/resizable/utils");

var _size = require("../../core/utils/size");

var _excluded = ["fullScreen", "forceApplyBindings"],
    _excluded2 = ["shading", "$arrow"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var window = (0, _window.getWindow)();
var OVERLAY_POSITION_ALIASES = {
  'top': {
    my: 'top center',
    at: 'top center'
  },
  'bottom': {
    my: 'bottom center',
    at: 'bottom center'
  },
  'right': {
    my: 'right center',
    at: 'right center'
  },
  'left': {
    my: 'left center',
    at: 'left center'
  },
  'center': {
    my: 'center',
    at: 'center'
  },
  'right bottom': {
    my: 'right bottom',
    at: 'right bottom'
  },
  'right top': {
    my: 'right top',
    at: 'right top'
  },
  'left bottom': {
    my: 'left bottom',
    at: 'left bottom'
  },
  'left top': {
    my: 'left top',
    at: 'left top'
  }
};
exports.OVERLAY_POSITION_ALIASES = OVERLAY_POSITION_ALIASES;
var OVERLAY_DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
var WEIGHT_OF_SIDES = {
  'left': -1,
  'top': -1,
  'center': 0,
  'right': 1,
  'bottom': 1
};
var POPOVER_POSITION_ALIASES = {
  // NOTE: public API
  'top': {
    my: 'bottom center',
    at: 'top center',
    collision: 'fit flip'
  },
  'bottom': {
    my: 'top center',
    at: 'bottom center',
    collision: 'fit flip'
  },
  'right': {
    my: 'left center',
    at: 'right center',
    collision: 'flip fit'
  },
  'left': {
    my: 'right center',
    at: 'left center',
    collision: 'flip fit'
  }
};
exports.POPOVER_POSITION_ALIASES = POPOVER_POSITION_ALIASES;
var POPOVER_DEFAULT_BOUNDARY_OFFSET = {
  h: 10,
  v: 10
};

var OverlayPositionController = /*#__PURE__*/function () {
  function OverlayPositionController(_ref) {
    var position = _ref.position,
        target = _ref.target,
        container = _ref.container,
        $root = _ref.$root,
        $content = _ref.$content,
        $wrapper = _ref.$wrapper,
        onPositioned = _ref.onPositioned,
        onVisualPositionChanged = _ref.onVisualPositionChanged,
        dragOutsideBoundary = _ref.dragOutsideBoundary,
        dragAndResizeArea = _ref.dragAndResizeArea,
        outsideDragFactor = _ref.outsideDragFactor,
        restorePosition = _ref.restorePosition,
        _fixWrapperPosition = _ref._fixWrapperPosition;
    this._props = {
      position: position,
      target: target,
      container: container,
      dragOutsideBoundary: dragOutsideBoundary,
      dragAndResizeArea: dragAndResizeArea,
      outsideDragFactor: outsideDragFactor,
      restorePosition: restorePosition,
      onPositioned: onPositioned,
      onVisualPositionChanged: onVisualPositionChanged,
      _fixWrapperPosition: _fixWrapperPosition
    };
    this._$root = $root;
    this._$content = $content;
    this._$wrapper = $wrapper;
    this._shouldRenderContentInitialPosition = true;
    this._visualPosition = undefined;
    this._initialPosition = undefined;
    this._previousVisualPosition = undefined;
    this._$wrapperCoveredElement = undefined;
    this._$dragResizeContainer = undefined;
    this._outsideDragFactor = undefined;
    this.updateContainer(container);
    this.updatePosition(position, target);

    this._updateDragResizeContainer();

    this._updateOutsideDragFactor();
  }

  var _proto = OverlayPositionController.prototype;

  _proto.restorePositionOnNextRender = function restorePositionOnNextRender(value) {
    // NOTE: no visual position means it's a first render
    this._shouldRenderContentInitialPosition = value || !this._visualPosition;
  };

  _proto.openingHandled = function openingHandled() {
    var shouldRestorePosition = this._props.restorePosition;
    this.restorePositionOnNextRender(shouldRestorePosition);
  };

  _proto.dragHandled = function dragHandled() {
    this.restorePositionOnNextRender(false);
  };

  _proto.resizeHandled = function resizeHandled() {
    this.restorePositionOnNextRender(false);
  };

  _proto.updateTarget = function updateTarget(target) {
    this._props.target = target;
    this.updatePosition(this._props.position, target);
  };

  _proto.updatePosition = function updatePosition(positionProp) {
    var targetProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.target;
    this._props.position = positionProp;
    this._position = this._normalizePosition(positionProp, targetProp);

    this._updateWrapperCoveredElement();
  };

  _proto.updateContainer = function updateContainer(containerProp) {
    this._props.container = containerProp;
    var container = containerProp !== null && containerProp !== void 0 ? containerProp : (0, _view_port.value)();

    var $container = this._$root.closest(container);

    if (!$container.length) {
      $container = (0, _renderer.default)(container).first();
    }

    this._$container = $container.length ? $container : this._$root.parent();

    this._updateWrapperCoveredElement();

    this._updateDragResizeContainer();
  };

  _proto.detectVisualPositionChange = function detectVisualPositionChange(event) {
    this._updateVisualPositionValue();

    this._raisePositionedEvents(event);
  };

  _proto.positionContent = function positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      (0, _translator.move)(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  };

  _proto.positionWrapper = function positionWrapper() {
    if (this._$wrapperCoveredElement) {
      _position.default.setup(this._$wrapper, {
        my: 'top left',
        at: 'top left',
        of: this._$wrapperCoveredElement
      });
    }
  };

  _proto.isAllWindowCoveredByWrapper = function isAllWindowCoveredByWrapper() {
    return !this._$wrapperCoveredElement || (0, _type.isWindow)(this._$wrapperCoveredElement.get(0));
  };

  _proto.styleWrapperPosition = function styleWrapperPosition() {
    var useFixed = this.isAllWindowCoveredByWrapper() || this._props._fixWrapperPosition;

    var positionStyle = useFixed ? 'fixed' : 'absolute';

    this._$wrapper.css('position', positionStyle);
  };

  _proto._updateVisualPositionValue = function _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = (0, _translator.locate)(this._$content);
  };

  _proto._renderContentInitialPosition = function _renderContentInitialPosition() {
    this._renderBoundaryOffset();

    (0, _translator.resetPosition)(this._$content);

    var resultPosition = _position.default.setup(this._$content, this._position);

    this._initialPosition = resultPosition;
    this.detectVisualPositionChange();
  };

  _proto._raisePositionedEvents = function _raisePositionedEvents(event) {
    var previousPosition = this._previousVisualPosition;
    var newPosition = this._visualPosition;
    var isVisualPositionChanged = (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.top) !== newPosition.top || (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.left) !== newPosition.left;

    if (isVisualPositionChanged) {
      this._props.onVisualPositionChanged({
        previousPosition: previousPosition,
        position: newPosition,
        event: event
      });
    }

    this._props.onPositioned({
      position: this._initialPosition
    });
  };

  _proto._updateOutsideDragFactor = function _updateOutsideDragFactor() {
    this._outsideDragFactor = this._getOutsideDragFactor();
  };

  _proto._getOutsideDragFactor = function _getOutsideDragFactor() {
    if (this._props.dragOutsideBoundary) {
      return 1;
    }

    return this._props.outsideDragFactor;
  };

  _proto._updateDragResizeContainer = function _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  };

  _proto._getDragResizeContainer = function _getDragResizeContainer() {
    if (this._props.dragOutsideBoundary) {
      return (0, _renderer.default)(window);
    }

    if (this._props.dragAndResizeArea) {
      return (0, _renderer.default)(this._props.dragAndResizeArea);
    }

    var isContainerDefined = (0, _view_port.originalViewPort)().get(0) || this._props.container;

    return isContainerDefined ? this._$container : (0, _renderer.default)(window);
  };

  _proto._updateWrapperCoveredElement = function _updateWrapperCoveredElement() {
    this._$wrapperCoveredElement = this._getWrapperCoveredElement();
  };

  _proto._renderBoundaryOffset = function _renderBoundaryOffset() {
    var _this$_position;

    var boundaryOffset = (_this$_position = this._position) !== null && _this$_position !== void 0 ? _this$_position : {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };

    this._$content.css('margin', "".concat(boundaryOffset.v, "px ").concat(boundaryOffset.h, "px"));
  };

  _proto._getWrapperCoveredElement = function _getWrapperCoveredElement() {
    var containerProp = this._props.container;

    if (containerProp) {
      return (0, _renderer.default)(containerProp);
    }

    if (this._position) {
      return (0, _renderer.default)((0, _type.isEvent)(this._position.of) ? window : this._position.of || window);
    }
  };

  _proto._normalizePosition = function _normalizePosition(positionProp, targetProp) {
    var defaultPositionConfig = {
      of: targetProp,
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };

    if ((0, _type.isDefined)(positionProp)) {
      return (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    } else {
      return defaultPositionConfig;
    }
  };

  _proto._positionToObject = function _positionToObject(position) {
    if ((0, _type.isString)(position)) {
      return (0, _extend.extend)({}, OVERLAY_POSITION_ALIASES[position]);
    }

    return position;
  };

  _createClass(OverlayPositionController, [{
    key: "$dragResizeContainer",
    get: function get() {
      return this._$dragResizeContainer;
    }
  }, {
    key: "outsideDragFactor",
    get: function get() {
      return this._outsideDragFactor;
    },
    set: function set(outsideDragFactor) {
      this._props.outsideDragFactor = outsideDragFactor;

      this._updateOutsideDragFactor();
    }
  }, {
    key: "fixWrapperPosition",
    set: function set(fixWrapperPosition) {
      this._props._fixWrapperPosition = fixWrapperPosition;
      this.styleWrapperPosition();
    }
  }, {
    key: "dragAndResizeArea",
    set: function set(dragAndResizeArea) {
      this._props.dragAndResizeArea = dragAndResizeArea;

      this._updateDragResizeContainer();
    }
  }, {
    key: "dragOutsideBoundary",
    set: function set(dragOutsideBoundary) {
      this._props.dragOutsideBoundary = dragOutsideBoundary;

      this._updateDragResizeContainer();

      this._updateOutsideDragFactor();
    }
  }, {
    key: "restorePosition",
    set: function set(restorePosition) {
      this._props.restorePosition = restorePosition;
    }
  }]);

  return OverlayPositionController;
}();

exports.OverlayPositionController = OverlayPositionController;

var PopupPositionController = /*#__PURE__*/function (_OverlayPositionContr) {
  _inheritsLoose(PopupPositionController, _OverlayPositionContr);

  function PopupPositionController(_ref2) {
    var _this;

    var fullScreen = _ref2.fullScreen,
        forceApplyBindings = _ref2.forceApplyBindings,
        args = _objectWithoutProperties(_ref2, _excluded);

    _this = _OverlayPositionContr.call(this, args) || this;
    _this._props = _extends({}, _this._props, {
      fullScreen: fullScreen,
      forceApplyBindings: forceApplyBindings
    });
    _this._lastPositionBeforeFullScreen = undefined;
    return _this;
  }

  var _proto2 = PopupPositionController.prototype;

  _proto2.positionContent = function positionContent() {
    if (this._props.fullScreen) {
      (0, _translator.move)(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      var _this$_props$forceApp, _this$_props;

      (_this$_props$forceApp = (_this$_props = this._props).forceApplyBindings) === null || _this$_props$forceApp === void 0 ? void 0 : _this$_props$forceApp.call(_this$_props);

      if (!this._shouldRenderContentInitialPosition && this._lastPositionBeforeFullScreen) {
        (0, _translator.move)(this._$content, this._lastPositionBeforeFullScreen);
        this._lastPositionBeforeFullScreen = undefined;
        this.detectVisualPositionChange();
      } else {
        _OverlayPositionContr.prototype.positionContent.call(this);
      }
    }
  };

  _proto2._getWrapperCoveredElement = function _getWrapperCoveredElement() {
    if (this._props.fullScreen) {
      return (0, _renderer.default)(window);
    }

    return _OverlayPositionContr.prototype._getWrapperCoveredElement.call(this);
  };

  _proto2._fullScreenEnabled = function _fullScreenEnabled() {
    this.restorePositionOnNextRender(false);
    this._lastPositionBeforeFullScreen = this._visualPosition;
  };

  _proto2._fullScreenDisabled = function _fullScreenDisabled() {
    this.restorePositionOnNextRender(false);
  };

  _createClass(PopupPositionController, [{
    key: "fullScreen",
    set: function set(fullScreen) {
      this._props.fullScreen = fullScreen;

      if (fullScreen) {
        this._fullScreenEnabled();
      } else {
        this._fullScreenDisabled();
      }
    }
  }]);

  return PopupPositionController;
}(OverlayPositionController);

exports.PopupPositionController = PopupPositionController;

var PopoverPositionController = /*#__PURE__*/function (_OverlayPositionContr2) {
  _inheritsLoose(PopoverPositionController, _OverlayPositionContr2);

  function PopoverPositionController(_ref3) {
    var _this2;

    var shading = _ref3.shading,
        $arrow = _ref3.$arrow,
        args = _objectWithoutProperties(_ref3, _excluded2);

    _this2 = _OverlayPositionContr2.call(this, args) || this;
    _this2._props = _extends({}, _this2._props, {
      shading: shading
    });
    _this2._$arrow = $arrow;
    _this2._positionSide = undefined;
    return _this2;
  }

  var _proto3 = PopoverPositionController.prototype;

  _proto3.positionWrapper = function positionWrapper() {
    if (this._props.shading) {
      this._$wrapper.css({
        top: 0,
        left: 0
      });
    }
  };

  _proto3._renderBoundaryOffset = function _renderBoundaryOffset() {};

  _proto3._getContainerPosition = function _getContainerPosition() {
    var offset = (0, _common.pairToObject)(this._position.offset || '');
    var hOffset = offset.h,
        vOffset = offset.v;

    var isVerticalSide = this._isVerticalSide();

    var isHorizontalSide = this._isHorizontalSide();

    if (isVerticalSide || isHorizontalSide) {
      var isPopoverInside = this._isPopoverInside();

      var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
      var arrowSize = isVerticalSide ? (0, _size.getHeight)(this._$arrow) : (0, _size.getWidth)(this._$arrow);

      var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);

      var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
      isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset;
    }

    return (0, _extend.extend)({}, this._position, {
      offset: hOffset + ' ' + vOffset
    });
  };

  _proto3._getContentBorderWidth = function _getContentBorderWidth(side) {
    var borderWidth = this._$content.css(_utils.borderWidthStyles[side]);

    return parseInt(borderWidth) || 0;
  };

  _proto3._isPopoverInside = function _isPopoverInside() {
    var my = _position.default.setup.normalizeAlign(this._position.my);

    var at = _position.default.setup.normalizeAlign(this._position.at);

    return my.h === at.h && my.v === at.v;
  };

  _proto3._isVerticalSide = function _isVerticalSide() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'top' || side === 'bottom';
  };

  _proto3._isHorizontalSide = function _isHorizontalSide() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'left' || side === 'right';
  };

  _proto3._getDisplaySide = function _getDisplaySide(position) {
    var my = _position.default.setup.normalizeAlign(position.my);

    var at = _position.default.setup.normalizeAlign(position.at);

    var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
    var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
    var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
    return horizontalWeight > verticalWeight ? at.h : at.v;
  };

  _proto3._normalizePosition = function _normalizePosition(positionProp, targetProp) {
    var defaultPositionConfig = {
      of: targetProp,
      boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
    };
    var resultPosition;

    if ((0, _type.isDefined)(positionProp)) {
      resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    } else {
      resultPosition = defaultPositionConfig;
    }

    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  };

  _proto3._positionToObject = function _positionToObject(positionProp) {
    if ((0, _type.isString)(positionProp)) {
      return (0, _extend.extend)({}, POPOVER_POSITION_ALIASES[positionProp]);
    }

    return positionProp;
  };

  return PopoverPositionController;
}(OverlayPositionController);

exports.PopoverPositionController = PopoverPositionController;
