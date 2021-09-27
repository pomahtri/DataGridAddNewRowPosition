/**
* DevExtreme (data/errors.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid Utils.errorHandler
 * @type function(e)
 * @namespace DevExpress.data
 * @deprecated Utils.setErrorHandler
 * @public
 */
export function errorHandler(e: Error): void;

/**
 * @docid Utils.setErrorHandler
 * @type function(handler)
 * @namespace DevExpress.data
 * @public
 */
export function setErrorHandler(handler: (e: Error) => void): void;
