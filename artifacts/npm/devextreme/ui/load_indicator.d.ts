/**
* DevExtreme (ui/load_indicator.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

/** @public */
export type ContentReadyEvent = EventInfo<dxLoadIndicator>;

/** @public */
export type DisposingEvent = EventInfo<dxLoadIndicator>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxLoadIndicator>;

/** @public */
export type OptionChangedEvent = EventInfo<dxLoadIndicator> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 */
export interface dxLoadIndicatorOptions extends WidgetOptions<dxLoadIndicator> {
    /**
     * @docid
     * @default ""
     * @public
     */
    indicatorSrc?: string;
}
/**
 * @docid
 * @inherits Widget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxLoadIndicator extends Widget<dxLoadIndicatorOptions> { }

/** @public */
export type Properties = dxLoadIndicatorOptions;

/** @deprecated use Properties instead */
export type Options = dxLoadIndicatorOptions;

/** @deprecated use Properties instead */
export type IOptions = dxLoadIndicatorOptions;
