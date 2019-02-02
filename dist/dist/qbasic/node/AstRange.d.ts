import { Locus } from "../Locus";
import { IRangeVisitor } from "../IVisitor";
/** @constructor */
export declare class AstRange {
    locus: Locus;
    lowerExpr: any;
    upperExpr: any;
    constructor(locus: Locus, lowerExpr: any, upperExpr: any);
    accept(visitor: IRangeVisitor): void;
}
