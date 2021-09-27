/**
* DevExtreme (esm/ui/text_box/utils.scroll.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { isDxMouseWheelEvent } from '../../events/utils/index';

var allowScroll = function allowScroll(container, delta, shiftKey) {
  var $container = $(container);
  var scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
  var prop = shiftKey ? 'Width' : 'Height';
  var scrollBottomPos = $container.prop("scroll".concat(prop)) - $container.prop("client".concat(prop)) - scrollTopPos;

  if (scrollTopPos === 0 && scrollBottomPos === 0) {
    return false;
  }

  var isScrollFromTop = scrollTopPos === 0 && delta >= 0;
  var isScrollFromBottom = scrollBottomPos === 0 && delta <= 0;
  var isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;

  if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
    return true;
  }
};

var prepareScrollData = function prepareScrollData(container, validateTarget) {
  var $container = $(container);

  var isCorrectTarget = function isCorrectTarget(eventTarget) {
    return validateTarget ? $(eventTarget).is(container) : true;
  };

  return {
    validate: function validate(e) {
      if (isDxMouseWheelEvent(e) && isCorrectTarget(e.target)) {
        if (allowScroll($container, -e.delta, e.shiftKey)) {
          e._needSkipEvent = true;
          return true;
        }

        return false;
      }
    }
  };
};

export { allowScroll, prepareScrollData };
