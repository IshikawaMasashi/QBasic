import { IStringDictionary } from "../base/common/collections";
import { QBasicProgram } from "../qb";
import { _Console } from "../Console";
import { Instruction } from "./Instructions/Instruction";
import { TraceBuffer } from "../TraceBuffer";
import { ArrayVariable } from "../ArrayVariable";
import { StackFrame } from "../StackFrame";
import { ScalarVariable } from "../ScalarVariable";
import { Type } from "../types/Type";
/**
    The global machine variable points to the current virtual machine, so that
    it can be accessed from the javascript setInterval function. Unfortunately,
    this scheme limits us to one machine at a time.
 */
/**
 The VirtualMachine runs the bytecode given to it. It can run in one of two
 modes: Synchronously or Asynchronously.

 In synchronous mode, the program is run to completion before returning from
 the run() function. This can cause a browser window to freeze until execution
 completes.

 In asynchronous mode, a javascript interval is used. Every so often, we run
 some instructions and then stop. That way, the program appears to run while
 letting the user use the browser window.

 @param cons A Console object that will be used as the screen.
 */
/** @constructor */
export declare class VirtualMachine {
    cons: _Console;
    stack: (number | string | ScalarVariable | ArrayVariable | Type)[];
    pc: number;
    callstack: StackFrame[];
    instructions: Instruction[];
    types: IStringDictionary<Type>;
    shared: any;
    trace: TraceBuffer;
    dataPtr: number;
    data: any[];
    asyncronous: boolean;
    suspended: boolean;
    interval: number | null;
    INTERVAL_MS: number;
    instructionsPerInterval: number;
    lastRandomNumber: number;
    frame: StackFrame;
    defaultType: Type;
    debug: boolean;
    asynchronous: boolean;
    constructor(cons: _Console);
    /**
     Resets the virtual machine, halting any running program.
     */
    reset(program: QBasicProgram): void;
    /**
     Run a program to completion in synchronous mode, or
     Starts running a program in asynchronous mode.
   
     In asynchronous mode, it returns immediately.
     */
    run(program: any, synchronous: any): void;
    /**
     Suspend the CPU, maintaining all state. This happens when the program
     is waiting for user input.
     */
    suspend(): void;
    /**
     Resume the CPU, after previously being suspended.
     */
    resume(): void;
    /**
     Runs some instructions during asynchronous mode.
     */
    runSome(): void;
    runOneInstruction(): void;
    setVariable(name: any, value: any): void;
    getVariable(name: string): ScalarVariable;
    printStack(): void;
    pushScalar(value: number, typeName: string): void;
}
