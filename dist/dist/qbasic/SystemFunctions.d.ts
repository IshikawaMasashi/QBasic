import { VirtualMachine } from "./virtualMachine/VirtualMachine";
import { IStringDictionary } from "./base/common/collections";
/**
    Defines the functions that can be called from a basic program. Functions
    must return a value. System subs, which do not return a value, are defined
    elsewhere. Some BASIC keywords, such as SCREEN, are both a function and a
    sub, and may do different things in the two contexts.

    Each entry is indexed by function name. The record contains:

    type: The name of the type of the return value of the function.

    args: An array of names of types of each argument.

    minArgs: the number of arguments required.

    action: A function taking the virtual machine as an argument. To implement
    the function, it should pop its arguments off the stack, and push its
    return value onto the stack. If minArgs <> args.length, then the top of the
    stack is an integer variable that indicates how many arguments were passed
    to the function.
 */
export interface ISystemFunction {
    type: string;
    args: string[];
    minArgs: number;
    action(vm: VirtualMachine): void;
    name?: string;
}
export declare const SystemFunctions: IStringDictionary<ISystemFunction>;
