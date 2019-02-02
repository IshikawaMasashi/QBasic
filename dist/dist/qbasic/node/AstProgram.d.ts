import { Locus } from "../Locus";
import { AstSubroutine } from "./AstSubroutine";
/** @constructor */
export declare class AstProgram {
    locus: Locus;
    subs: AstSubroutine[];
    constructor(locus: Locus, mainSub: AstSubroutine);
    accept(visitor: any): void;
}
