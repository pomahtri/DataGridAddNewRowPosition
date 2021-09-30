/**
* DevExtreme (cjs/ui/html_editor/modules/tableContextMenu.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _base = _interopRequireDefault(require("./base"));

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _index = require("../../../events/utils/index");

var _context_menu = _interopRequireDefault(require("../../context_menu"));

var _tableForms = require("../ui/tableForms");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _table_helper = require("../utils/table_helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MODULE_NAMESPACE = 'dxHtmlTableContextMenu';
var CONTEXT_MENU_EVENT = (0, _index.addNamespace)('dxcontextmenu', MODULE_NAMESPACE);
var TableContextMenuModule = _base.default;

if (_devextremeQuill.default) {
  TableContextMenuModule = /*#__PURE__*/function (_BaseModule) {
    _inheritsLoose(TableContextMenuModule, _BaseModule);

    function TableContextMenuModule(quill, options) {
      var _this;

      _this = _BaseModule.call(this, quill, options) || this;
      _this.enabled = !!options.enabled;
      _this._quillContainer = _this.editorInstance._getQuillContainer();

      _this.addCleanCallback(_this.prepareCleanCallback());

      if (_this.enabled) {
        _this._enableContextMenu();
      }

      return _this;
    }

    var _proto = TableContextMenuModule.prototype;

    _proto._enableContextMenu = function _enableContextMenu() {
      if (!this._contextMenu) {
        this._contextMenu = this._createContextMenu();
      }

      this._attachEvents();
    };

    _proto._attachEvents = function _attachEvents() {
      _events_engine.default.on(this.editorInstance._getContent(), CONTEXT_MENU_EVENT, this._prepareContextMenuHandler());
    };

    _proto._detachEvents = function _detachEvents() {
      _events_engine.default.off(this.editorInstance._getContent(), MODULE_NAMESPACE);
    };

    _proto._createContextMenu = function _createContextMenu() {
      var $container = (0, _renderer.default)('<div>').appendTo(this.editorInstance.$element());

      var menuConfig = this._getMenuConfig();

      return this.editorInstance._createComponent($container, _context_menu.default, menuConfig);
    };

    _proto.showTableProperties = function showTableProperties(e) {
      var $table = (0, _renderer.default)(this._targetElement).closest('table');

      this._contextMenu.hide();

      this._popupForm = (0, _tableForms.showTablePropertiesForm)(this.editorInstance, $table);
      this._targetElement = null;
    };

    _proto.showCellProperties = function showCellProperties(e) {
      var $cell = (0, _renderer.default)(this._targetElement).closest('th, td');

      this._contextMenu.hide();

      this._popupForm = (0, _tableForms.showCellPropertiesForm)(this.editorInstance, $cell);
      this._targetElement = null;
    };

    _proto._getMenuConfig = function _getMenuConfig(options) {
      var _this2 = this;

      return {
        target: this._quillContainer,
        showEvent: null,
        dataSource: [{
          text: 'Insert',
          items: [{
            text: _message.default.format('dxHtmlEditor-insertHeaderRow'),
            icon: 'header',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertHeaderRow')
          }, {
            text: _message.default.format('dxHtmlEditor-insertRowAbove'),
            icon: 'insertrowabove',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertRowAbove')
          }, {
            text: _message.default.format('dxHtmlEditor-insertRowBelow'),
            icon: 'insertrowbelow',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertRowBelow')
          }, {
            text: _message.default.format('dxHtmlEditor-insertColumnLeft'),
            icon: 'insertcolumnleft',
            beginGroup: true,
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertColumnLeft')
          }, {
            text: _message.default.format('dxHtmlEditor-insertColumnRight'),
            icon: 'insertcolumnright',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertColumnRight')
          }]
        }, {
          text: 'Delete',
          items: [{
            text: _message.default.format('dxHtmlEditor-deleteColumn'),
            icon: 'deletecolumn',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'deleteColumn')
          }, {
            text: _message.default.format('dxHtmlEditor-deleteRow'),
            icon: 'deleterow',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'deleteRow')
          }, {
            text: _message.default.format('dxHtmlEditor-deleteTable'),
            icon: 'deletetable',
            onClick: (0, _table_helper.getTableOperationHandler)(this.quill, 'deleteTable')
          }]
        }, {
          text: _message.default.format('dxHtmlEditor-cellProperties'),
          icon: 'cellproperties',
          onClick: function onClick(e) {
            _this2.showCellProperties(e);
          }
        }, {
          text: _message.default.format('dxHtmlEditor-tableProperties'),
          icon: 'tableproperties',
          onClick: function onClick(e) {
            _this2.showTableProperties(e);
          }
        }]
      };
    };

    _proto._getTableOperationHandler = function _getTableOperationHandler(operationName) {
      var _this3 = this;

      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      return function () {
        var table = _this3.quill.getModule('table');

        if (!table) {
          return;
        }

        _this3.quill.focus();

        return table[operationName].apply(table, rest);
      };
    };

    _proto._prepareContextMenuHandler = function _prepareContextMenuHandler() {
      var _this4 = this;

      return function (event) {
        if (_this4._isTableTarget(event.target)) {
          _this4._targetElement = event.target;

          _this4._setContextMenuPosition(event);

          _this4._contextMenu.show();

          event.preventDefault();
        }
      };
    };

    _proto._setContextMenuPosition = function _setContextMenuPosition(event) {
      var startPosition = this._quillContainer.get(0).getBoundingClientRect();

      this._contextMenu.option({
        position: {
          my: 'left top',
          at: 'left top',
          collision: 'fit flip',
          offset: {
            x: event.clientX - startPosition.left,
            y: event.clientY - startPosition.top
          }
        }
      });
    };

    _proto._isTableTarget = function _isTableTarget(targetElement) {
      return ['TD', 'TH'].indexOf(targetElement.tagName) !== -1;
    };

    _proto.option = function option(_option, value) {
      if (_option === 'enabled') {
        this.enabled = value;
        value ? this._enableContextMenu() : this._detachEvents();
      }
    };

    _proto.prepareCleanCallback = function prepareCleanCallback() {
      var _this5 = this;

      return function () {
        var _this5$_popupForm;

        _this5._detachEvents();

        (_this5$_popupForm = _this5._popupForm) === null || _this5$_popupForm === void 0 ? void 0 : _this5$_popupForm.dispose();
      };
    };

    return TableContextMenuModule;
  }(_base.default);
}

var _default = TableContextMenuModule;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
