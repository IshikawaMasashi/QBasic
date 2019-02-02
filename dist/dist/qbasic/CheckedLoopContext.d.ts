/** @constructor */
export declare class CheckedLoopContext {
    type: "FOR" | "DO" | "WHILE";
    counter: string;
    constructor(type: "FOR" | "DO" | "WHILE", counter: string);
}
