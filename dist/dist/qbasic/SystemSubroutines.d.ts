import { VirtualMachine } from "./virtualMachine/VirtualMachine";
import { IStringDictionary } from "./base/common/collections";
/**
    Defines the system subroutines that can be called from a basic program.
    Functions must return a value. System functions, which return a value, are
    defined elsewhere.

    Each entry is indexed by the name of the subroutine. The record contains:

    args: An array of names of types of each argument.

    minArgs: (optional) the number of arguments required.

    action: A function taking the virtual machine as an argument. To implement
    the function, it should pop its arguments off the stack, and push its
    return value onto the stack. If minArgs is present, and not equal to
    args.length, then the top of the stack is an integer variable that
    indicates how many arguments were passed to the function.
 */
export interface ISystemSubroutine {
    args?: string[];
    minArgs?: number;
    action(vm: VirtualMachine): void;
}
export declare const SystemSubroutines: IStringDictionary<ISystemSubroutine>;
