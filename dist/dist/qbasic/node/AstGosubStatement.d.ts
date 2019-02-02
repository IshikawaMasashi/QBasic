import { Locus } from "../Locus";
/** @constructor */
export declare class AstGosubStatement {
    locus: Locus;
    label: string;
    constructor(locus: Locus, label: string);
    accept(visitor: any): void;
}
