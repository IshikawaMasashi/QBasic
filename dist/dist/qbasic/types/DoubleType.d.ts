import { Type } from "./Type";
/** @constructor */
export declare class DoubleType extends Type {
    constructor();
    createInstance(): number;
    copy(value: number): number;
}
