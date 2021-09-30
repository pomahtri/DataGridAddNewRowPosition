/**
* DevExtreme (cjs/ui/tree_list/ui.tree_list.keyboard_navigation.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));

var _uiGrid_core = require("../grid_core/ui.grid_core.keyboard_navigation");

var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_uiTree_list.default.registerModule('keyboardNavigation', (0, _extend.extend)(true, {}, _uiGrid_core.keyboardNavigationModule, {
  extenders: {
    controllers: {
      keyboardNavigation: {
        _leftRightKeysHandler: function _leftRightKeysHandler(eventArgs, isEditing) {
          var rowIndex = this.getVisibleRowIndex();
          var dataController = this._dataController;

          if (eventArgs.ctrl) {
            var directionCode = this._getDirectionCodeByKey(eventArgs.keyName);

            var key = dataController.getKeyByRowIndex(rowIndex);

            if (directionCode === 'nextInRow') {
              dataController.expandRow(key);
            } else {
              dataController.collapseRow(key);
            }
          } else {
            return this.callBase.apply(this, arguments);
          }
        }
      }
    }
  }
}));
