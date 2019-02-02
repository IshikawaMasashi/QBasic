import { Locus } from "../Locus";
/** @constructor */
export declare class AstIfStatement {
    locus: Locus;
    expr: any;
    statements: any;
    elseStatements: any;
    constructor(locus: Locus, expr: any, statements: any, elseStatements: any);
    accept(visitor: any): void;
}
