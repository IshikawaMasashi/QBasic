import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstConstantExpr {
    locus: Locus;
    value: any;
    type: Type;
    wantRef: boolean;
    constructor(locus: Locus, value: any);
    accept(visitor: any): void;
}
