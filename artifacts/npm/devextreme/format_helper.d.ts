/**
* DevExtreme (format_helper.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface FormatHelper {
  format(
    value: number | Date | null | undefined | string,
    format: string | ((value: unknown) => string) | Record<string, unknown>): string;
}

declare const formatHelper: FormatHelper;
export default formatHelper;
