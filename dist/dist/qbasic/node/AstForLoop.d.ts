import { Locus } from "../Locus";
import { AstConstantExpr } from "./AstConstantExpr";
/** @constructor */
export declare class AstForLoop {
    locus: Locus;
    identifier: any;
    startExpr: any;
    endExpr: AstConstantExpr;
    stepExpr: AstConstantExpr;
    constructor(locus: Locus, identifier: any, startExpr: any, endExpr: AstConstantExpr, stepExpr: AstConstantExpr);
    accept(visitor: any): void;
}
