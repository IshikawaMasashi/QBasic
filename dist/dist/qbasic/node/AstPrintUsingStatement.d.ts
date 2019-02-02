import { Locus } from "../Locus";
/** @constructor */
export declare class AstPrintUsingStatement {
    locus: Locus;
    exprList: any;
    terminator: ";" | ",";
    constructor(locus: Locus, exprList: any, terminator: ";" | ",");
    accept(visitor: any): void;
}
