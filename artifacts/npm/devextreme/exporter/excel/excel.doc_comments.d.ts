/**
* DevExtreme (exporter/excel/excel.doc_comments.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @deprecated
 * @type object
 */
export interface ExcelFont {
    /**
     * @docid
     * @public
     */
    bold?: boolean;
    /**
     * @docid
     * @public
     */
    color?: string;
    /**
     * @docid
     * @public
     */
    italic?: boolean;
    /**
     * @docid
     * @public
     */
    name?: string;
    /**
     * @docid
     * @public
     */
    size?: number;
    /**
     * @docid
     * @type Enums.ExcelFontUnderlineType
     * @public
     */
    underline?: 'double' | 'doubleAccounting' | 'none' | 'single' | 'singleAccounting';
}
