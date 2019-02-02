import { IStringDictionary } from "./base/common/collections";
import { ScalarVariable } from "./ScalarVariable";
/** @constructor */
export declare class StackFrame {
    pc: number;
    variables: IStringDictionary<ScalarVariable>;
    constructor(pc: number);
}
