/**
* DevExtreme (animation/presets.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device,
} from '../core/devices';

import {
    AnimationConfig,
} from './fx';

/**
 * @docid
 * @namespace DevExpress
 * @public
 */
declare const animationPresets: {
    /**
     * @docid
     * @publicName applyChanges()
     * @public
     */
    applyChanges(): void;
    /**
     * @docid
     * @publicName clear()
     * @public
     */
    clear(): void;
    /**
     * @docid
     * @publicName clear(name)
     * @param1 name:string
     * @public
     */
    clear(name: string): void;
    /**
     * @docid
     * @publicName getPreset(name)
     * @param1 name:string
     * @return AnimationConfig
     * @public
     */
    getPreset(name: string): AnimationConfig;
    /**
     * @docid
     * @publicName registerDefaultPresets()
     * @public
     */
    registerDefaultPresets(): void;
    /**
     * @docid
     * @publicName registerPreset(name, config)
     * @param1 name:string
     * @param2 config:object
     * @param2_field1 animation:AnimationConfig
     * @param2_field2 device:Device
     * @public
     */
    registerPreset(name: string, config: { animation: AnimationConfig; device?: Device }): void;
    /**
     * @docid
     * @publicName resetToDefaults()
     * @public
     */
    resetToDefaults(): void;
};

export default animationPresets;
