/**
* DevExtreme (core/options.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device,
} from './devices';

import {
    DeepPartial,
} from './index';

/** @public */
export type DefaultOptionsRule<T> = {
    device?: Device | Device[] | ((device: Device) => boolean);
    options: DeepPartial<T>;
};
