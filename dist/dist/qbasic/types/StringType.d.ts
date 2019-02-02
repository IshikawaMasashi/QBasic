import { Type } from "./Type";
/** @constructor */
export declare class StringType extends Type {
    constructor();
    createInstance(): string;
    copy(value: string): string;
}
