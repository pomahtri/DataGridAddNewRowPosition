/**
* DevExtreme (ui/notify.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid ui.notify
 * @static
 * @publicName notify(message,type,displayTime)
 * @param2 type:string|undefined
 * @param3 displayTime:integer|undefined
 * @public
 */
declare function notify(message: string, type?: string, displayTime?: number): void;

/**
 * @docid ui.notify
 * @static
 * @publicName notify(options,type,displayTime)
 * @param1 options:object
 * @param2 type:string|undefined
 * @param3 displayTime:integer|undefined
 * @public
 */
declare function notify(options: any, type?: string, displayTime?: number): void;

export default notify;
