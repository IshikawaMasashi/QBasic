import { Locus } from "../Locus";
/** @constructor */
export declare class AstWhileLoop {
    locus: Locus;
    expr: any;
    statements: any;
    constructor(locus: Locus, expr: any, statements: any);
    accept(visitor: any): void;
}
