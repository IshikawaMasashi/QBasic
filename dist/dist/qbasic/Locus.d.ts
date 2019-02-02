/**
  Represents a location in the source file. (The name "location" cannot be used
  because it has a special meaning in browsers.) This is used throughout the
  compiler to map program statements to token positions.

  @constructor
 */
export declare class Locus {
    readonly line: number;
    readonly position: number;
    constructor(line: number, position: number);
    toString(): string;
}
