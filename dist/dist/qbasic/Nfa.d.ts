import { NfaState } from "./NfaState";
/** @constructor */
export declare class NFA {
    start: NfaState;
    end: NfaState;
    constructor(start: NfaState, end: NfaState);
    toString(): string;
}
