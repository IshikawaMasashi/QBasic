import { VirtualMachine } from "../VirtualMachine";
export declare abstract class Instruction {
    addrLabel?: boolean;
    dataLabel?: boolean;
    name: string;
    numArgs?: number;
    arg?: any;
    abstract execute(vm: VirtualMachine, arg: any): void;
    toString(): string;
}
