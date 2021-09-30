/**
* DevExtreme (core/set_template_engine.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @publicName setTemplateEngine(name)
 * @namespace DevExpress
 * @public
 */
declare function setTemplateEngine(templateEngineName: string): void;

/**
 * @docid
 * @publicName setTemplateEngine(options)
 * @param1_field1 compile:function(html, $element)
 * @param1_field2 render:function(template, data, index)
 * @namespace DevExpress
 * @public
 */
declare function setTemplateEngine(templateEngineOptions: { compile?: Function; render?: Function }): void;

export default setTemplateEngine;
