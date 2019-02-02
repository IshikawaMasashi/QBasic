import { Tokenizer } from "../qbasic/Tokenizer";
import { RuleSet } from "./RuleSet";
import { EarleyItem } from "./EarleyItem";
import { Locus } from "./Locus";
import { Rule } from "./Rule";
import { Token } from "./Token";
import { AstProgram } from "./node/AstProgram";
/**
  The Earley parser is like the proverbial tortoise. Its simplicity lets slowly
  but surely it chug through any grammar you throw its way.

  @constructor
 */
export declare class EarleyParser {
    tokenizer: Tokenizer;
    rules: {
        [key: string]: Rule[];
    };
    first: {
        [key: string]: {
            [key: string]: number;
        };
    };
    errors: string[];
    locus: Locus;
    EPSILON: string;
    debug: boolean;
    constructor(ruleSet: RuleSet);
    getNonTerminal(name: string): Rule[];
    getRegexFromTerminal(terminal: string): string;
    isTerminal(symbol: string): boolean;
    isNonTerminal(symbol: string): boolean;
    parse(text: string): AstProgram;
    predict(items: EarleyItem[], index: number, base: number, token: Token): void;
    complete(states: EarleyItem[][], i: number, index: number, _base: number): void;
    scan(states: EarleyItem[][], i: number, token: Token): void;
    addToState(items: EarleyItem[], rule: Rule, pos: number, base: number, token?: Token | EarleyItem, prev?: EarleyItem): void;
    printState(states: EarleyItem[][], index: number): void;
    evaluate(item_in?: EarleyItem): any;
}
