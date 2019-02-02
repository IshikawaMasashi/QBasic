import { Locus } from "../Locus";
/** @constructor */
export declare class AstCallStatement {
    locus: Locus;
    name: string;
    args: any;
    constructor(locus: Locus, name: string, args: any);
    accept(visitor: any): void;
}
