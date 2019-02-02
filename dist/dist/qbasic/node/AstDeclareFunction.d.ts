import { Locus } from "../Locus";
import { AstArgument } from "./AstArgument";
/** @constructor */
export declare class AstDeclareFunction {
    locus: Locus;
    name: string;
    args: AstArgument[];
    isFunction: boolean;
    type: any;
    hasBody: boolean;
    used: boolean;
    constructor(locus: Locus, name: string, args: AstArgument[], isFunction: boolean);
    accept(visitor: any): void;
}
