import { Locus } from "../Locus";
import { AstConstantExpr } from "./AstConstantExpr";
/** @constructor */
export declare class AstDataStatement {
    locus: Locus;
    data: AstConstantExpr[];
    constructor(locus: Locus, data: AstConstantExpr[]);
    accept(visitor: any): void;
}
