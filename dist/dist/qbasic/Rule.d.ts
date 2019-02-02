import { Locus } from "./Locus";
/** @constructor */
export declare class Rule {
    readonly name: string;
    readonly symbols: string[];
    readonly action?: (args: any, locus: Locus) => any;
    readonly id: number;
    constructor(name: string, symbols: string[], action?: (args: any, locus: Locus) => any);
    toString(): string;
}
