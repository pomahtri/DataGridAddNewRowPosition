/**
* DevExtreme (esm/renovation/ui/pager/utils/calculate_values_fitted_width.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export var oneDigitWidth = 10;
export function calculateValuesFittedWidth(minWidth, values) {
  return minWidth + oneDigitWidth * Math.max(...values).toString().length;
}
