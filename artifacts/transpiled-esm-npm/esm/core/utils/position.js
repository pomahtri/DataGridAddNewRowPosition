import config from '../config';
import { isWindow } from '../utils/type';
import domAdapter from '../dom_adapter';

var getDefaultAlignment = isRtlEnabled => {
  var rtlEnabled = isRtlEnabled !== null && isRtlEnabled !== void 0 ? isRtlEnabled : config().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};

var getBoundingRect = element => {
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }

  if (domAdapter.getDocumentElement()) {
    return element.getBoundingClientRect();
  }

  return 0;
};

export { getBoundingRect, getDefaultAlignment };