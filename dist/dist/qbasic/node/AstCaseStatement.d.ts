import { Locus } from "../Locus";
/** @constructor */
export declare class AstCaseStatement {
    locus: Locus;
    exprList: any;
    statements: any;
    constructor(locus: Locus, exprList: any, statements: any);
    accept(visitor: any): void;
}
