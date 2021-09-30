/**
* DevExtreme (core/options/utils.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device,
} from '../devices';

import {
    DefaultOptionsRule,
} from '../options';

export {
    DefaultOptionsRule,
} from '../options';

// TODO: Remove after https://trello.com/c/me612NxO/2872-rename-rule-to-defauloptionrule is ready
export type Rule<T> = DefaultOptionsRule<T>;

export function convertRulesToOptions<T>(rules: DefaultOptionsRule<T>[]): T;

export function normalizeOptions(options: string | object, value): { [name: string]: string };

export function deviceMatch(device: Device, filter): boolean;

export function getFieldName(fullName: string): string;

export function getParentName(fullName: string): string;

// TODO: Remove Required<T> after https://trello.com/c/me612NxO/2872-rename-rule-to-defauloptionrule is ready
export function createDefaultOptionRules<T>(options?: DefaultOptionsRule<T>[]): Required<DefaultOptionsRule<T>>[];
