/**
* DevExtreme (data/local_store.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ArrayStore, {
    ArrayStoreOptions,
} from './array_store';

/** @namespace DevExpress.data */
export interface LocalStoreOptions
<TValue = any,
    TKeyExpr extends string | Array<string> = string | Array<string>,
    TKey = TKeyExpr extends keyof TValue ? TValue[TKeyExpr] : any,
> extends ArrayStoreOptions<TValue, TKeyExpr, TKey> {
    /**
     * @docid
     * @default 10000
     * @public
     */
    flushInterval?: number;
    /**
     * @docid
     * @default false
     * @public
     */
    immediate?: boolean;
    /**
     * @docid
     * @public
     */
    name?: string;
}
/**
 * @docid
 * @inherits ArrayStore
 * @public
 */
export default class LocalStore
<TValue = any,
    TKeyExpr extends string | Array<string> = string | Array<string>,
    TKey = TKeyExpr extends keyof TValue ? TValue[TKeyExpr] : any,
> extends ArrayStore<TValue, TKeyExpr, TKey> {
    constructor(options?: LocalStoreOptions<TValue, TKeyExpr, TKey>)
    /**
     * @docid
     * @publicName clear()
     * @public
     */
    clear(): void;
}
