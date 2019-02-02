import { Locus } from "../Locus";
/** @constructor */
export declare class AstReturnStatement {
    locus: Locus;
    value?: any;
    constructor(locus: Locus, value?: any);
    accept(visitor: any): void;
}
