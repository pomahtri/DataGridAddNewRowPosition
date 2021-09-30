/**
* DevExtreme (core/utils/browser.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type BrowserInfo = {
    webkit?: boolean;
    chrome?: boolean;
    mozilla?: boolean;
    safari?: boolean;
    unknown?: boolean;
    version?: string;
};

declare const browser: BrowserInfo;
export default browser;
