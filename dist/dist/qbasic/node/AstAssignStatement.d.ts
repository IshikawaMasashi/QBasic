import { Locus } from "../Locus";
import { AstVariableReference } from "./AstVariableReference";
/** @constructor */
export declare class AstAssignStatement {
    locus: Locus;
    lhs: AstVariableReference;
    expr: any;
    constructor(locus: Locus, lhs: AstVariableReference, expr: any);
    accept(visitor: any): void;
}
