import { Locus } from "../Locus";
/** @constructor */
export declare class AstEndStatement {
    locus: Locus;
    constructor(locus: Locus);
    accept(visitor: any): void;
}
