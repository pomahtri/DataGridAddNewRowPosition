/**
* DevExtreme (ui/track_bar.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions,
} from './editor/editor';

/** @namespace DevExpress.ui */
export interface dxTrackBarOptions<TComponent> extends EditorOptions<TComponent> {
    /**
     * @docid
     * @default 100
     * @public
     */
    max?: number;
    /**
     * @docid
     * @default 0
     * @public
     */
    min?: number;
}
/**
 * @docid
 * @inherits Editor
 * @hidden
 * @namespace DevExpress.ui
 */
export default class dxTrackBar<TProperties> extends Editor<TProperties> { }
