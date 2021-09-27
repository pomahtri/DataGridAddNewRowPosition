/**
* DevExtreme (core/utils/deferred.d.ts)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
interface Callback<T> {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (value?: T, ...args: T[]): void;
}
declare class DeferredObj<T> {
    constructor();
    state(): 'pending' | 'rejected' | 'resolved';
    always(alwaysCallback?: Callback<T>): DeferredObj<T>;
    catch(catchCallback?: Callback<T>): DeferredObj<T>;
    then(resolveCallback?: Callback<T>, rejectCallback?: Callback<T>): DeferredObj<T>;
    done(doneCallback?: Callback<T>): DeferredObj<T>;
    fail(failCallback?: Callback<T>): DeferredObj<T>;
    progress(progressCallback?: Callback<T>): DeferredObj<T>;
    notify(...args: T[]): DeferredObj<T>;
    notifyWith(context: DeferredObj<T>, args?: T[]): DeferredObj<T>;
    reject(...args: T[]): DeferredObj<T>;
    rejectWith(context: DeferredObj<T>, args?: T[]): DeferredObj<T>;
    resolve(...args: T[]): DeferredObj<T>;
    resolveWith(context: DeferredObj<T>, args?: T[]): DeferredObj<T>;
    promise(target?: T): Promise<T>;
}

export function Deferred<T>(): DeferredObj<T>;

 // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface PromiseType<T> { }
/**
 * @docid
 * @type Promise<void>
 * @namespace DevExpress.core.utils
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type DxPromise<T = void> = {} extends PromiseType<T> ? Promise<T> : PromiseType<T>;
