import { Type } from "./Type";
/** @constructor */
export declare class IntegerType extends Type {
    constructor();
    createInstance(): number;
    copy(value: number): number;
}
