import { Locus } from "./Locus";
import { Rule } from "./Rule";
import { Token } from "./Token";
/** @constructor */
export declare class EarleyItem {
    rule: Rule;
    pos: number;
    base: number;
    token?: Token | EarleyItem;
    prev?: EarleyItem;
    locus?: Locus;
    id: number;
    constructor(rule: Rule, pos: number, base: number, token?: Token | EarleyItem, prev?: EarleyItem, locus?: Locus);
    toString(): string;
}
