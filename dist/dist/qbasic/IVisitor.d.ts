import { AstDoStatement } from "./node/AstDoStatement";
import { AstRange } from "./node/AstRange";
export interface IVisitor {
}
export interface IDoStatementVisitor extends IVisitor {
    visitDoStatement(node: AstDoStatement): void;
}
export interface IRangeVisitor extends IVisitor {
    visitRange(node: AstRange): void;
}
