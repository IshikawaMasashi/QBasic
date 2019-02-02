import { VirtualMachine } from "./virtualMachine/VirtualMachine";
import { Instruction } from "./virtualMachine/instructions/instruction";
import { EarleyParser } from "./EarleyParser";
import { _Console } from "./Console";
import { DebugConsole } from "./DebugConsole";
import { Type } from "./types/Type";
import { IStringDictionary } from "./base/common/collections";
export declare function sprintf(...args: any[]): string;
/**
    Copyright 2010 Steve Hanov

    This file is part of qb.js

    qb.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    qb.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with qb.js.  If not, see <http://www.gnu.org/licenses/>.
*/
export declare function DeriveTypeNameFromVariable(name: string): "INTEGER" | "SINGLE" | "STRING" | "LONG" | "DOUBLE";
export declare function IsNumericType(type: Type): boolean;
export declare function IsStringType(type: Type): boolean;
export declare function IsArrayType(type: Type): boolean;
export declare function IsUserType(type: Type): boolean;
export declare function IsNullType(type: Type): boolean;
export declare function AreTypesCompatible(type1: Type, type2: Type): boolean;
/** @constructor */
export declare class QBasicProgram {
    testMode?: any;
    static parser: EarleyParser;
    errors: string[];
    sourcecode: string;
    instructions: Instruction[];
    types: IStringDictionary<Type>;
    defaultType: Type;
    lineMap: any;
    data: any;
    shared: any;
    constructor(input: any, testMode?: any);
    getByteCodeAsString(): string;
}
export declare var ScriptSrc: string;
export declare function compile(code: string, cons: _Console, virtualMachine: VirtualMachine): boolean;
export declare function compile2(code: string): QBasicProgram;
export declare var dbg: DebugConsole;
