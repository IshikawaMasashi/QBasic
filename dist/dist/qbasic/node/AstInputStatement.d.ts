import { Locus } from "../Locus";
/** @constructor */
export declare class AstInputStatement {
    locus: Locus;
    promptExpr: any;
    printQuestionMark: any;
    identifiers: any;
    constructor(locus: Locus, promptExpr: any, printQuestionMark: any, identifiers: any);
    accept(visitor: any): void;
}
