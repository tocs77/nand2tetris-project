export interface ClassNode {
  name: string;
  classVarDec: ClassVarDec[];
  subroutineDec: SubroutineDec[];
}

export interface ClassVarDec {
  varType: 'static' | 'field';
  type: Type;
  name: string;
}

export interface SubroutineDec {
  type: 'constructor' | 'function' | 'method';
  name: string;
  returnType: ReturnType;
  parameterList: Parameter[];
  subroutineBody: SubroutineBody;
}

export interface Parameter {
  type: Type;
  name: string;
}

type Type = 'int' | 'char' | 'boolean' | string;
type ReturnType = Type | 'void';

export interface SubroutineBody {
  varDec: Parameter[];
  statements: Statement[];
}

export interface SubroutineCall {
  callType: 'function' | 'method';
  varOrClassName?: string;
  subroutineName: string;
  expressionList: Expression[];
}

export type Statement = IfStatement | DoStatement | LetStatement | WhileStatement | ReturnStatement;

export interface IfStatement {
  type: 'ifStatement';
  condition: Expression;
  statements: Statement[];
  elseStatements?: Statement[];
}

export interface DoStatement {
  type: 'doStatement';
  subroutineCall: SubroutineCall;
}

export interface LetStatement {
  type: 'letStatement';
  varName: string;
  arrayExpression?: Expression;
  expression: Expression;
}

export interface WhileStatement {
  type: 'whileStatement';
  condition: Expression;
  statements: Statement[];
}

export interface ReturnStatement {
  type: 'returnStatement';
  expression?: Expression;
}

export interface Expression {
  term: Term;
  terms: OpTerm[];
}

export interface OpTerm {
  operator: Operator;
  term: Term;
}

export type Term =
  | IntegerConstantTerm
  | StringConstantTerm
  | KeywordConstantTerm
  | ArrayTerm
  | SubroutineCallTerm
  | UnaryOpTerm
  | ParenTerm
  | VarNameTerm;

export interface IntegerConstantTerm {
  type: 'integerConstant';
  value: number;
}

export interface StringConstantTerm {
  type: 'stringConstant';
  value: string;
}
export interface KeywordConstantTerm {
  type: 'keywordConstant';
  value: 'true' | 'false' | 'null' | 'this';
}
export interface VarNameTerm {
  type: 'varName';
  value: string;
}

export interface ArrayTerm {
  type: 'array';
  name: string;
  expression: Expression;
}

export interface SubroutineCallTerm {
  type: 'subroutineCall';
  value: SubroutineCall;
}
export interface UnaryOpTerm {
  type: 'unaryOp';
  operator: UnaryOperator;
  term: Term;
}

export interface ParenTerm {
  type: 'paren';
  expression: Expression;
}

export type Operator = '+' | '-' | '*' | '/' | '&' | '|' | '<' | '>' | '=';
export type UnaryOperator = '~' | '-';
