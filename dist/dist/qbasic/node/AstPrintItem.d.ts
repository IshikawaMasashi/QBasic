import { Locus } from "../Locus";
/** @constructor */
export declare class AstPrintItem {
    locus: Locus;
    type: number;
    expr: any;
    terminator: any;
    static readonly EXPR = 0;
    static readonly TAB = 1;
    constructor(locus: Locus, type: number, expr: any, terminator: any);
    accept(visitor: any): void;
}
