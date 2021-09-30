/**
* DevExtreme (ui/validation_engine.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxValidationGroupResult,
} from './validation_group';

/**
 * @docid
 * @section Core
 * @namespace DevExpress
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class validationEngine {
    /**
     * @docid
     * @section Core
     * @publicName getGroupConfig()
     * @return object
     * @static
     * @public
     */
    static getGroupConfig(): any;
    /**
     * @docid
     * @section Core
     * @publicName getGroupConfig(group)
     * @param1 group:string|object
     * @return object
     * @static
     * @public
     */
    static getGroupConfig(group: string | any): any;
    /**
     * @docid
     * @publicName registerModelForValidation(model)
     * @param1 model:object
     * @static
     * @public
     */
    static registerModelForValidation(model: any): void;
    /**
     * @docid
     * @section Core
     * @publicName resetGroup()
     * @static
     * @public
     */
    static resetGroup(): void;
    /**
     * @docid
     * @section Core
     * @publicName resetGroup(group)
     * @param1 group:string|object
     * @static
     * @public
     */
    static resetGroup(group: string | any): void;
    /**
     * @docid
     * @publicName unregisterModelForValidation(model)
     * @param1 model:object
     * @static
     * @public
     */
    static unregisterModelForValidation(model: any): void;
    /**
     * @docid
     * @section Core
     * @publicName validateGroup()
     * @static
     * @public
     */
    static validateGroup(): dxValidationGroupResult;
    /**
     * @docid
     * @section Core
     * @publicName validateGroup(group)
     * @param1 group:string|object
     * @static
     * @public
     */
    static validateGroup(group: string | any): dxValidationGroupResult;
    /**
     * @docid
     * @publicName validateModel(model)
     * @param1 model:object
     * @return object
     * @static
     * @public
     */
    static validateModel(model: any): any;
}
