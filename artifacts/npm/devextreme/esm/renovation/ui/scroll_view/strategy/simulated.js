/**
* DevExtreme (esm/renovation/ui/scroll_view/strategy/simulated.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addWidgetClass", "aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needRenderScrollbars", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onUpdated", "onVisibilityChange", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshStrategy", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "useKeyboard", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent, normalizeStyles } from "@devextreme/runtime/inferno";
import "../../../../events/gesture/emitter.gesture.scroll";
import { subscribeToScrollEvent, subscribeToScrollInitEvent, subscribeToDXScrollStartEvent, subscribeToDXScrollMoveEvent, subscribeToDXScrollEndEvent, subscribeToDXScrollStopEvent, subscribeToDXScrollCancelEvent, subscribeToMouseEnterEvent, subscribeToMouseLeaveEvent } from "../../../utils/subscribe_to_event";
import { ScrollViewLoadPanel } from "../internal/load_panel";
import { AnimatedScrollbar } from "../scrollbar/animated_scrollbar";
import { Widget } from "../../common/widget";
import { combineClasses } from "../../../utils/combine_classes";
import { getOffsetDistance } from "../utils/get_offset_distance";
import { getBoundaryProps } from "../utils/get_boundary_props";
import { permissibleWheelDirection } from "../utils/get_permissible_wheel_direction";
import { isDxMouseWheelEvent, normalizeKeyName, isCommandKeyPressed } from "../../../../events/utils/index";
import { isDefined } from "../../../../core/utils/type";
import { ScrollableSimulatedProps } from "../common/simulated_strategy_props";
import eventsEngine from "../../../../events/core/events_engine";
import { ScrollDirection } from "../utils/scroll_direction";
import { DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, SCROLLABLE_SIMULATED_CLASS, SCROLLABLE_CONTAINER_CLASS, SCROLLABLE_CONTENT_CLASS, SCROLLABLE_WRAPPER_CLASS, SCROLLVIEW_CONTENT_CLASS, SCROLLABLE_DISABLED_CLASS, SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, SCROLL_LINE_HEIGHT, SCROLLABLE_SCROLLBAR_CLASS, KEY_CODES, VALIDATE_WHEEL_TIMEOUT, TopPocketState, DIRECTION_BOTH } from "../common/consts";
import { getElementOffset } from "../../../utils/get_element_offset";
import { getElementPadding, getElementOverflowX, getElementOverflowY } from "../utils/get_element_style";
import { TopPocket } from "../internal/pocket/top";
import { BottomPocket } from "../internal/pocket/bottom";
import { getDevicePixelRatio } from "../utils/get_device_pixel_ratio";
import { isVisible } from "../utils/is_element_visible";
import { getTranslateValues } from "../utils/get_translate_values";
import { clampIntoRange } from "../utils/clamp_into_range";
import { allowedDirection } from "../utils/get_allowed_direction";
import { subscribeToResize } from "../utils/subscribe_to_resize";
import { getBoundingRect } from "../utils/get_bounding_rect";
export var viewFunction = viewModel => {
  var {
    bottomPocketHeight,
    bottomPocketRef,
    containerClientHeight,
    containerClientWidth,
    containerHasSizes,
    containerRef,
    containerStyles,
    contentHeight,
    contentPaddingBottom,
    contentRef,
    contentStyles,
    contentWidth,
    cssClasses,
    direction,
    hScrollLocation,
    hScrollOffsetMax,
    hScrollbarRef,
    handleKeyDown,
    hovered,
    isLoadPanelVisible,
    lock,
    onBounce,
    onEnd,
    onPullDown,
    onReachBottom,
    onRelease,
    onVisibilityChangeHandler,
    props: {
      aria,
      bounceEnabled,
      children,
      disabled,
      forceGeneratePockets,
      height,
      inertiaEnabled,
      needRenderScrollbars,
      needScrollViewContentWrapper,
      needScrollViewLoadPanel,
      pullDownEnabled,
      pulledDownText,
      pullingDownText,
      reachBottomEnabled,
      reachBottomText,
      refreshStrategy,
      refreshingText,
      rtlEnabled,
      scrollByThumb,
      showScrollbar,
      useKeyboard,
      visible,
      width
    },
    pulledDown,
    restAttributes,
    scrollLocationChange,
    scrollViewContentRef,
    scrollableRef,
    scrolling,
    topPocketRef,
    topPocketState,
    unlock,
    vScrollLocation,
    vScrollOffsetMax,
    vScrollOffsetMin,
    vScrollbarRef,
    wrapperRef
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": scrollableRef,
    "focusStateEnabled": useKeyboard,
    "aria": aria,
    "addWidgetClass": false,
    "classes": cssClasses,
    "disabled": disabled,
    "rtlEnabled": rtlEnabled,
    "height": height,
    "width": width,
    "visible": visible,
    "onVisibilityChange": onVisibilityChangeHandler
  }, restAttributes, {
    "onKeyDown": useKeyboard ? handleKeyDown : undefined,
    children: [createVNode(1, "div", SCROLLABLE_WRAPPER_CLASS, createVNode(1, "div", SCROLLABLE_CONTAINER_CLASS, [createVNode(1, "div", SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && createComponentVNode(2, TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "refreshStrategy": refreshStrategy,
      "pocketState": topPocketState,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? createVNode(1, "div", SCROLLVIEW_CONTENT_CLASS, children, 0, null, null, scrollViewContentRef) : children, forceGeneratePockets && createComponentVNode(2, BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, {
      "style": normalizeStyles(contentStyles)
    }, null, contentRef), needRenderScrollbars && direction.isHorizontal && createComponentVNode(2, AnimatedScrollbar, {
      "direction": "horizontal",
      "contentSize": contentWidth,
      "containerSize": containerClientWidth,
      "visible": hovered || scrolling,
      "minOffset": 0,
      "maxOffset": hScrollOffsetMax,
      "scrollLocation": hScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onEnd": onEnd,
      "rtlEnabled": rtlEnabled,
      "containerHasSizes": containerHasSizes
    }, null, hScrollbarRef), needRenderScrollbars && direction.isVertical && createComponentVNode(2, AnimatedScrollbar, {
      "direction": "vertical",
      "contentSize": contentHeight,
      "containerSize": containerClientHeight,
      "visible": hovered || scrolling,
      "minOffset": vScrollOffsetMin,
      "maxOffset": vScrollOffsetMax,
      "scrollLocation": vScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onEnd": onEnd,
      "containerHasSizes": containerHasSizes,
      "forceGeneratePockets": forceGeneratePockets,
      "bottomPocketSize": bottomPocketHeight,
      "contentPaddingBottom": contentPaddingBottom,
      "pulledDown": pulledDown,
      "onPullDown": onPullDown,
      "onRelease": onRelease,
      "onReachBottom": onReachBottom,
      "pullDownEnabled": pullDownEnabled,
      "reachBottomEnabled": reachBottomEnabled,
      "onLock": lock,
      "onUnlock": unlock
    }, null, vScrollbarRef)], 0, {
      "style": normalizeStyles(containerStyles)
    }, null, containerRef), 2, null, null, wrapperRef), needScrollViewLoadPanel && createComponentVNode(2, ScrollViewLoadPanel, {
      "targetElement": scrollableRef,
      "refreshingText": refreshingText,
      "visible": isLoadPanelVisible
    })]
  })));
};
import { createRef as infernoCreateRef } from "inferno";
export class ScrollableSimulated extends InfernoComponent {
  constructor(props) {
    super(props);
    this.locked = false;
    this.loadingIndicatorEnabled = true;
    this.validDirections = {};
    this.endActionDirections = {
      horizontal: false,
      vertical: false
    };
    this.scrollableRef = infernoCreateRef();
    this.wrapperRef = infernoCreateRef();
    this.contentRef = infernoCreateRef();
    this.scrollViewContentRef = infernoCreateRef();
    this.containerRef = infernoCreateRef();
    this.vScrollbarRef = infernoCreateRef();
    this.hScrollbarRef = infernoCreateRef();
    this.topPocketRef = infernoCreateRef();
    this.bottomPocketRef = infernoCreateRef();
    this.__getterCache = {};
    this.state = {
      hovered: false,
      scrolling: false,
      containerClientWidth: 0,
      containerClientHeight: 0,
      contentScrollWidth: 0,
      contentScrollHeight: 0,
      contentClientWidth: 0,
      contentClientHeight: 0,
      contentPaddingBottom: 0,
      topPocketHeight: 0,
      bottomPocketHeight: 0,
      topPocketState: TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      vScrollLocation: 0,
      hScrollLocation: 0
    };
    this.content = this.content.bind(this);
    this.container = this.container.bind(this);
    this.refresh = this.refresh.bind(this);
    this.release = this.release.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.scrollHeight = this.scrollHeight.bind(this);
    this.scrollWidth = this.scrollWidth.bind(this);
    this.scrollOffset = this.scrollOffset.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.clientHeight = this.clientHeight.bind(this);
    this.clientWidth = this.clientWidth.bind(this);
    this.disposeWheelTimer = this.disposeWheelTimer.bind(this);
    this.scrollEffect = this.scrollEffect.bind(this);
    this.initEffect = this.initEffect.bind(this);
    this.startEffect = this.startEffect.bind(this);
    this.moveEffect = this.moveEffect.bind(this);
    this.endEffect = this.endEffect.bind(this);
    this.stopEffect = this.stopEffect.bind(this);
    this.cancelEffect = this.cancelEffect.bind(this);
    this.mouseEnterEffect = this.mouseEnterEffect.bind(this);
    this.mouseLeaveEffect = this.mouseLeaveEffect.bind(this);
    this.validate = this.validate.bind(this);
    this.moveIsAllowed = this.moveIsAllowed.bind(this);
    this.effectDisabledState = this.effectDisabledState.bind(this);
    this.effectResetInactiveState = this.effectResetInactiveState.bind(this);
    this.updatePocketState = this.updatePocketState.bind(this);
    this.subscribeTopPocketToResize = this.subscribeTopPocketToResize.bind(this);
    this.subscribeBottomPocketToResize = this.subscribeBottomPocketToResize.bind(this);
    this.subscribeContainerToResize = this.subscribeContainerToResize.bind(this);
    this.subscribeContentToResize = this.subscribeContentToResize.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.scrollByLocation = this.scrollByLocation.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.finishLoading = this.finishLoading.bind(this);
    this.getEventArgs = this.getEventArgs.bind(this);
    this.getInitEventData = this.getInitEventData.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onUpdated = this.onUpdated.bind(this);
    this.onBounce = this.onBounce.bind(this);
    this.onPullDown = this.onPullDown.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.onReachBottom = this.onReachBottom.bind(this);
    this.scrollLocationChange = this.scrollLocationChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isCrossThumbScrolling = this.isCrossThumbScrolling.bind(this);
    this.adjustDistance = this.adjustDistance.bind(this);
    this.suppressDirections = this.suppressDirections.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.prepareDirections = this.prepareDirections.bind(this);
    this.isContent = this.isContent.bind(this);
    this.tryGetAllowedDirection = this.tryGetAllowedDirection.bind(this);
    this.isLocked = this.isLocked.bind(this);
    this.validateWheel = this.validateWheel.bind(this);
    this.clearWheelValidationTimer = this.clearWheelValidationTimer.bind(this);
    this.validateMove = this.validateMove.bind(this);
    this.syncScrollbarsWithContent = this.syncScrollbarsWithContent.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.scrollByLine = this.scrollByLine.bind(this);
    this.scrollByPage = this.scrollByPage.bind(this);
    this.scrollByKey = this.scrollByKey.bind(this);
    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
    this.onVisibilityChangeHandler = this.onVisibilityChangeHandler.bind(this);
    this.updateElementDimensions = this.updateElementDimensions.bind(this);
    this.setTopPocketDimensions = this.setTopPocketDimensions.bind(this);
    this.setBottomPocketDimensions = this.setBottomPocketDimensions.bind(this);
    this.setContentDimensions = this.setContentDimensions.bind(this);
    this.setContainerDimensions = this.setContainerDimensions.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.disposeWheelTimer, []), new InfernoEffect(this.scrollEffect, [this.state.scrolling, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.props.direction]), new InfernoEffect(this.initEffect, [this.props.direction, this.props.scrollByThumb, this.props.scrollByContent, this.props.bounceEnabled, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.state.vScrollLocation, this.state.hScrollLocation, this.props.needScrollViewContentWrapper, this.props.onUpdated, this.state.topPocketHeight, this.props.disabled]), new InfernoEffect(this.startEffect, [this.props.onStart, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.props.direction]), new InfernoEffect(this.moveEffect, []), new InfernoEffect(this.endEffect, []), new InfernoEffect(this.stopEffect, []), new InfernoEffect(this.cancelEffect, []), new InfernoEffect(this.mouseEnterEffect, [this.props.disabled, this.props.showScrollbar]), new InfernoEffect(this.mouseLeaveEffect, [this.props.disabled, this.props.showScrollbar]), new InfernoEffect(this.effectDisabledState, [this.props.disabled]), new InfernoEffect(this.effectResetInactiveState, [this.props.direction]), new InfernoEffect(this.updatePocketState, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.topPocketHeight, this.state.vScrollLocation]), new InfernoEffect(this.subscribeTopPocketToResize, []), new InfernoEffect(this.subscribeBottomPocketToResize, []), new InfernoEffect(this.subscribeContainerToResize, []), new InfernoEffect(this.subscribeContentToResize, []), new InfernoEffect(this.updateDimensions, [])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.scrolling, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.props.direction]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.direction, this.props.scrollByThumb, this.props.scrollByContent, this.props.bounceEnabled, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.state.vScrollLocation, this.state.hScrollLocation, this.props.needScrollViewContentWrapper, this.props.onUpdated, this.state.topPocketHeight, this.props.disabled]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.onStart, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketHeight, this.props.direction]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.disabled, this.props.showScrollbar]);
    (_this$_effects$9 = this._effects[9]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.disabled, this.props.showScrollbar]);
    (_this$_effects$10 = this._effects[10]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.props.disabled]);
    (_this$_effects$11 = this._effects[11]) === null || _this$_effects$11 === void 0 ? void 0 : _this$_effects$11.update([this.props.direction]);
    (_this$_effects$12 = this._effects[12]) === null || _this$_effects$12 === void 0 ? void 0 : _this$_effects$12.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.topPocketHeight, this.state.vScrollLocation]);
  }

  disposeWheelTimer() {
    return () => this.clearWheelValidationTimer();
  }

  scrollEffect() {
    return subscribeToScrollEvent(this.containerRef.current, () => {
      this.handleScroll();
    });
  }

  initEffect() {
    return subscribeToScrollInitEvent(this.wrapperRef.current, event => {
      this.handleInit(event);
    }, this.getInitEventData());
  }

  startEffect() {
    return subscribeToDXScrollStartEvent(this.wrapperRef.current, event => {
      this.handleStart(event);
    });
  }

  moveEffect() {
    return subscribeToDXScrollMoveEvent(this.wrapperRef.current, event => {
      this.handleMove(event);
    });
  }

  endEffect() {
    return subscribeToDXScrollEndEvent(this.wrapperRef.current, event => {
      this.handleEnd(event);
    });
  }

  stopEffect() {
    return subscribeToDXScrollStopEvent(this.wrapperRef.current, () => {
      this.handleStop();
    });
  }

  cancelEffect() {
    return subscribeToDXScrollCancelEvent(this.wrapperRef.current, event => {
      this.handleCancel(event);
    });
  }

  mouseEnterEffect() {
    if (this.isHoverable) {
      return subscribeToMouseEnterEvent(this.scrollableRef.current, () => {
        this.setState(__state_argument => ({
          hovered: true
        }));
      });
    }

    return undefined;
  }

  mouseLeaveEffect() {
    if (this.isHoverable) {
      return subscribeToMouseLeaveEvent(this.scrollableRef.current, () => {
        this.setState(__state_argument => ({
          hovered: false
        }));
      });
    }

    return undefined;
  }

  effectDisabledState() {
    if (this.props.disabled) {
      this.lock();
    } else {
      this.unlock();
    }
  }

  effectResetInactiveState() {
    if (this.direction.isBoth) {
      return;
    }

    var inactiveScrollProp = !this.direction.isVertical ? "scrollTop" : "scrollLeft";
    this.scrollLocationChange(inactiveScrollProp, 0, true);
  }

  updatePocketState() {
    if (this.props.forceGeneratePockets) {
      this.setState(__state_argument => ({
        topPocketState: this.pulledDown ? TopPocketState.STATE_READY : TopPocketState.STATE_RELEASED
      }));
    }
  }

  subscribeTopPocketToResize() {
    return subscribeToResize(this.topPocketRef.current, element => {
      this.setTopPocketDimensions(element);
    });
  }

  subscribeBottomPocketToResize() {
    return subscribeToResize(this.bottomPocketRef.current, element => {
      this.setBottomPocketDimensions(element);
    });
  }

  subscribeContainerToResize() {
    return subscribeToResize(this.containerRef.current, element => {
      this.setContainerDimensions(element);
    });
  }

  subscribeContentToResize() {
    return subscribeToResize(this.content(), element => {
      this.setContentDimensions(element);
    });
  }

  updateDimensions() {
    this.updateElementDimensions();
  }

  get pulledDown() {
    return this.props.pullDownEnabled && this.props.bounceEnabled && this.state.topPocketHeight > 0 && this.state.vScrollLocation - this.state.topPocketHeight >= 0;
  }

  handleScroll() {
    var _this$props$onScroll, _this$props;

    if (!this.state.scrolling) {
      this.syncScrollbarsWithContent();
    }

    (_this$props$onScroll = (_this$props = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, this.getEventArgs());
  }

  startLoading() {
    if (this.loadingIndicatorEnabled && isVisible(this.scrollableRef.current)) {
      this.setState(__state_argument => ({
        isLoadPanelVisible: true
      }));
    }

    this.lock();
  }

  finishLoading() {
    this.setState(__state_argument => ({
      isLoadPanelVisible: false
    }));
    this.unlock();
  }

  getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset
    }, getBoundaryProps(this.props.direction, scrollOffset, this.containerRef.current, this.state.topPocketHeight));
  }

  getInitEventData() {
    return {
      getDirection: this.tryGetAllowedDirection,
      validate: this.validate,
      isNative: false,
      scrollTarget: this.containerRef.current
    };
  }

  onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this.getEventArgs());
  }

  onEnd(direction) {
    if (this.direction.isBoth) {
      this.endActionDirections[direction] = true;
      var {
        horizontal,
        vertical
      } = this.endActionDirections;

      if (horizontal && vertical) {
        var _this$props$onEnd, _this$props3;

        this.endActionDirections.vertical = false;
        this.endActionDirections.horizontal = false;
        this.setState(__state_argument => ({
          scrolling: false
        }));
        (_this$props$onEnd = (_this$props3 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props3, this.getEventArgs());
      }
    } else {
      var _this$props$onEnd2, _this$props4;

      this.setState(__state_argument => ({
        scrolling: false
      }));
      (_this$props$onEnd2 = (_this$props4 = this.props).onEnd) === null || _this$props$onEnd2 === void 0 ? void 0 : _this$props$onEnd2.call(_this$props4, this.getEventArgs());
    }
  }

  onUpdated() {
    var _this$props$onUpdated, _this$props5;

    (_this$props$onUpdated = (_this$props5 = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props5, this.getEventArgs());
  }

  onBounce() {
    var _this$props$onBounce, _this$props6;

    (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6, this.getEventArgs());
  }

  onPullDown() {
    var _this$props$onPullDow, _this$props7;

    this.setState(__state_argument => ({
      topPocketState: TopPocketState.STATE_REFRESHING
    }));
    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onPullDow = (_this$props7 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props7, {});
  }

  onRelease() {
    this.setState(__state_argument => ({
      topPocketState: TopPocketState.STATE_RELEASED
    }));
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.onUpdated();
  }

  onReachBottom() {
    var _this$props$onReachBo, _this$props8;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onReachBo = (_this$props8 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props8, {});
  }

  scrollLocationChange(scrollProp, scrollValue, needFireScroll) {
    var containerEl = this.containerRef.current;
    var prevScrollValue = containerEl[scrollProp];
    containerEl[scrollProp] = scrollValue;

    if (scrollProp === "scrollLeft") {
      this.setState(__state_argument => ({
        hScrollLocation: -scrollValue
      }));
    } else {
      this.setState(__state_argument => ({
        vScrollLocation: -scrollValue
      }));
    }

    if (needFireScroll && Math.abs(prevScrollValue - scrollValue) > 0) {
      this.onScroll();
    }
  }

  get hScrollOffsetMax() {
    var _this$contentRef, _this$containerRef;

    var contentEl = (_this$contentRef = this.contentRef) === null || _this$contentRef === void 0 ? void 0 : _this$contentRef.current;
    var containerEl = (_this$containerRef = this.containerRef) === null || _this$containerRef === void 0 ? void 0 : _this$containerRef.current;

    if (getBoundingRect(contentEl).width - getBoundingRect(containerEl).width > 0.5) {
      return -Math.max(this.contentWidth - this.state.containerClientWidth, 0);
    }

    return 0;
  }

  get vScrollOffsetMax() {
    var _this$contentRef2, _this$containerRef2;

    var contentEl = (_this$contentRef2 = this.contentRef) === null || _this$contentRef2 === void 0 ? void 0 : _this$contentRef2.current;
    var containerEl = (_this$containerRef2 = this.containerRef) === null || _this$containerRef2 === void 0 ? void 0 : _this$containerRef2.current;

    if (getBoundingRect(contentEl).height - getBoundingRect(containerEl).height > 0.5) {
      return -Math.max(this.contentHeight - this.state.containerClientHeight, 0);
    }

    return 0;
  }

  get vScrollOffsetMin() {
    return this.pulledDown && this.state.topPocketState !== TopPocketState.STATE_RELEASED ? this.state.topPocketHeight : 0;
  }

  onScroll() {
    eventsEngine.triggerHandler(this.containerRef.current, {
      type: "scroll"
    });
  }

  handleInit(event) {
    var _this$hScrollbarRef$c, _this$vScrollbarRef$c;

    this.suppressDirections(event);
    this.eventForUserAction = event;
    this.setState(__state_argument => ({
      scrolling: true
    }));
    var crossThumbScrolling = this.isCrossThumbScrolling(event);
    var {
      left,
      top
    } = getElementOffset(this.scrollableRef.current);
    (_this$hScrollbarRef$c = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c === void 0 ? void 0 : _this$hScrollbarRef$c.initHandler(event, crossThumbScrolling, left);
    (_this$vScrollbarRef$c = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c === void 0 ? void 0 : _this$vScrollbarRef$c.initHandler(event, crossThumbScrolling, top);
  }

  handleStart(event) {
    this.eventForUserAction = event;
    this.onStart();
  }

  handleMove(e) {
    var _e$preventDefault, _this$hScrollbarRef$c2, _this$vScrollbarRef$c2;

    if (this.isLocked()) {
      e.cancel = true;
      return;
    }

    (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 ? void 0 : _e$preventDefault.call(e);
    this.adjustDistance(e, "delta");
    this.eventForUserAction = e;
    (_this$hScrollbarRef$c2 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c2 === void 0 ? void 0 : _this$hScrollbarRef$c2.moveHandler(e.delta.x);
    (_this$vScrollbarRef$c2 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c2 === void 0 ? void 0 : _this$vScrollbarRef$c2.moveHandler(e.delta.y);
  }

  handleEnd(event) {
    var _this$hScrollbarRef$c3, _this$vScrollbarRef$c3;

    this.adjustDistance(event, "velocity");
    this.eventForUserAction = event;
    (_this$hScrollbarRef$c3 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c3 === void 0 ? void 0 : _this$hScrollbarRef$c3.endHandler(event.velocity.x, true);
    (_this$vScrollbarRef$c3 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c3 === void 0 ? void 0 : _this$vScrollbarRef$c3.endHandler(event.velocity.y, true);
  }

  handleStop() {
    var _this$hScrollbarRef$c4, _this$vScrollbarRef$c4;

    (_this$hScrollbarRef$c4 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c4 === void 0 ? void 0 : _this$hScrollbarRef$c4.stopHandler();
    (_this$vScrollbarRef$c4 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c4 === void 0 ? void 0 : _this$vScrollbarRef$c4.stopHandler();
    this.setState(__state_argument => ({
      scrolling: false
    }));
  }

  handleCancel(event) {
    var _this$hScrollbarRef$c5, _this$vScrollbarRef$c5;

    this.eventForUserAction = event;
    (_this$hScrollbarRef$c5 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c5 === void 0 ? void 0 : _this$hScrollbarRef$c5.endHandler(0, false);
    (_this$vScrollbarRef$c5 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c5 === void 0 ? void 0 : _this$vScrollbarRef$c5.endHandler(0, false);
  }

  isCrossThumbScrolling(event) {
    var {
      target
    } = event.originalEvent;
    var verticalScrolling = false;
    var horizontalScrolling = false;

    if (this.direction.isVertical) {
      verticalScrolling = this.props.scrollByThumb && this.vScrollbarRef.current.isThumb(target);
    }

    if (this.direction.isHorizontal) {
      horizontalScrolling = this.props.scrollByThumb && this.hScrollbarRef.current.isThumb(target);
    }

    return verticalScrolling || horizontalScrolling;
  }

  adjustDistance(event, property) {
    var distance = event[property];
    distance.x *= this.validDirections[DIRECTION_HORIZONTAL] ? 1 : 0;
    distance.y *= this.validDirections[DIRECTION_VERTICAL] ? 1 : 0;

    if (isDxMouseWheelEvent(event.originalEvent)) {
      var devicePixelRatio = getDevicePixelRatio();
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  }

  suppressDirections(event) {
    if (isDxMouseWheelEvent(event.originalEvent)) {
      this.prepareDirections(true);
      return;
    }

    this.prepareDirections(false);
    var {
      target
    } = event.originalEvent;

    if (this.direction.isVertical) {
      var scrollbar = this.vScrollbarRef.current;
      this.validDirections[DIRECTION_VERTICAL] = this.validateEvent(this.isContent(target), scrollbar.isScrollbar(target), scrollbar.isThumb(target));
    }

    if (this.direction.isHorizontal) {
      var _scrollbar = this.hScrollbarRef.current;
      this.validDirections[DIRECTION_HORIZONTAL] = this.validateEvent(this.isContent(target), _scrollbar.isScrollbar(target), _scrollbar.isThumb(target));
    }
  }

  validateEvent(isContent, isScrollbar, isThumb) {
    return this.props.scrollByThumb && (isScrollbar || isThumb) || this.props.scrollByContent && isContent;
  }

  prepareDirections(value) {
    this.validDirections[DIRECTION_HORIZONTAL] = value;
    this.validDirections[DIRECTION_VERTICAL] = value;
  }

  isContent(element) {
    var closest = element.closest(".".concat(SCROLLABLE_SIMULATED_CLASS));

    if (isDefined(closest)) {
      return closest === this.scrollableRef.current;
    }

    return false;
  }

  tryGetAllowedDirection(event) {
    return isDxMouseWheelEvent(event) ? permissibleWheelDirection(this.props.direction, event.shiftKey) : this.permissibleDirection;
  }

  isLocked() {
    return this.locked;
  }

  validateWheel(event) {
    var scrollbar = permissibleWheelDirection(this.props.direction, event.shiftKey) === DIRECTION_HORIZONTAL ? this.hScrollbarRef.current : this.vScrollbarRef.current;
    var reachedMin = scrollbar.reachedMin();
    var reachedMax = scrollbar.reachedMax();
    var contentGreaterThanContainer = !reachedMin || !reachedMax;
    var locatedNotAtBound = !reachedMin && !reachedMax;
    var scrollFromMin = reachedMin && event.delta > 0;
    var scrollFromMax = reachedMax && event.delta < 0;
    var validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || this.validateWheelTimer !== undefined;

    if (validated) {
      this.clearWheelValidationTimer();
      this.validateWheelTimer = setTimeout(this.clearWheelValidationTimer, VALIDATE_WHEEL_TIMEOUT);
    }

    return validated;
  }

  clearWheelValidationTimer() {
    clearTimeout(this.validateWheelTimer);
    this.validateWheelTimer = undefined;
  }

  validateMove(event) {
    if (!this.props.scrollByContent && !isDefined(event.target.closest(".".concat(SCROLLABLE_SCROLLBAR_CLASS)))) {
      return false;
    }

    return isDefined(this.permissibleDirection);
  }

  syncScrollbarsWithContent() {
    var {
      scrollLeft,
      scrollTop
    } = this.containerRef.current;
    this.setState(__state_argument => ({
      hScrollLocation: -scrollLeft
    }));
    this.setState(__state_argument => ({
      vScrollLocation: -scrollTop
    }));
  }

  handleKeyDown(event) {
    if (this.state.scrolling) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
      return;
    }

    var isKeySupported = Object.values(KEY_CODES).includes(normalizeKeyName(event));

    if (isKeySupported) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
    }

    switch (normalizeKeyName(event)) {
      case KEY_CODES.DOWN:
        this.scrollByLine({
          top: 1,
          left: 0
        });
        break;

      case KEY_CODES.UP:
        this.scrollByLine({
          top: -1,
          left: 0
        });
        break;

      case KEY_CODES.RIGHT:
        this.scrollByLine({
          top: 0,
          left: 1
        });
        break;

      case KEY_CODES.LEFT:
        this.scrollByLine({
          top: 0,
          left: -1
        });
        break;

      case KEY_CODES.PAGE_DOWN:
        this.scrollByPage(1);
        break;

      case KEY_CODES.PAGE_UP:
        this.scrollByPage(-1);
        break;

      case KEY_CODES.HOME:
        this.scrollByKey(KEY_CODES.HOME);
        break;

      case KEY_CODES.END:
        this.scrollByKey(KEY_CODES.END);
        break;

      default:
        break;
    }
  }

  scrollByLine(lines) {
    var scrollOffset = Math.abs(SCROLL_LINE_HEIGHT / getDevicePixelRatio() * 100) / 100;
    this.scrollByLocation({
      top: lines.top * scrollOffset,
      left: lines.left * scrollOffset
    });
  }

  scrollByPage(page) {
    var {
      isVertical
    } = new ScrollDirection(permissibleWheelDirection(this.props.direction, false));
    var distance = {
      left: 0,
      top: 0
    };
    var {
      clientHeight,
      clientWidth
    } = this.containerRef.current;

    if (isVertical) {
      distance.top = page * clientHeight;
    } else {
      distance.left = page * clientWidth;
    }

    this.scrollByLocation(distance);
  }

  scrollByKey(key) {
    var containerEl = this.containerRef.current;
    var vOffsetMin = 0;
    var vOffsetMax = -this.vScrollOffsetMax + this.state.bottomPocketHeight + this.state.contentPaddingBottom;
    var hOffsetMin = 0;
    var hOffsetMax = -this.hScrollOffsetMax;
    var offset = getOffsetDistance(key === KEY_CODES.HOME ? {
      top: vOffsetMin,
      left: this.props.rtlEnabled ? hOffsetMax : hOffsetMin
    } : {
      top: vOffsetMax,
      left: this.props.rtlEnabled ? hOffsetMin : hOffsetMax
    }, {
      top: containerEl.scrollTop,
      left: containerEl.scrollLeft
    });
    this.scrollByLocation({
      top: offset.top,
      left: offset.left
    });
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    if (!this.props.disabled) {
      this.locked = false;
    }
  }

  onVisibilityChangeHandler(visible) {
    var _this$props$onVisibil, _this$props9;

    if (visible) {
      this.updateHandler();

      if (this.savedScrollOffset) {
        var {
          scrollLeft,
          scrollTop
        } = this.savedScrollOffset;
        this.scrollLocationChange("scrollTop", scrollTop, false);
        this.scrollLocationChange("scrollLeft", scrollLeft, false);
      }

      this.savedScrollOffset = undefined;
    } else {
      var {
        scrollLeft: _scrollLeft,
        scrollTop: _scrollTop
      } = this.containerRef.current;
      this.savedScrollOffset = {
        scrollTop: _scrollTop,
        scrollLeft: _scrollLeft
      };
    }

    (_this$props$onVisibil = (_this$props9 = this.props).onVisibilityChange) === null || _this$props$onVisibil === void 0 ? void 0 : _this$props$onVisibil.call(_this$props9, visible);
  }

  updateElementDimensions() {
    if (this.props.forceGeneratePockets) {
      this.setTopPocketDimensions(this.topPocketRef.current);
      this.setBottomPocketDimensions(this.bottomPocketRef.current);
    }

    this.setContentDimensions(this.content());
    this.setContainerDimensions(this.containerRef.current);
  }

  setTopPocketDimensions(topPocketEl) {
    this.setState(__state_argument => ({
      topPocketHeight: this.props.forceGeneratePockets && this.props.pullDownEnabled ? topPocketEl.clientHeight : 0
    }));
  }

  setBottomPocketDimensions(bottomPocketEl) {
    this.setState(__state_argument => ({
      bottomPocketHeight: this.props.forceGeneratePockets && this.props.reachBottomEnabled ? bottomPocketEl.clientHeight : 0
    }));
  }

  setContentDimensions(contentEl) {
    var heightChanged = this.state.contentClientHeight !== contentEl.clientHeight || this.state.contentScrollHeight !== contentEl.scrollHeight;
    var widthChanged = this.state.contentClientWidth !== contentEl.clientWidth || this.state.contentScrollWidth !== contentEl.scrollWidth;
    this.setState(__state_argument => ({
      contentClientWidth: contentEl.clientWidth
    }));
    this.setState(__state_argument => ({
      contentClientHeight: contentEl.clientHeight
    }));
    this.setState(__state_argument => ({
      contentScrollWidth: contentEl.scrollWidth
    }));
    this.setState(__state_argument => ({
      contentScrollHeight: contentEl.scrollHeight
    }));
    this.setState(__state_argument => ({
      contentPaddingBottom: getElementPadding(this.contentRef.current, "bottom")
    }));

    if (heightChanged) {
      this.setState(__state_argument => ({
        vScrollLocation: clampIntoRange(__state_argument.vScrollLocation, 0, this.vScrollOffsetMax)
      }));
    }

    if (widthChanged) {
      this.setState(__state_argument => ({
        hScrollLocation: clampIntoRange(__state_argument.hScrollLocation, 0, this.hScrollOffsetMax)
      }));
    }
  }

  setContainerDimensions(containerEl) {
    var heightChanged = this.state.containerClientHeight !== containerEl.clientHeight;
    var widthChanged = this.state.containerClientWidth !== containerEl.clientWidth;
    this.setState(__state_argument => ({
      containerClientWidth: containerEl.clientWidth
    }));
    this.setState(__state_argument => ({
      containerClientHeight: containerEl.clientHeight
    }));

    if (heightChanged) {
      this.setState(__state_argument => ({
        vScrollLocation: clampIntoRange(__state_argument.vScrollLocation, 0, this.vScrollOffsetMax)
      }));
    }

    if (widthChanged) {
      this.setState(__state_argument => ({
        hScrollLocation: clampIntoRange(__state_argument.hScrollLocation, 0, this.vScrollOffsetMax)
      }));
    }
  }

  get contentHeight() {
    var _this$contentRef3;

    return getElementOverflowY((_this$contentRef3 = this.contentRef) === null || _this$contentRef3 === void 0 ? void 0 : _this$contentRef3.current) === "hidden" ? this.state.contentClientHeight : Math.max(this.state.contentScrollHeight, this.state.contentClientHeight);
  }

  get contentWidth() {
    var _this$contentRef4;

    return getElementOverflowX((_this$contentRef4 = this.contentRef) === null || _this$contentRef4 === void 0 ? void 0 : _this$contentRef4.current) === "hidden" ? this.state.contentClientWidth : Math.max(this.state.contentScrollWidth, this.state.contentClientWidth);
  }

  get containerHasSizes() {
    return this.state.containerClientHeight > 0 && this.state.containerClientWidth > 0;
  }

  get contentStyles() {
    if (this.__getterCache["contentStyles"] !== undefined) {
      return this.__getterCache["contentStyles"];
    }

    return this.__getterCache["contentStyles"] = (() => {
      return {
        transform: "translate(".concat(this.contentTranslateX, "px, ").concat(this.contentTranslateY, "px)")
      };
    })();
  }

  get contentTranslateY() {
    var location = this.state.vScrollLocation;
    var transformValue = location % 1;
    var maxOffset = this.vScrollOffsetMax - this.state.bottomPocketHeight - this.state.contentPaddingBottom;

    if (location > 0) {
      transformValue = location;
    } else if (location <= maxOffset) {
      transformValue = location - maxOffset;
    }

    return transformValue - this.state.topPocketHeight;
  }

  get contentTranslateX() {
    var location = this.state.hScrollLocation;
    var transformValue = location % 1;

    if (location > 0) {
      transformValue = location;
    } else if (location <= this.hScrollOffsetMax) {
      transformValue = location - this.hScrollOffsetMax;
    }

    return transformValue;
  }

  get containerStyles() {
    if (this.__getterCache["containerStyles"] !== undefined) {
      return this.__getterCache["containerStyles"];
    }

    return this.__getterCache["containerStyles"] = (() => {
      var direction = this.permissibleDirection;
      var vDirectionAllowed = direction === DIRECTION_VERTICAL || direction === DIRECTION_BOTH;
      var hDirectionAllowed = direction === DIRECTION_HORIZONTAL || direction === DIRECTION_BOTH;
      var touchDirection = vDirectionAllowed ? "pan-x" : "";
      touchDirection = hDirectionAllowed ? "pan-y" : touchDirection;
      touchDirection = vDirectionAllowed && hDirectionAllowed ? "none" : touchDirection;
      return {
        touchAction: touchDirection
      };
    })();
  }

  get cssClasses() {
    var {
      classes,
      direction,
      disabled,
      showScrollbar
    } = this.props;
    var classesMap = {
      "dx-scrollable": true,
      [SCROLLABLE_SIMULATED_CLASS]: true,
      ["dx-scrollable-".concat(direction)]: true,
      [SCROLLABLE_DISABLED_CLASS]: !!disabled,
      [SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE]: showScrollbar === "always",
      [String(classes)]: !!classes
    };
    return combineClasses(classesMap);
  }

  get direction() {
    if (this.__getterCache["direction"] !== undefined) {
      return this.__getterCache["direction"];
    }

    return this.__getterCache["direction"] = (() => {
      return new ScrollDirection(this.props.direction);
    })();
  }

  get permissibleDirection() {
    var {
      bounceEnabled
    } = this.props;
    return allowedDirection(this.props.direction, -this.vScrollOffsetMax, -this.hScrollOffsetMax, bounceEnabled);
  }

  get isHoverable() {
    return !this.props.disabled && this.props.showScrollbar === "onHover";
  }

  get restAttributes() {
    var _this$props10 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props10, _excluded);

    return restProps;
  }

  content() {
    if (this.props.needScrollViewContentWrapper) {
      return this.scrollViewContentRef.current;
    }

    return this.contentRef.current;
  }

  container() {
    return this.containerRef.current;
  }

  refresh() {
    var _this$props$onPullDow2, _this$props11;

    this.setState(__state_argument => ({
      topPocketState: TopPocketState.STATE_READY
    }));
    this.startLoading();
    (_this$props$onPullDow2 = (_this$props11 = this.props).onPullDown) === null || _this$props$onPullDow2 === void 0 ? void 0 : _this$props$onPullDow2.call(_this$props11, {});
  }

  release() {
    var _this$hScrollbarRef$c6, _this$vScrollbarRef$c6;

    this.updateElementDimensions();
    (_this$hScrollbarRef$c6 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c6 === void 0 ? void 0 : _this$hScrollbarRef$c6.releaseHandler();
    (_this$vScrollbarRef$c6 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c6 === void 0 ? void 0 : _this$vScrollbarRef$c6.releaseHandler();
  }

  updateHandler() {
    this.updateElementDimensions();
    this.onUpdated();
  }

  scrollHeight() {
    return this.content().offsetHeight;
  }

  scrollWidth() {
    return this.content().offsetWidth;
  }

  scrollOffset() {
    var {
      left,
      top
    } = getTranslateValues(this.contentRef.current);
    var {
      scrollLeft,
      scrollTop
    } = this.containerRef.current;
    return {
      top: scrollTop - top - (this.props.pullDownEnabled && this.props.forceGeneratePockets ? this.state.topPocketHeight : 0),
      left: scrollLeft - left
    };
  }

  scrollTop() {
    return this.scrollOffset().top;
  }

  scrollLeft() {
    return this.scrollOffset().left;
  }

  clientHeight() {
    return this.containerRef.current.clientHeight;
  }

  clientWidth() {
    return this.containerRef.current.clientWidth;
  }

  validate(event) {
    if (this.isLocked()) {
      return false;
    }

    this.updateHandler();
    return this.moveIsAllowed(event);
  }

  moveIsAllowed(event) {
    if (this.props.disabled || isDxMouseWheelEvent(event) && isCommandKeyPressed({
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    })) {
      return false;
    }

    if (this.props.bounceEnabled) {
      return true;
    }

    return isDxMouseWheelEvent(event) ? this.validateWheel(event) : this.validateMove(event);
  }

  scrollByLocation(location) {
    var _this$hScrollbarRef$c7, _this$vScrollbarRef$c7;

    this.setState(__state_argument => ({
      scrolling: true
    }));
    this.updateHandler();
    this.prepareDirections(true);
    this.onStart();
    var {
      scrollLeft,
      scrollTop
    } = this.containerRef.current;
    (_this$hScrollbarRef$c7 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c7 === void 0 ? void 0 : _this$hScrollbarRef$c7.scrollTo(scrollLeft + location.left);
    (_this$vScrollbarRef$c7 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c7 === void 0 ? void 0 : _this$vScrollbarRef$c7.scrollTo(scrollTop + location.top);
    this.setState(__state_argument => ({
      scrolling: false
    }));
  }

  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();

    if (this.state["hScrollLocation"] !== nextState["hScrollLocation"] || this.state["contentClientWidth"] !== nextState["contentClientWidth"] || this.state["contentScrollWidth"] !== nextState["contentScrollWidth"] || this.state["containerClientWidth"] !== nextState["containerClientWidth"] || this.state["vScrollLocation"] !== nextState["vScrollLocation"] || this.state["contentClientHeight"] !== nextState["contentClientHeight"] || this.state["contentScrollHeight"] !== nextState["contentScrollHeight"] || this.state["containerClientHeight"] !== nextState["containerClientHeight"] || this.state["bottomPocketHeight"] !== nextState["bottomPocketHeight"] || this.state["contentPaddingBottom"] !== nextState["contentPaddingBottom"] || this.state["topPocketHeight"] !== nextState["topPocketHeight"]) {
      this.__getterCache["contentStyles"] = undefined;
    }

    if (this.props["bounceEnabled"] !== nextProps["bounceEnabled"] || this.props["direction"] !== nextProps["direction"] || this.state["contentClientHeight"] !== nextState["contentClientHeight"] || this.state["contentScrollHeight"] !== nextState["contentScrollHeight"] || this.state["containerClientHeight"] !== nextState["containerClientHeight"] || this.state["contentClientWidth"] !== nextState["contentClientWidth"] || this.state["contentScrollWidth"] !== nextState["contentScrollWidth"] || this.state["containerClientWidth"] !== nextState["containerClientWidth"]) {
      this.__getterCache["containerStyles"] = undefined;
    }

    if (this.props["direction"] !== nextProps["direction"]) {
      this.__getterCache["direction"] = undefined;
    }
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      hovered: this.state.hovered,
      scrolling: this.state.scrolling,
      containerClientWidth: this.state.containerClientWidth,
      containerClientHeight: this.state.containerClientHeight,
      contentScrollWidth: this.state.contentScrollWidth,
      contentScrollHeight: this.state.contentScrollHeight,
      contentClientWidth: this.state.contentClientWidth,
      contentClientHeight: this.state.contentClientHeight,
      contentPaddingBottom: this.state.contentPaddingBottom,
      topPocketHeight: this.state.topPocketHeight,
      bottomPocketHeight: this.state.bottomPocketHeight,
      topPocketState: this.state.topPocketState,
      isLoadPanelVisible: this.state.isLoadPanelVisible,
      vScrollLocation: this.state.vScrollLocation,
      hScrollLocation: this.state.hScrollLocation,
      scrollableRef: this.scrollableRef,
      wrapperRef: this.wrapperRef,
      contentRef: this.contentRef,
      scrollViewContentRef: this.scrollViewContentRef,
      containerRef: this.containerRef,
      topPocketRef: this.topPocketRef,
      bottomPocketRef: this.bottomPocketRef,
      vScrollbarRef: this.vScrollbarRef,
      hScrollbarRef: this.hScrollbarRef,
      pulledDown: this.pulledDown,
      handleScroll: this.handleScroll,
      startLoading: this.startLoading,
      finishLoading: this.finishLoading,
      getEventArgs: this.getEventArgs,
      getInitEventData: this.getInitEventData,
      onStart: this.onStart,
      onEnd: this.onEnd,
      onUpdated: this.onUpdated,
      onBounce: this.onBounce,
      onPullDown: this.onPullDown,
      onRelease: this.onRelease,
      onReachBottom: this.onReachBottom,
      scrollLocationChange: this.scrollLocationChange,
      hScrollOffsetMax: this.hScrollOffsetMax,
      vScrollOffsetMax: this.vScrollOffsetMax,
      vScrollOffsetMin: this.vScrollOffsetMin,
      onScroll: this.onScroll,
      handleInit: this.handleInit,
      handleStart: this.handleStart,
      handleMove: this.handleMove,
      handleEnd: this.handleEnd,
      handleStop: this.handleStop,
      handleCancel: this.handleCancel,
      isCrossThumbScrolling: this.isCrossThumbScrolling,
      adjustDistance: this.adjustDistance,
      suppressDirections: this.suppressDirections,
      validateEvent: this.validateEvent,
      prepareDirections: this.prepareDirections,
      isContent: this.isContent,
      tryGetAllowedDirection: this.tryGetAllowedDirection,
      isLocked: this.isLocked,
      validateWheel: this.validateWheel,
      clearWheelValidationTimer: this.clearWheelValidationTimer,
      validateMove: this.validateMove,
      syncScrollbarsWithContent: this.syncScrollbarsWithContent,
      handleKeyDown: this.handleKeyDown,
      scrollByLine: this.scrollByLine,
      scrollByPage: this.scrollByPage,
      scrollByKey: this.scrollByKey,
      lock: this.lock,
      unlock: this.unlock,
      onVisibilityChangeHandler: this.onVisibilityChangeHandler,
      updateElementDimensions: this.updateElementDimensions,
      setTopPocketDimensions: this.setTopPocketDimensions,
      setBottomPocketDimensions: this.setBottomPocketDimensions,
      setContentDimensions: this.setContentDimensions,
      setContainerDimensions: this.setContainerDimensions,
      contentHeight: this.contentHeight,
      contentWidth: this.contentWidth,
      containerHasSizes: this.containerHasSizes,
      contentStyles: this.contentStyles,
      contentTranslateY: this.contentTranslateY,
      contentTranslateX: this.contentTranslateX,
      containerStyles: this.containerStyles,
      cssClasses: this.cssClasses,
      direction: this.direction,
      permissibleDirection: this.permissibleDirection,
      isHoverable: this.isHoverable,
      restAttributes: this.restAttributes
    });
  }

}
ScrollableSimulated.defaultProps = ScrollableSimulatedProps;
