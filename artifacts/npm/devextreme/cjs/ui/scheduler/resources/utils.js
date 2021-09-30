/**
* DevExtreme (cjs/ui/scheduler/resources/utils.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.loadResources = exports.createExpressions = exports.getAppointmentColor = exports.getResourceColor = exports.setResourceToAppointment = exports.getResourcesDataByGroups = exports.reduceResourcesTree = exports.createReducedResourcesTree = exports.getResourceTreeLeaves = exports.groupAppointmentsByResourcesCore = exports.groupAppointmentsByResources = exports.getResourcesFromItem = exports.getDataAccessors = exports.getOrLoadResourceItem = exports.getPaintedResources = exports.filterResources = exports.isResourceMultiple = exports.createResourceEditorModel = exports.getResourceByField = exports.getAllGroups = exports.getGroupsObjectFromGroupsArray = exports.getGroupCount = exports.getCellGroups = exports.getPathToLeaf = exports.createResourcesTree = exports.getWrappedDataSource = exports.getFieldExpr = exports.getDisplayExpr = exports.getValueExpr = void 0;

var _utils = require("../../../data/data_source/utils");

var _data_source = require("../../../data/data_source/data_source");

var _deferred = require("../../../core/utils/deferred");

var _query = _interopRequireDefault(require("../../../data/query"));

var _data = require("../../../core/utils/data");

var _iterator = require("../../../core/utils/iterator");

var _extend = require("../../../core/utils/extend");

var _type = require("../../../core/utils/type");

var _array = require("../../../core/utils/array");

var _object = require("../../../core/utils/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getValueExpr = function getValueExpr(resource) {
  return resource.valueExpr || 'id';
};

exports.getValueExpr = getValueExpr;

var getDisplayExpr = function getDisplayExpr(resource) {
  return resource.displayExpr || 'text';
};

exports.getDisplayExpr = getDisplayExpr;

var getFieldExpr = function getFieldExpr(resource) {
  return resource.fieldExpr || resource.field;
};

exports.getFieldExpr = getFieldExpr;

var getWrappedDataSource = function getWrappedDataSource(dataSource) {
  if (dataSource instanceof _data_source.DataSource) {
    return dataSource;
  }

  var result = {
    store: (0, _utils.normalizeDataSourceOptions)(dataSource).store,
    pageSize: 0
  };

  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }

  return new _data_source.DataSource(result);
};

exports.getWrappedDataSource = getWrappedDataSource;

var createResourcesTree = function createResourcesTree(groups) {
  var leafIndex = 0;

  var make = function make(group, groupIndex, result, parent) {
    result = result || [];

    for (var itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
      var _group$data;

      var currentGroupItem = group.items[itemIndex];
      var resultItem = {
        name: group.name,
        value: currentGroupItem.id,
        title: currentGroupItem.text,
        data: (_group$data = group.data) === null || _group$data === void 0 ? void 0 : _group$data[itemIndex],
        children: [],
        parent: parent || null
      };
      var nextGroupIndex = groupIndex + 1;

      if (groups[nextGroupIndex]) {
        make(groups[nextGroupIndex], nextGroupIndex, resultItem.children, resultItem);
      }

      if (!resultItem.children.length) {
        resultItem.leafIndex = leafIndex;
        leafIndex++;
      }

      result.push(resultItem);
    }

    return result;
  };

  return make(groups[0], 0);
};

exports.createResourcesTree = createResourcesTree;

var getPathToLeaf = function getPathToLeaf(leafIndex, groups) {
  var tree = createResourcesTree(groups);

  var findLeafByIndex = function findLeafByIndex(data, index) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].leafIndex === index) {
        return data[i];
      } else {
        var _leaf = findLeafByIndex(data[i].children, index);

        if (_leaf) {
          return _leaf;
        }
      }
    }
  };

  var makeBranch = function makeBranch(leaf, result) {
    result = result || [];
    result.push(leaf.value);

    if (leaf.parent) {
      makeBranch(leaf.parent, result);
    }

    return result;
  };

  var leaf = findLeafByIndex(tree, leafIndex);
  return makeBranch(leaf).reverse();
}; // TODO rework


exports.getPathToLeaf = getPathToLeaf;

var getCellGroups = function getCellGroups(groupIndex, groups) {
  var result = [];

  if (getGroupCount(groups)) {
    if (groupIndex < 0) {
      return;
    }

    var path = getPathToLeaf(groupIndex, groups);

    for (var i = 0; i < groups.length; i++) {
      result.push({
        name: groups[i].name,
        id: path[i]
      });
    }
  }

  return result;
};

exports.getCellGroups = getCellGroups;

var getGroupCount = function getGroupCount(groups) {
  var result = 0;

  for (var i = 0, len = groups.length; i < len; i++) {
    if (!i) {
      result = groups[i].items.length;
    } else {
      result *= groups[i].items.length;
    }
  }

  return result;
};

exports.getGroupCount = getGroupCount;

var getGroupsObjectFromGroupsArray = function getGroupsObjectFromGroupsArray(groupsArray) {
  return groupsArray.reduce(function (currentGroups, _ref) {
    var name = _ref.name,
        id = _ref.id;
    return _extends({}, currentGroups, _defineProperty({}, name, id));
  }, {});
};

exports.getGroupsObjectFromGroupsArray = getGroupsObjectFromGroupsArray;

var getAllGroups = function getAllGroups(groups) {
  var groupCount = getGroupCount(groups);
  return _toConsumableArray(new Array(groupCount)).map(function (_, groupIndex) {
    var groupsArray = getCellGroups(groupIndex, groups);
    return getGroupsObjectFromGroupsArray(groupsArray);
  });
};

exports.getAllGroups = getAllGroups;

var getResourceByField = function getResourceByField(fieldName, loadedResources) {
  for (var i = 0; i < loadedResources.length; i++) {
    var resource = loadedResources[i];

    if (resource.name === fieldName) {
      return resource.data;
    }
  }

  return [];
};

exports.getResourceByField = getResourceByField;

var createResourceEditorModel = function createResourceEditorModel(resources, loadedResources) {
  return resources.map(function (resource) {
    var dataField = getFieldExpr(resource);
    var dataSource = getResourceByField(dataField, loadedResources);
    return {
      editorOptions: {
        dataSource: dataSource.length ? dataSource : getWrappedDataSource(resource.dataSource),
        displayExpr: getDisplayExpr(resource),
        valueExpr: getValueExpr(resource)
      },
      dataField: dataField,
      editorType: resource.allowMultiple ? 'dxTagBox' : 'dxSelectBox',
      label: {
        text: resource.label || dataField
      }
    };
  });
};

exports.createResourceEditorModel = createResourceEditorModel;

var isResourceMultiple = function isResourceMultiple(resources, resourceField) {
  var resource = resources.find(function (resource) {
    var field = getFieldExpr(resource);
    return field === resourceField;
  });
  return !!(resource !== null && resource !== void 0 && resource.allowMultiple);
};

exports.isResourceMultiple = isResourceMultiple;

var filterResources = function filterResources(resources, fields) {
  return resources.filter(function (resource) {
    var field = getFieldExpr(resource);
    return fields.indexOf(field) > -1;
  });
};

exports.filterResources = filterResources;

var getPaintedResources = function getPaintedResources(resources, groups) {
  var newGroups = groups || [];
  var result = resources.find(function (resource) {
    return resource.useColorAsDefault;
  });

  if (result) {
    return result;
  }

  var newResources = newGroups.length ? filterResources(resources, newGroups) : resources;
  return newResources[newResources.length - 1];
};

exports.getPaintedResources = getPaintedResources;

var getOrLoadResourceItem = function getOrLoadResourceItem(resources, resourceLoaderMap, field, value) {
  var result = new _deferred.Deferred();
  resources.forEach(function (resource) {
    var resourceField = getFieldExpr(resource);

    if (resourceField === field) {
      var dataSource = getWrappedDataSource(resource.dataSource);
      var valueExpr = getValueExpr(resource);

      if (!resourceLoaderMap.has(field)) {
        resourceLoaderMap.set(field, dataSource.load());
      }

      resourceLoaderMap.get(field).done(function (data) {
        var filteredData = (0, _query.default)(data).filter(valueExpr, value).toArray();
        result.resolve(filteredData[0]);
      }).fail(function () {
        resourceLoaderMap.delete(field);
        result.reject();
      });
    }
  });
  return result.promise();
};

exports.getOrLoadResourceItem = getOrLoadResourceItem;

var getDataAccessors = function getDataAccessors(dataAccessors, fieldName, type) {
  var actions = dataAccessors[type];
  return actions[fieldName];
};

exports.getDataAccessors = getDataAccessors;

var getResourcesFromItem = function getResourcesFromItem() {
  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dataAccessors = arguments.length > 1 ? arguments[1] : undefined;
  var itemData = arguments.length > 2 ? arguments[2] : undefined;
  var wrapOnlyMultipleResources = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var result = null;
  var resourceFields = resources.map(function (resource) {
    return getFieldExpr(resource);
  });
  resourceFields.forEach(function (field) {
    (0, _iterator.each)(itemData, function (fieldName, fieldValue) {
      var tempObject = {};
      tempObject[fieldName] = fieldValue;
      var resourceData = getDataAccessors(dataAccessors, field, 'getter')(tempObject);

      if ((0, _type.isDefined)(resourceData)) {
        if (!result) {
          result = {};
        }

        if (resourceData.length === 1) {
          resourceData = resourceData[0];
        }

        if (!wrapOnlyMultipleResources || wrapOnlyMultipleResources && isResourceMultiple(resources, field)) {
          getDataAccessors(dataAccessors, field, 'setter')(tempObject, (0, _array.wrapToArray)(resourceData));
        } else {
          getDataAccessors(dataAccessors, field, 'setter')(tempObject, resourceData);
        }

        (0, _extend.extend)(result, tempObject);
        return true;
      }
    });
  });
  return result;
};

exports.getResourcesFromItem = getResourcesFromItem;

var groupAppointmentsByResources = function groupAppointmentsByResources(config, appointments) {
  var groups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var result = {
    '0': appointments
  };

  if (groups.length && config.loadedResources.length) {
    result = groupAppointmentsByResourcesCore(config, appointments, config.loadedResources);
  }

  var totalResourceCount = 0;
  config.loadedResources.forEach(function (resource, index) {
    if (!index) {
      totalResourceCount = resource.items.length;
    } else {
      totalResourceCount *= resource.items.length;
    }
  });

  for (var index = 0; index < totalResourceCount; index++) {
    var key = index.toString();

    if (result[key]) {
      continue;
    }

    result[key] = [];
  }

  return result;
};

exports.groupAppointmentsByResources = groupAppointmentsByResources;

var groupAppointmentsByResourcesCore = function groupAppointmentsByResourcesCore(config, appointments, resources) {
  var tree = createResourcesTree(resources);
  var result = {};
  appointments.forEach(function (appointment) {
    var appointmentResources = getResourcesFromItem(config.resources, config.dataAccessors, appointment);
    var treeLeaves = getResourceTreeLeaves(function (field, action) {
      return getDataAccessors(config.dataAccessors, field, action);
    }, tree, appointmentResources);

    for (var i = 0; i < treeLeaves.length; i++) {
      if (!result[treeLeaves[i]]) {
        result[treeLeaves[i]] = [];
      } // NOTE: check appointment before pushing


      result[treeLeaves[i]].push((0, _object.deepExtendArraySafe)({}, appointment, true));
    }
  });
  return result;
};

exports.groupAppointmentsByResourcesCore = groupAppointmentsByResourcesCore;

var getResourceTreeLeaves = function getResourceTreeLeaves(getDataAccessors, tree, appointmentResources, result) {
  result = result || [];

  for (var i = 0; i < tree.length; i++) {
    if (!hasGroupItem(getDataAccessors, appointmentResources, tree[i].name, tree[i].value)) {
      continue;
    }

    if ((0, _type.isDefined)(tree[i].leafIndex)) {
      result.push(tree[i].leafIndex);
    }

    if (tree[i].children) {
      getResourceTreeLeaves(getDataAccessors, tree[i].children, appointmentResources, result);
    }
  }

  return result;
};

exports.getResourceTreeLeaves = getResourceTreeLeaves;

var hasGroupItem = function hasGroupItem(getDataAccessors, appointmentResources, groupName, itemValue) {
  var group = getDataAccessors(groupName, 'getter')(appointmentResources);

  if (group) {
    if ((0, _array.inArray)(itemValue, group) > -1) {
      return true;
    }
  }

  return false;
};

var createReducedResourcesTree = function createReducedResourcesTree(loadedResources, getDataAccessors, appointments) {
  var tree = createResourcesTree(loadedResources);
  return reduceResourcesTree(getDataAccessors, tree, appointments);
};

exports.createReducedResourcesTree = createReducedResourcesTree;

var reduceResourcesTree = function reduceResourcesTree(getDataAccessors, tree, existingAppointments, _result) {
  _result = _result ? _result.children : [];
  tree.forEach(function (node, index) {
    var ok = false;
    var resourceName = node.name;
    var resourceValue = node.value;
    var resourceTitle = node.title;
    var resourceData = node.data;
    var resourceGetter = getDataAccessors(resourceName, 'getter');
    existingAppointments.forEach(function (appointment) {
      if (!ok) {
        var resourceFromAppointment = resourceGetter(appointment);

        if (Array.isArray(resourceFromAppointment)) {
          if (resourceFromAppointment.indexOf(resourceValue) > -1) {
            _result.push({
              name: resourceName,
              value: resourceValue,
              title: resourceTitle,
              data: resourceData,
              children: []
            });

            ok = true;
          }
        } else {
          if (resourceFromAppointment === resourceValue) {
            _result.push({
              name: resourceName,
              value: resourceValue,
              title: resourceTitle,
              data: resourceData,
              children: []
            });

            ok = true;
          }
        }
      }
    });

    if (ok && node.children && node.children.length) {
      reduceResourcesTree(getDataAccessors, node.children, existingAppointments, _result[index]);
    }
  });
  return _result;
};

exports.reduceResourcesTree = reduceResourcesTree;

var getResourcesDataByGroups = function getResourcesDataByGroups(loadedResources, resources, groups) {
  if (!groups || !groups.length) {
    return loadedResources;
  }

  var fieldNames = {};
  var currentResourcesData = [];
  groups.forEach(function (group) {
    (0, _iterator.each)(group, function (name, value) {
      return fieldNames[name] = value;
    });
  });
  var resourceData = loadedResources.filter(function (_ref2) {
    var name = _ref2.name;
    return (0, _type.isDefined)(fieldNames[name]);
  });
  resourceData.forEach(function (data) {
    return currentResourcesData.push((0, _extend.extend)({}, data));
  });
  currentResourcesData.forEach(function (currentResource) {
    var items = currentResource.items,
        data = currentResource.data,
        resourceName = currentResource.name;
    var resource = filterResources(resources, [resourceName])[0] || {};
    var valueExpr = getValueExpr(resource);
    var filteredItems = [];
    var filteredData = [];
    groups.filter(function (group) {
      return (0, _type.isDefined)(group[resourceName]);
    }).forEach(function (group) {
      (0, _iterator.each)(group, function (name, value) {
        if (!filteredItems.filter(function (item) {
          return item.id === value && item[valueExpr] === name;
        }).length) {
          var currentItems = items.filter(function (item) {
            return item.id === value;
          });
          var currentData = data.filter(function (item) {
            return item[valueExpr] === value;
          });
          filteredItems.push.apply(filteredItems, _toConsumableArray(currentItems));
          filteredData.push.apply(filteredData, _toConsumableArray(currentData));
        }
      });
    });
    currentResource.items = filteredItems;
    currentResource.data = filteredData;
  });
  return currentResourcesData;
};

exports.getResourcesDataByGroups = getResourcesDataByGroups;

var setResourceToAppointment = function setResourceToAppointment(resources, dataAccessors, appointment, groups) {
  var resourcesSetter = dataAccessors.setter;

  for (var name in groups) {
    var resourceData = groups[name];
    var value = isResourceMultiple(resources, name) ? (0, _array.wrapToArray)(resourceData) : resourceData;
    resourcesSetter[name](appointment, value);
  }
};

exports.setResourceToAppointment = setResourceToAppointment;

var getResourceColor = function getResourceColor(resources, resourceLoaderMap, field, value) {
  var result = new _deferred.Deferred();
  var resource = filterResources(resources, [field])[0] || {};
  var colorExpr = resource.colorExpr || 'color';
  var colorGetter = (0, _data.compileGetter)(colorExpr);
  getOrLoadResourceItem(resources, resourceLoaderMap, field, value).done(function (resource) {
    return result.resolve(colorGetter(resource));
  }).fail(function () {
    return result.reject();
  });
  return result.promise();
};

exports.getResourceColor = getResourceColor;

var getAppointmentColor = function getAppointmentColor(resourceConfig, appointmentConfig) {
  var resources = resourceConfig.resources,
      dataAccessors = resourceConfig.dataAccessors,
      loadedResources = resourceConfig.loadedResources,
      resourceLoaderMap = resourceConfig.resourceLoaderMap;
  var groupIndex = appointmentConfig.groupIndex,
      groups = appointmentConfig.groups,
      itemData = appointmentConfig.itemData;
  var paintedResources = getPaintedResources(resources || [], groups);

  if (paintedResources) {
    var field = getFieldExpr(paintedResources);
    var cellGroups = getCellGroups(groupIndex, loadedResources);
    var resourceValues = (0, _array.wrapToArray)(getDataAccessors(dataAccessors, field, 'getter')(itemData));
    var groupId = resourceValues[0];

    for (var i = 0; i < cellGroups.length; i++) {
      if (cellGroups[i].name === field) {
        groupId = cellGroups[i].id;
        break;
      }
    }

    return getResourceColor(resources, resourceLoaderMap, field, groupId);
  }

  return new _deferred.Deferred().resolve().promise();
};

exports.getAppointmentColor = getAppointmentColor;

var createExpressions = function createExpressions() {
  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result = {
    getter: {},
    setter: {}
  };
  resources.forEach(function (resource) {
    var field = getFieldExpr(resource);
    result.getter[field] = (0, _data.compileGetter)(field);
    result.setter[field] = (0, _data.compileSetter)(field);
  });
  return result;
};

exports.createExpressions = createExpressions;

var getTransformedResourceData = function getTransformedResourceData(resource, data) {
  var valueGetter = (0, _data.compileGetter)(getValueExpr(resource));
  var displayGetter = (0, _data.compileGetter)(getDisplayExpr(resource));
  return data.map(function (item) {
    var result = {
      id: valueGetter(item),
      text: displayGetter(item)
    };

    if (item.color) {
      // TODO for passed tests
      result.color = item.color;
    }

    return result;
  });
};

var loadResources = function loadResources(groups, resources, resourceLoaderMap) {
  var result = new _deferred.Deferred();
  var deferreds = [];
  var newGroups = groups || [];
  var newResources = resources || [];
  var loadedResources = [];
  filterResources(newResources, newGroups).forEach(function (resource) {
    var deferred = new _deferred.Deferred();
    var name = getFieldExpr(resource);
    deferreds.push(deferred);
    var dataSourcePromise = getWrappedDataSource(resource.dataSource).load();
    resourceLoaderMap.set(name, dataSourcePromise);
    dataSourcePromise.done(function (data) {
      var items = getTransformedResourceData(resource, data);
      deferred.resolve({
        name: name,
        items: items,
        data: data
      });
    }).fail(function () {
      return deferred.reject();
    });
  });

  if (!deferreds.length) {
    return result.resolve(loadedResources);
  }

  _deferred.when.apply(null, deferreds).done(function () {
    for (var _len = arguments.length, resources = new Array(_len), _key = 0; _key < _len; _key++) {
      resources[_key] = arguments[_key];
    }

    var hasEmpty = resources.some(function (r) {
      return r.items.length === 0;
    });
    loadedResources = hasEmpty ? [] : resources;
    result.resolve(loadedResources);
  }).fail(function () {
    return result.reject();
  });

  return result.promise();
};

exports.loadResources = loadResources;
