import { CharMatcher } from "./CharMatcher";
/** @constructor */
export declare class NfaState {
    mchar?: CharMatcher;
    next: NfaState[];
    id: number;
    lastList: number;
    accept: string | {} | undefined;
    constructor(charMatcher?: CharMatcher);
    toString(): string;
}
