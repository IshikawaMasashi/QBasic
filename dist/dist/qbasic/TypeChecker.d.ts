import { AstDeclareFunction } from "./node/AstDeclareFunction";
import { AstArgument } from "./node/AstArgument";
import { AstEndStatement } from "./node/AstEndStatement";
import { AstNullStatement } from "./node/AstNullStatement";
import { AstAssignStatement } from "./node/AstAssignStatement";
import { AstBinaryOp } from "./node/AstBinaryOp";
import { AstCallStatement } from "./node/AstCallStatement";
import { AstCaseStatement } from "./node/AstCaseStatement";
import { AstConstStatement } from "./node/AstConstStatement";
import { AstExitStatement } from "./node/AstExitStatement";
import { AstConstantExpr } from "./node/AstConstantExpr";
import { AstGosubStatement } from "./node/AstGosubStatement";
import { AstGotoStatement } from "./node/AstGotoStatement";
import { AstInputStatement } from "./node/AstInputStatement";
import { AstPrintItem } from "./node/AstPrintItem";
import { AstLabel } from "./node/AstLabel";
import { AstDoStatement } from "./node/AstDoStatement";
import { AstTypeMember } from "./node/AstTypeMember";
import { AstNextStatement } from "./node/AstNextStatement";
import { AstSelectStatement } from "./node/AstSelectStatement";
import { AstRestoreStatement } from "./node/AstRestoreStatement";
import { AstVariableReference } from "./node/AstVariableReference";
import { AstPrintStatement } from "./node/AstPrintStatement";
import { AstProgram } from "./node/AstProgram";
import { AstSubroutine } from "./node/AstSubroutine";
import { AstUserType } from "./node/AstUserType";
import { AstPrintUsingStatement } from "./node/AstPrintUsingStatement";
import { AstMemberDeref } from "./node/AstMemberDeref";
import { AstDataStatement } from "./node/AstDataStatement";
import { AstUnaryOperator } from "./node/AstUnaryOperator";
import { AstArrayDeref } from "./node/AstArrayDeref";
import { AstRange } from "./node/AstRange";
import { TypeScope } from "./TypeScope";
import { CheckedLabel } from "./CheckedLabel";
import { CheckedLoopContext } from "./CheckedLoopContext";
import { Type } from "./types/Type";
import { IStringDictionary } from "./base/common/collections";
/** @constructor */
export declare class TypeChecker {
    errors: string[];
    declaredSubs: IStringDictionary<AstDeclareFunction>;
    scopes: TypeScope[];
    shared: TypeScope;
    labelsUsed: CheckedLabel[];
    labelsDefined: IStringDictionary<CheckedLabel>;
    readonly types: IStringDictionary<Type>;
    defaultType: Type;
    loopStack: CheckedLoopContext[];
    constructor(errors: string[]);
    /**
     Parameter 1 must be an ast node.
     Parameter 2 is a format string, eg, as in printf
     Parameters 3... depend on the format string.
     */
    error(...args: any[]): void;
    /**
     If the variable name includes a type suffix, removes it and returns the
     result.
     */
    removeSuffix(name: string): string;
    /**
     Using the current scope, or the type suffix, determine the type of the
     variable given its name. Returns the type object.
     */
    getTypeFromVariableName(name: any): Type;
    visitProgram(program: AstProgram): void;
    accept(nodes: AstArgument[]): void;
    visitDeclareFunction(declare: AstDeclareFunction): void;
    visitSubroutine(sub: AstSubroutine): void;
    /**
     Check that types of arguments match the ones from the AstDeclareStatement.
     */
    checkCallArguments(declare: any, args: any): void;
    visitCallStatement(call: AstCallStatement): void;
    visitArgument(argument: AstArgument): void;
    visitPrintStatement(print: AstPrintStatement): void;
    visitPrintUsingStatement(printUsing: AstPrintUsingStatement): void;
    visitPrintItem(item: AstPrintItem): void;
    visitInputStatement(input: AstInputStatement): void;
    visitNullStatement(argument: AstNullStatement): void;
    visitEndStatement(argument: AstEndStatement): void;
    visitForLoop(loop: any): void;
    visitNextStatement(next: AstNextStatement): void;
    visitExitStatement(exit: AstExitStatement): void;
    visitArrayDeref(ref: AstArrayDeref): void;
    visitMemberDeref(ref: AstMemberDeref): void;
    visitVariableReference(ref: AstVariableReference): void;
    visitRange(range: AstRange): void;
    visitDataStatement(_argument: AstDataStatement): void;
    visitReturnStatement(returnStatement: any): void;
    visitRestoreStatement(restore: AstRestoreStatement): void;
    visitConstStatement(constStatement: AstConstStatement): void;
    visitDefTypeStatement(def: any): void;
    visitDimStatement(dim: any): void;
    visitDoStatement(loop: AstDoStatement): void;
    visitWhileLoop(loop: any): void;
    visitIfStatement(ifStatement: any): void;
    visitSelectStatement(select: AstSelectStatement): void;
    visitCaseStatement(caseStatement: AstCaseStatement): void;
    visitTypeMember(member: AstTypeMember): void;
    visitUserType(userType: AstUserType): void;
    visitGotoStatement(gotoStatement: AstGotoStatement): void;
    visitGosub(gosub: AstGosubStatement): void;
    visitLabel(label: AstLabel): void;
    visitAssignStatement(assign: AstAssignStatement): void;
    visitBinaryOp(binary: AstBinaryOp): void;
    visitUnaryOperator(unary: AstUnaryOperator): void;
    visitConstantExpr(expr: AstConstantExpr): void;
}
