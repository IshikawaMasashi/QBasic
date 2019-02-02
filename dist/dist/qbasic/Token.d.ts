import { Locus } from "./Locus";
/** @constructor */
export declare class Token {
    id: string | {};
    text: string;
    locus: Locus;
    constructor(id: string | {}, text: string, line: number, position: number);
    toString(): string;
}
