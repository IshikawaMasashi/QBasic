import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export declare class AstTypeMember {
    locus: Locus;
    name: any;
    typeName: any;
    type?: Type;
    constructor(locus: Locus, name: any, typeName: any);
    accept(visitor: any): void;
}
