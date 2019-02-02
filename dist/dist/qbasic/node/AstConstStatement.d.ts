import { Locus } from "../Locus";
/** @constructor */
export declare class AstConstStatement {
    locus: Locus;
    name: string;
    expr: any;
    constructor(locus: Locus, /*identifier*/ name: string, expr: any);
    accept(visitor: any): void;
}
