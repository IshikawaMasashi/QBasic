import { Type } from "./types/Type";
import { NullType } from "./types/NullType";
/** @constructor */
export declare class ScalarVariable {
    type: Type;
    value: number | string | NullType | null;
    constructor(type: Type, value: number | string | NullType | null);
    copy(): ScalarVariable;
}
