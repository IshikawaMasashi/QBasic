import { Locus } from "../Locus";
import { AstArgument } from "./AstArgument";
/** @constructor */
export declare class AstSubroutine {
    locus: Locus;
    name: string;
    args: AstArgument[];
    statements: any;
    isFunction: any;
    isStatic?: boolean;
    constructor(locus: Locus, name: string, args: AstArgument[], statements: any, isFunction: any, isStatic?: boolean);
    accept(visitor: any): void;
}
