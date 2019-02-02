/** @constructor */
export declare class GlrInteriorNode {
    rnode: any;
    rule: any;
    ref: any;
    parents: any[];
    state: any;
    locus: any;
    constructor(rnode: any, rule: any, ref: any);
    addParent(node: any): boolean;
    toString(): string;
    evaluate(): any;
}
