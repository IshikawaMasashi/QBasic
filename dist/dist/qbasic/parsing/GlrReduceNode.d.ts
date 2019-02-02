import { Locus } from "../Locus";
/** @constructor */
export declare class GlrReduceNode {
    locus: Locus;
    state: any;
    parents: any[];
    inodes: any[];
    constructor(locus: Locus, state: any);
    addParent(node: any): boolean;
    getINode(rule: any, ref: any): any;
    toString(): string;
    evaluate(): any;
}
