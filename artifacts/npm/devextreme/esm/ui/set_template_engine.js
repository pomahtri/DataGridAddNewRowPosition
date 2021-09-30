/**
* DevExtreme (esm/ui/set_template_engine.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @name ui
 * @namespace DevExpress
 * @section utils
*/

/**
 * @name ui.setTemplateEngine
 * @publicName setTemplateEngine(name)
 * @param1 templateEngineName:string
 * @static
 * @module ui/set_template_engine
 * @export default
*/

/**
 * @name ui.setTemplateEngine
 * @publicName setTemplateEngine(options)
 * @param1 templateEngineOptions:object
 * @param1_field1 compile:function(html, $element)
 * @param1_field2 render:function(template, data, index)
 * @static
 * @module ui/set_template_engine
 * @export default
*/
import { setTemplateEngine } from '../core/templates/template_engine_registry';
export default setTemplateEngine;
