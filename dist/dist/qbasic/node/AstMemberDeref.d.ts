import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstMemberDeref {
    locus: Locus;
    lhs: any;
    identifier: any;
    type: Type;
    wantRef?: boolean;
    constructor(locus: Locus, lhs: any, identifier: any);
    accept(visitor: any): void;
}
