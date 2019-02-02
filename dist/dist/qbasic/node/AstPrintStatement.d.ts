import { Locus } from "../Locus";
/** @constructor */
export declare class AstPrintStatement {
    locus: Locus;
    printItems: any;
    constructor(locus: Locus, printItems: any);
    accept(visitor: any): void;
}
