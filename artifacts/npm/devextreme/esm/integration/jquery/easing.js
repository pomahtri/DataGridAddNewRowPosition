/**
* DevExtreme (esm/integration/jquery/easing.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import { setEasing } from '../../animation/easing';

if (jQuery) {
  setEasing(jQuery.easing);
}
