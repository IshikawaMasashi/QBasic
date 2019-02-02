import { Locus } from "../Locus";
/** @constructor */
export declare class AstSelectStatement {
    locus: Locus;
    expr: any;
    cases: any;
    constructor(locus: Locus, expr: any, cases: any);
    accept(visitor: any): void;
}
