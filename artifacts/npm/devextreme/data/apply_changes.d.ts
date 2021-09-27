/**
* DevExtreme (data/apply_changes.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid Utils.applyChanges
 * @publicName applyChanges(data, changes, options)
 * @param3 options?:any
 * @param3_field1 keyExpr:String|Array<String>
 * @param3_field2 immutable:Boolean
 * @namespace DevExpress.data
 * @public
 */
declare function applyChanges(data: Array<any>, changes: Array<any>, options?: { keyExpr?: string | Array<string>; immutable?: boolean }): Array<any>;

export default applyChanges;
