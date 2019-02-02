import { Type } from "./Type";
/** @constructor */
export declare class NullType extends Type {
    constructor();
    createInstance(): any;
    copy(value: NullType): NullType;
}
