import { Locus } from "../Locus";
/** @constructor */
export declare class AstDimStatement {
    locus: Locus;
    name: any;
    ranges: any;
    typeName: any;
    shared: boolean;
    constructor(locus: Locus, /*identifier*/ name: any, ranges: any, typeName: any);
    accept(visitor: any): void;
}
