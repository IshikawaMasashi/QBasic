import { Locus } from "../Locus";
/** @constructor */
export declare class AstExitStatement {
    locus: Locus;
    what: "FOR" | "DO";
    constructor(locus: Locus, what: "FOR" | "DO");
    accept(visitor: any): void;
}
