/******************************************************************************
 A GlrState is a state in the LR(0) state machine. Each state consists of one
 or more items.
 *****************************************************************************/
/** @constructor */
export declare class GlrState {
    static NextGlrStateId: number;
    id: number;
    items: any;
    itemCount: number;
    next: any;
    reductions: any[];
    accept: any;
    constructor();
    /**************************************************************************
    The key is a string which uniquely identifies the state, so we can
    determine if we have already generated this state. We use the identifiers
    of the items' rules, and their positions, concatenated together.
     *************************************************************************/
    key(): string;
    toString(): string;
}
