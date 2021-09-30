/**
* DevExtreme (esm/integration/knockout/utils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
export var getClosestNodeWithContext = node => {
  var context = ko.contextFor(node);

  if (!context && node.parentNode) {
    return getClosestNodeWithContext(node.parentNode);
  }

  return node;
};
