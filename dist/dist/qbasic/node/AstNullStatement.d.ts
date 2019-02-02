import { Locus } from "../Locus";
/** @constructor */
export declare class AstNullStatement {
    locus: Locus;
    constructor(locus: Locus);
    accept(visitor: any): void;
}
