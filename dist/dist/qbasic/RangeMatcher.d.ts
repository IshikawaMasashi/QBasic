/**
  When the match function is called, it will return true if the argument
  matches a particular character range.

  @constructor
 */
export declare class RangeMatcher {
    ranges: [number, number][];
    include: boolean;
    constructor(ranges: [number, number][], include: boolean);
    match(ch: number): boolean;
    toString(): string;
}
