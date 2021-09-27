"use strict";

exports.isVisible = isVisible;

function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}