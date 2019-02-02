import { Locus } from "../Locus";
/** @constructor */
export declare class AstDefTypeStatement {
    locus: Locus;
    typeName: string;
    constructor(locus: Locus, typeName: string);
    accept(visitor: any): void;
}
