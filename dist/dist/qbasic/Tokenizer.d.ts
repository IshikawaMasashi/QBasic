/// <reference types="react" />
import { NfaState } from "./NfaState";
import { NFA } from "./Nfa";
import { DfaState } from "./DfaState";
import { Token } from "./Token";
/** @constructor */
export declare class Tokenizer {
    root: NfaState;
    expr: string;
    index: number;
    listId: number;
    dfaCache: {
        [key: string]: DfaState;
    };
    text: string;
    lineNumbers: number[];
    EOF_TOKEN: {};
    IGNORE_TOKEN: {};
    finished: boolean;
    rootDfa: DfaState;
    constructor();
    addToken(id: string | {}, expr: string): void;
    ignore(expr: string): void;
    eof(): boolean;
    matchChar(ch: string): boolean;
    peek(ch: string): boolean;
    parseChar(): import("react").Key;
    parseRange(): NFA;
    parseBasic(): NFA;
    parseKleene(): NFA;
    parseConcat(): NFA;
    parseAlternation(): NFA;
    addState(nfaStateList: NfaState[], accepts: string[], nfaState: NfaState): void;
    nextState(dfaState: DfaState, ch: number | string): DfaState;
    setText(text: string): void;
    getLine(lineno: number): string;
    /**
        Retrieve a list of tokens that match at a given position. The list is
        returned sorted in order of length.

        @param text Text to match.
        @param line Line number to begin matching, starting from 0
        @param position Character position on the line to begin matching.
    */
    nextTokenInternal(line: number, position: number): Token;
    nextToken(line: number, position: number): Token;
}
