import { IStringDictionary } from "../base/common/collections";
import { Locus } from "../Locus";
import { GlrReduceNode } from "./GlrReduceNode";
import { GlrState } from "./GlrState";
/** @constructor */
export declare class GlrParser {
    ruleSet: any;
    tokenizer: any;
    cached: IStringDictionary<GlrState>;
    errorState: any;
    startState: any;
    limit: number;
    stackTops: GlrReduceNode[];
    nextTops: any;
    errors: string[];
    locus: Locus;
    debug: boolean;
    constructor(ruleSet: any);
    parse(text: string): any;
    printExpected(tops: any): void;
    shift(node: any, symbol: any): void;
    reduceAll(node: any, token: any): void;
    reduce(node: any, rule: any, token: any): void;
    printStack(tops: any): void;
    ancestors(paths: any, v: any, k: any): void;
    findNode(tops: any, state: any): any;
    addNonTerminalToState(state: any, ruleName: any): void;
    addRuleToState(state: any, rule: any, position: any): void;
    cache(state: GlrState): GlrState;
    computeNext(state: any, symbol: any): any;
}
