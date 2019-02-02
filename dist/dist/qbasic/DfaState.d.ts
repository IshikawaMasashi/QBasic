import { NfaState } from "./NfaState";
/** @constructor */
export declare class DfaState {
    nfaStates: NfaState[];
    next: {
        [key: string]: DfaState;
    };
    accepts: string[];
    id: number;
    constructor();
}
