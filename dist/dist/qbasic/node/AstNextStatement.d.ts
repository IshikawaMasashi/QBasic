import { Locus } from "../Locus";
/** @constructor */
export declare class AstNextStatement {
    locus: Locus;
    identifiers: any;
    constructor(locus: Locus, /*identifierList*/ identifiers: any);
    accept(visitor: any): void;
}
