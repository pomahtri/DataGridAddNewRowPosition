/**
* DevExtreme (ui/pivot_grid/xmla_store.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** @namespace DevExpress.data */
export interface XmlaStoreOptions {
    /**
     * @docid
     * @type_function_param1_field3 headers:object
     * @type_function_param1_field4 xhrFields:object
     * @public
     */
    beforeSend?: ((options: { url?: string; method?: string; headers?: any; xhrFields?: any; data?: string; dataType?: string }) => void);
    /**
     * @docid
     * @public
     */
    catalog?: string;
    /**
     * @docid
     * @public
     */
    cube?: string;
    /**
     * @docid
     * @public
     */
    url?: string;
}
/**
 * @docid
 * @namespace DevExpress.data
 * @public
 */
 // eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class XmlaStore {
    constructor(options?: XmlaStoreOptions)
}
