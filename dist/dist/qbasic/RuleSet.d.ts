import { Tokenizer } from "./Tokenizer";
import { Rule } from "./Rule";
/** @constructor */
export declare class RuleSet {
    rules: {
        [key: string]: Rule[];
    };
    terminals: string[];
    terminalsAdded: any;
    first: {
        [key: string]: {
            [key: string]: number;
        };
    };
    eatWhiteSpace: boolean;
    joinExpr: string;
    EOF_TOKEN: string;
    follow: {
        [key: string]: {
            [key: string]: number;
        };
    };
    constructor();
    EPSILON: string;
    toString(): string;
    check(errors: string[]): number;
    optimize(): void;
    innerExpr(symbol: string): string;
    replaceRule(name: string, newSymbols: string[]): void;
    addRule(name: string, symbols: string[], action?: any): void;
    addToken(name: string, re: string): void;
    computeFirst(): void;
    computeFollow(): void;
    finalize(): void;
    createTokenizer(): Tokenizer;
}
