/// <reference types="react" />
export declare function getNextStateId(): number;
export declare var POST_NEWLINE: number;
export declare var PRE_NEWLINE: number;
export declare var DIGIT_CHAR: number;
export declare var ANY_CHAR: number;
/**
  When the match function is called, it will return true if the argument
  matches a particular character.

  @constructor
 */
export declare class CharMatcher {
    mchar: number | string;
    constructor(mchar: number | string);
    match(ch: number | string): boolean;
    toString(): import("react").Key;
}
