/**
* DevExtreme (ui/hierarchical_collection/ui.hierarchical_collection_widget.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidget, {
    CollectionWidgetOptions,
} from '../collection/ui.collection_widget.base';

/** @namespace DevExpress.ui */
export interface HierarchicalCollectionWidgetOptions<TComponent> extends CollectionWidgetOptions<TComponent> {
    /**
     * @docid
     * @default 'disabled'
     * @public
     */
    disabledExpr?: string | Function;
    /**
     * @docid
     * @default 'text'
     * @type_function_param1 item:object
     * @public
     */
    displayExpr?: string | ((item: any) => string);
    /**
     * @docid
     * @default true &for(desktop)
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    hoverStateEnabled?: boolean;
    /**
     * @docid
     * @default 'items'
     * @public
     */
    itemsExpr?: string | Function;
    /**
     * @docid
     * @default 'id'
     * @public
     */
    keyExpr?: string | Function;
    /**
     * @docid
     * @default 'selected'
     * @public
     */
    selectedExpr?: string | Function;
}
/**
 * @docid
 * @inherits CollectionWidget
 * @hidden
 * @namespace DevExpress.ui
 */
export default class HierarchicalCollectionWidget<TProperties> extends CollectionWidget<TProperties> { }
