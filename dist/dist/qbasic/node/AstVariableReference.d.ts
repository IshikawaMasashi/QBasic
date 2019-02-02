import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstVariableReference {
    locus: Locus;
    name: string;
    type?: Type;
    wantRef?: boolean;
    constructor(locus: Locus, name: string);
    accept(visitor: any): void;
}
