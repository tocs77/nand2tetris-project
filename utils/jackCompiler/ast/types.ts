export interface ClassNode {
  name: string;
  classVarDec: ClassVarDec[];
  subroutineDec: SubroutineDec[];
}

export interface ClassVarDec {
  varType: 'static' | 'field';
  type: Type;
  name: string[];
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

export type Statement = any;
