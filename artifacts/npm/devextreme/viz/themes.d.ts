/**
* DevExtreme (viz/themes.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid viz.currentTheme
 * @publicName currentTheme()
 * @static
 * @public
 */
export function currentTheme(): string;

/**
 * @docid viz.currentTheme
 * @publicName currentTheme(platform, colorScheme)
 * @static
 * @public
 */
export function currentTheme(platform: string, colorScheme: string): void;

/**
 * @docid viz.currentTheme
 * @publicName currentTheme(theme)
 * @static
 * @public
 */
export function currentTheme(theme: string): void;

/**
 * @docid viz.getTheme
 * @publicName getTheme(theme)
 * @return object
 * @static
 * @public
 */
export function getTheme(theme: string): any;

/**
 * @docid viz.refreshTheme
 * @publicName refreshTheme()
 * @static
 * @public
 */
export function refreshTheme(): void;

/**
 * @docid viz.registerTheme
 * @publicName registerTheme(customTheme, baseTheme)
 * @param1 customTheme:object
 * @static
 * @public
 */
export function registerTheme(customTheme: any, baseTheme: string): void;
