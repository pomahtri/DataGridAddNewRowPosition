/**
* DevExtreme (esm/data/abstract_store.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Class from '../core/class';
var abstract = Class.abstract;
import { EventsStrategy } from '../core/events_strategy';
import { each } from '../core/utils/iterator';
import { errors, handleError } from './errors';
import { processRequestResultLock } from './utils';
import { compileGetter } from '../core/utils/data';
import storeHelper from './store_helper';
var queryByOptions = storeHelper.queryByOptions;
import { Deferred, when } from '../core/utils/deferred';
import { noop } from '../core/utils/common';
var storeImpl = {};
var Store = Class.inherit({
  ctor: function ctor(options) {
    var that = this;
    options = options || {};
    this._eventsStrategy = new EventsStrategy(this);
    each(['onLoaded', 'onLoading', 'onInserted', 'onInserting', 'onUpdated', 'onUpdating', 'onPush', 'onRemoved', 'onRemoving', 'onModified', 'onModifying'], function (_, optionName) {
      if (optionName in options) {
        that.on(optionName.slice(2).toLowerCase(), options[optionName]);
      }
    });
    this._key = options.key;
    this._errorHandler = options.errorHandler;
    this._useDefaultSearch = true;
  },
  _customLoadOptions: function _customLoadOptions() {
    return null;
  },
  key: function key() {
    return this._key;
  },
  keyOf: function keyOf(obj) {
    if (!this._keyGetter) {
      this._keyGetter = compileGetter(this.key());
    }

    return this._keyGetter(obj);
  },
  _requireKey: function _requireKey() {
    if (!this.key()) {
      throw errors.Error('E4005');
    }
  },
  load: function load(options) {
    var that = this;
    options = options || {};

    this._eventsStrategy.fireEvent('loading', [options]);

    return this._withLock(this._loadImpl(options)).done(function (result) {
      that._eventsStrategy.fireEvent('loaded', [result, options]);
    });
  },
  _loadImpl: function _loadImpl(options) {
    return queryByOptions(this.createQuery(options), options).enumerate();
  },
  _withLock: function _withLock(task) {
    var result = new Deferred();
    task.done(function () {
      var that = this;
      var args = arguments;
      processRequestResultLock.promise().done(function () {
        result.resolveWith(that, args);
      });
    }).fail(function () {
      result.rejectWith(this, arguments);
    });
    return result;
  },
  createQuery: abstract,
  totalCount: function totalCount(options) {
    return this._totalCountImpl(options);
  },
  _totalCountImpl: function _totalCountImpl(options) {
    return queryByOptions(this.createQuery(options), options, true).count();
  },
  byKey: function byKey(key, extraOptions) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
  },
  _byKeyImpl: abstract,
  insert: function insert(values) {
    var that = this;

    that._eventsStrategy.fireEvent('modifying');

    that._eventsStrategy.fireEvent('inserting', [values]);

    return that._addFailHandlers(that._insertImpl(values).done(function (callbackValues, callbackKey) {
      that._eventsStrategy.fireEvent('inserted', [callbackValues, callbackKey]);

      that._eventsStrategy.fireEvent('modified');
    }));
  },
  _insertImpl: abstract,
  update: function update(key, values) {
    var that = this;

    that._eventsStrategy.fireEvent('modifying');

    that._eventsStrategy.fireEvent('updating', [key, values]);

    return that._addFailHandlers(that._updateImpl(key, values).done(function () {
      that._eventsStrategy.fireEvent('updated', [key, values]);

      that._eventsStrategy.fireEvent('modified');
    }));
  },
  _updateImpl: abstract,
  push: function push(changes) {
    var beforePushArgs = {
      changes,
      waitFor: []
    };

    this._eventsStrategy.fireEvent('beforePush', [beforePushArgs]);

    when(...beforePushArgs.waitFor).done(() => {
      this._pushImpl(changes);

      this._eventsStrategy.fireEvent('push', [changes]);
    });
  },
  _pushImpl: noop,
  remove: function remove(key) {
    var that = this;

    that._eventsStrategy.fireEvent('modifying');

    that._eventsStrategy.fireEvent('removing', [key]);

    return that._addFailHandlers(that._removeImpl(key).done(function (callbackKey) {
      that._eventsStrategy.fireEvent('removed', [callbackKey]);

      that._eventsStrategy.fireEvent('modified');
    }));
  },
  _removeImpl: abstract,
  _addFailHandlers: function _addFailHandlers(deferred) {
    return deferred.fail(this._errorHandler).fail(handleError);
  },

  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);

    return this;
  },

  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);

    return this;
  }

});

Store.create = function (alias, options) {
  if (!(alias in storeImpl)) {
    throw errors.Error('E4020', alias);
  }

  return new storeImpl[alias](options);
};

Store.registerClass = function (type, alias) {
  if (alias) {
    storeImpl[alias] = type;
  }

  return type;
};

Store.inherit = function (inheritor) {
  return function (members, alias) {
    var type = inheritor.apply(this, [members]);
    Store.registerClass(type, alias);
    return type;
  };
}(Store.inherit);

export default Store;
