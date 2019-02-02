import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstBinaryOp {
    locus: Locus;
    lhs: any;
    op: any;
    rhs: any;
    type?: Type;
    wantRef?: boolean;
    constructor(locus: Locus, lhs: any, op: any, rhs: any);
    accept(visitor: any): void;
}
