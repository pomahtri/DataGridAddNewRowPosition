/**
* DevExtreme (file_management/remote_provider.d.ts)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemProviderBase, {
    FileSystemProviderBaseOptions,
} from './provider_base';

/** @namespace DevExpress.fileManagement */
export interface RemoteFileSystemProviderOptions extends FileSystemProviderBaseOptions<RemoteFileSystemProvider> {
    /**
     * @docid
     * @type_function_param1 options: object
     * @type_function_param1_field1 headers:object
     * @type_function_param1_field2 xhrFields:object
     * @type_function_param1_field3 formData:object
     * @public
     */
    beforeAjaxSend?: ((options: { headers?: any; xhrFields?: any; formData?: any }) => void);
    /**
     * @docid
     * @type_function_param1 options: object
     * @type_function_param1_field1 formData:object
     * @public
     */
    beforeSubmit?: ((options: { formData?: any }) => void);
    /**
     * @docid
     * @public
     */
    endpointUrl?: string;
    /**
     * @docid
     * @public
     */
    hasSubDirectoriesExpr?: string | Function;
    /**
     * @docid
     * @default {}
     * @public
     */
    requestHeaders?: any;
}
/**
 * @docid
 * @inherits FileSystemProviderBase
 * @namespace DevExpress.fileManagement
 * @public
 */
export default class RemoteFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: RemoteFileSystemProviderOptions)
}
