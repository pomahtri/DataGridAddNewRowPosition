/**
* DevExtreme (animation/frame.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid utils.cancelAnimationFrame
 * @publicName cancelAnimationFrame(requestID)
 * @namespace DevExpress.utils
 * @export cancel
 * @public
 */
export function cancelAnimationFrame(requestID: number): void;

/**
 * @docid utils.requestAnimationFrame
 * @publicName requestAnimationFrame(callback)
 * @param1 callback:function
 * @namespace DevExpress.utils
 * @export request
 * @public
 */
export function requestAnimationFrame(callback: Function): number;
