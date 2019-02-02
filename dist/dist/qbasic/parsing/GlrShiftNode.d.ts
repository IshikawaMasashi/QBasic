import { Locus } from "../Locus";
/** @constructor */
export declare class GlrShiftNode {
    locus: Locus;
    state: any;
    parents: any;
    text: any;
    constructor(locus: Locus, state: any, parents: any, text: any);
    addParent(node: any): boolean;
    toString(): string;
    evaluate(): any;
}
