import { Dimension } from "./Dimension";
import { ScalarVariable } from "./ScalarVariable";
import { DoubleType } from "./types/DoubleType";
import { IntegerType } from "./types/IntegerType";
import { NullType } from "./types/NullType";
import { SingleType } from "./types/SingleType";
import { StringType } from "./types/StringType";
/** @constructor */
export declare class ArrayVariable {
    type: DoubleType | IntegerType | NullType | SingleType | StringType;
    dimensions: Dimension[];
    values: ScalarVariable[];
    constructor(type: DoubleType | IntegerType | NullType | SingleType | StringType, dimensions: Dimension[]);
    copy(): this;
    getIndex(indexes: number[]): number;
    assign(indexes: number[], value: ScalarVariable): void;
    access(indexes: number[]): ScalarVariable;
}
