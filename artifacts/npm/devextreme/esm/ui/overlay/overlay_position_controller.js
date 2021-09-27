/**
* DevExtreme (esm/ui/overlay/overlay_position_controller.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["fullScreen", "forceApplyBindings"],
    _excluded2 = ["shading", "$arrow"];
import $ from '../../core/renderer';
import { isDefined, isString, isEvent, isWindow } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import positionUtils from '../../animation/position';
import { resetPosition, move, locate } from '../../animation/translator';
import { getWindow } from '../../core/utils/window';
import { originalViewPort, value as viewPort } from '../../core/utils/view_port';
import { pairToObject } from '../../core/utils/common';
import { borderWidthStyles } from '../../renovation/ui/resizable/utils';
import { getWidth, getHeight } from '../../core/utils/size';
var window = getWindow();
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
var POPOVER_DEFAULT_BOUNDARY_OFFSET = {
  h: 10,
  v: 10
};

class OverlayPositionController {
  constructor(_ref) {
    var {
      position,
      target,
      container,
      $root,
      $content,
      $wrapper,
      onPositioned,
      onVisualPositionChanged,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor,
      restorePosition,
      _fixWrapperPosition
    } = _ref;
    this._props = {
      position,
      target,
      container,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor,
      restorePosition,
      onPositioned,
      onVisualPositionChanged,
      _fixWrapperPosition
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

  get $dragResizeContainer() {
    return this._$dragResizeContainer;
  }

  get outsideDragFactor() {
    return this._outsideDragFactor;
  }

  set fixWrapperPosition(fixWrapperPosition) {
    this._props._fixWrapperPosition = fixWrapperPosition;
    this.styleWrapperPosition();
  }

  set dragAndResizeArea(dragAndResizeArea) {
    this._props.dragAndResizeArea = dragAndResizeArea;

    this._updateDragResizeContainer();
  }

  set dragOutsideBoundary(dragOutsideBoundary) {
    this._props.dragOutsideBoundary = dragOutsideBoundary;

    this._updateDragResizeContainer();

    this._updateOutsideDragFactor();
  }

  set outsideDragFactor(outsideDragFactor) {
    this._props.outsideDragFactor = outsideDragFactor;

    this._updateOutsideDragFactor();
  }

  set restorePosition(restorePosition) {
    this._props.restorePosition = restorePosition;
  }

  restorePositionOnNextRender(value) {
    // NOTE: no visual position means it's a first render
    this._shouldRenderContentInitialPosition = value || !this._visualPosition;
  }

  openingHandled() {
    var shouldRestorePosition = this._props.restorePosition;
    this.restorePositionOnNextRender(shouldRestorePosition);
  }

  dragHandled() {
    this.restorePositionOnNextRender(false);
  }

  resizeHandled() {
    this.restorePositionOnNextRender(false);
  }

  updateTarget(target) {
    this._props.target = target;
    this.updatePosition(this._props.position, target);
  }

  updatePosition(positionProp) {
    var targetProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.target;
    this._props.position = positionProp;
    this._position = this._normalizePosition(positionProp, targetProp);

    this._updateWrapperCoveredElement();
  }

  updateContainer(containerProp) {
    this._props.container = containerProp;
    var container = containerProp !== null && containerProp !== void 0 ? containerProp : viewPort();

    var $container = this._$root.closest(container);

    if (!$container.length) {
      $container = $(container).first();
    }

    this._$container = $container.length ? $container : this._$root.parent();

    this._updateWrapperCoveredElement();

    this._updateDragResizeContainer();
  }

  detectVisualPositionChange(event) {
    this._updateVisualPositionValue();

    this._raisePositionedEvents(event);
  }

  positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      move(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  }

  positionWrapper() {
    if (this._$wrapperCoveredElement) {
      positionUtils.setup(this._$wrapper, {
        my: 'top left',
        at: 'top left',
        of: this._$wrapperCoveredElement
      });
    }
  }

  isAllWindowCoveredByWrapper() {
    return !this._$wrapperCoveredElement || isWindow(this._$wrapperCoveredElement.get(0));
  }

  styleWrapperPosition() {
    var useFixed = this.isAllWindowCoveredByWrapper() || this._props._fixWrapperPosition;

    var positionStyle = useFixed ? 'fixed' : 'absolute';

    this._$wrapper.css('position', positionStyle);
  }

  _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = locate(this._$content);
  }

  _renderContentInitialPosition() {
    this._renderBoundaryOffset();

    resetPosition(this._$content);
    var resultPosition = positionUtils.setup(this._$content, this._position);
    this._initialPosition = resultPosition;
    this.detectVisualPositionChange();
  }

  _raisePositionedEvents(event) {
    var previousPosition = this._previousVisualPosition;
    var newPosition = this._visualPosition;
    var isVisualPositionChanged = (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.top) !== newPosition.top || (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.left) !== newPosition.left;

    if (isVisualPositionChanged) {
      this._props.onVisualPositionChanged({
        previousPosition: previousPosition,
        position: newPosition,
        event
      });
    }

    this._props.onPositioned({
      position: this._initialPosition
    });
  }

  _updateOutsideDragFactor() {
    this._outsideDragFactor = this._getOutsideDragFactor();
  }

  _getOutsideDragFactor() {
    if (this._props.dragOutsideBoundary) {
      return 1;
    }

    return this._props.outsideDragFactor;
  }

  _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  }

  _getDragResizeContainer() {
    if (this._props.dragOutsideBoundary) {
      return $(window);
    }

    if (this._props.dragAndResizeArea) {
      return $(this._props.dragAndResizeArea);
    }

    var isContainerDefined = originalViewPort().get(0) || this._props.container;

    return isContainerDefined ? this._$container : $(window);
  }

  _updateWrapperCoveredElement() {
    this._$wrapperCoveredElement = this._getWrapperCoveredElement();
  }

  _renderBoundaryOffset() {
    var _this$_position;

    var boundaryOffset = (_this$_position = this._position) !== null && _this$_position !== void 0 ? _this$_position : {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };

    this._$content.css('margin', "".concat(boundaryOffset.v, "px ").concat(boundaryOffset.h, "px"));
  }

  _getWrapperCoveredElement() {
    var containerProp = this._props.container;

    if (containerProp) {
      return $(containerProp);
    }

    if (this._position) {
      return $(isEvent(this._position.of) ? window : this._position.of || window);
    }
  }

  _normalizePosition(positionProp, targetProp) {
    var defaultPositionConfig = {
      of: targetProp,
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };

    if (isDefined(positionProp)) {
      return extend(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    } else {
      return defaultPositionConfig;
    }
  }

  _positionToObject(position) {
    if (isString(position)) {
      return extend({}, OVERLAY_POSITION_ALIASES[position]);
    }

    return position;
  }

}

class PopupPositionController extends OverlayPositionController {
  constructor(_ref2) {
    var {
      fullScreen,
      forceApplyBindings
    } = _ref2,
        args = _objectWithoutPropertiesLoose(_ref2, _excluded);

    super(args);
    this._props = _extends({}, this._props, {
      fullScreen,
      forceApplyBindings
    });
    this._lastPositionBeforeFullScreen = undefined;
  }

  set fullScreen(fullScreen) {
    this._props.fullScreen = fullScreen;

    if (fullScreen) {
      this._fullScreenEnabled();
    } else {
      this._fullScreenDisabled();
    }
  }

  positionContent() {
    if (this._props.fullScreen) {
      move(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      var _this$_props$forceApp, _this$_props;

      (_this$_props$forceApp = (_this$_props = this._props).forceApplyBindings) === null || _this$_props$forceApp === void 0 ? void 0 : _this$_props$forceApp.call(_this$_props);

      if (!this._shouldRenderContentInitialPosition && this._lastPositionBeforeFullScreen) {
        move(this._$content, this._lastPositionBeforeFullScreen);
        this._lastPositionBeforeFullScreen = undefined;
        this.detectVisualPositionChange();
      } else {
        super.positionContent();
      }
    }
  }

  _getWrapperCoveredElement() {
    if (this._props.fullScreen) {
      return $(window);
    }

    return super._getWrapperCoveredElement();
  }

  _fullScreenEnabled() {
    this.restorePositionOnNextRender(false);
    this._lastPositionBeforeFullScreen = this._visualPosition;
  }

  _fullScreenDisabled() {
    this.restorePositionOnNextRender(false);
  }

}

class PopoverPositionController extends OverlayPositionController {
  constructor(_ref3) {
    var {
      shading,
      $arrow
    } = _ref3,
        args = _objectWithoutPropertiesLoose(_ref3, _excluded2);

    super(args);
    this._props = _extends({}, this._props, {
      shading
    });
    this._$arrow = $arrow;
    this._positionSide = undefined;
  }

  positionWrapper() {
    if (this._props.shading) {
      this._$wrapper.css({
        top: 0,
        left: 0
      });
    }
  }

  _renderBoundaryOffset() {}

  _getContainerPosition() {
    var offset = pairToObject(this._position.offset || '');
    var {
      h: hOffset,
      v: vOffset
    } = offset;

    var isVerticalSide = this._isVerticalSide();

    var isHorizontalSide = this._isHorizontalSide();

    if (isVerticalSide || isHorizontalSide) {
      var isPopoverInside = this._isPopoverInside();

      var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
      var arrowSize = isVerticalSide ? getHeight(this._$arrow) : getWidth(this._$arrow);

      var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);

      var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
      isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset;
    }

    return extend({}, this._position, {
      offset: hOffset + ' ' + vOffset
    });
  }

  _getContentBorderWidth(side) {
    var borderWidth = this._$content.css(borderWidthStyles[side]);

    return parseInt(borderWidth) || 0;
  }

  _isPopoverInside() {
    var my = positionUtils.setup.normalizeAlign(this._position.my);
    var at = positionUtils.setup.normalizeAlign(this._position.at);
    return my.h === at.h && my.v === at.v;
  }

  _isVerticalSide() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'top' || side === 'bottom';
  }

  _isHorizontalSide() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'left' || side === 'right';
  }

  _getDisplaySide(position) {
    var my = positionUtils.setup.normalizeAlign(position.my);
    var at = positionUtils.setup.normalizeAlign(position.at);
    var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
    var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
    var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
    return horizontalWeight > verticalWeight ? at.h : at.v;
  }

  _normalizePosition(positionProp, targetProp) {
    var defaultPositionConfig = {
      of: targetProp,
      boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
    };
    var resultPosition;

    if (isDefined(positionProp)) {
      resultPosition = extend(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    } else {
      resultPosition = defaultPositionConfig;
    }

    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  }

  _positionToObject(positionProp) {
    if (isString(positionProp)) {
      return extend({}, POPOVER_POSITION_ALIASES[positionProp]);
    }

    return positionProp;
  }

}

export { OVERLAY_POSITION_ALIASES, OverlayPositionController, PopupPositionController, POPOVER_POSITION_ALIASES, PopoverPositionController };
