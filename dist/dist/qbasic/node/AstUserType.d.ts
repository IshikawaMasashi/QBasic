import { Locus } from "../Locus";
/** @constructor */
export declare class AstUserType {
    locus: Locus;
    name: any;
    members: any;
    constructor(locus: Locus, name: any, members: any);
    accept(visitor: any): void;
}
