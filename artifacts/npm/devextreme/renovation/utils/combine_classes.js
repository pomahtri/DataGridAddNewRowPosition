/**
* DevExtreme (renovation/utils/combine_classes.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.combineClasses = combineClasses;

function combineClasses(classesMap) {
  return Object.keys(classesMap).filter(function (p) {
    return classesMap[p];
  }).join(" ");
}
