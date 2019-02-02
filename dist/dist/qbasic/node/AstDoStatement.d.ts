import { IDoStatementVisitor } from "../IVisitor";
import { Locus } from "../Locus";
/** @constructor */
export declare class AstDoStatement {
    locus: Locus;
    statements: any;
    expr: any;
    type: any;
    static readonly INFINITE = 1;
    static readonly UNTIL = 2;
    static readonly WHILE_AT_END = 3;
    constructor(locus: Locus, statements: any, expr: any, type: any);
    accept(visitor: IDoStatementVisitor): void;
}
