import { Type } from "./Type";
/** @constructor */
export declare class ArrayType extends Type {
    elementType: Type;
    constructor(elementType: Type);
}
