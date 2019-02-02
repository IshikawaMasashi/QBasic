import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstUnaryOperator {
    locus: Locus;
    op: string;
    expr: any;
    type?: Type;
    wantRef?: boolean;
    constructor(locus: Locus, op: string, expr: any);
    accept(visitor: any): void;
}
