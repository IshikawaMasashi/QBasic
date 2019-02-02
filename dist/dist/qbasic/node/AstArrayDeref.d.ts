import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstArrayDeref {
    locus: Locus;
    expr: any;
    parameters: any;
    type: Type | null;
    constructor(locus: Locus, expr: any, parameters: any);
    accept(visitor: any): void;
}
