import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstArgument {
    locus: Locus;
    name: string;
    typeName: string;
    isArray: boolean;
    type: Type;
    constructor(locus: Locus, name: string, typeName: string, isArray: boolean);
    accept(visitor: any): void;
}
