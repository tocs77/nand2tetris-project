import { SubroutineDec } from '../ast/types';
import { buildAST } from '../ast/buildAST';
import { generateStatement } from './generateStatement';
import { SymbolTable } from './types';
import { addSymbolTableEntry } from './utils';

export const vmGenerator = (xml: string) => {
  const ast = buildAST(xml);
  let outVm = '';
  const classSymbolTable: SymbolTable = {};
  for (const classVarDec of ast.classVarDec) {
    addSymbolTableEntry({
      symbolTable: classSymbolTable,
      name: classVarDec.name,
      type: classVarDec.type,
      kind: classVarDec.varType === 'field' ? 'this' : classVarDec.varType,
    });
  }
  for (const subroutineDec of ast.subroutineDec) {
    outVm += generateSubroutineDec(subroutineDec, classSymbolTable, ast.name);
  }
  return outVm;
};

export const generateSubroutineDec = (subroutineDec: SubroutineDec, classSymbolTable: SymbolTable, className: string) => {
  const functionSymbolTable: SymbolTable = {};
  // if (subroutineDec.type === 'method') {
  //   addSymbolTableEntry({ symbolTable: functionSymbolTable, name: 'this', type: className, kind: 'argument' });
  // }
  if (subroutineDec.type === 'constructor') {
    addSymbolTableEntry({ symbolTable: functionSymbolTable, name: 'this', type: className, kind: 'pointer' });
  }

  for (const argument of subroutineDec.parameterList) {
    addSymbolTableEntry({ symbolTable: functionSymbolTable, name: argument.name, type: argument.type, kind: 'argument' });
  }

  for (const local of subroutineDec.subroutineBody.varDec) {
    addSymbolTableEntry({ symbolTable: functionSymbolTable, name: local.name, type: local.type, kind: 'local' });
  }
  let outVm = '';

  outVm += `function ${subroutineDec.name} ${subroutineDec.subroutineBody.varDec.length}\n`;
  if (subroutineDec.type === 'constructor') {
    let fieldsCount = 0;
    for (const variable in classSymbolTable) {
      if (classSymbolTable[variable].kind === 'field' || classSymbolTable[variable].kind === 'this') {
        fieldsCount++;
      }
    }
    outVm += `push constant ${fieldsCount}\n`;
    outVm += 'call Memory.alloc 1\n';
    outVm += 'pop pointer 0\n';
  }
  if (subroutineDec.type === 'method') {
    outVm += 'push argument 0\n';
    outVm += 'pop pointer 0\n';
    for (const key in functionSymbolTable) {
      if (functionSymbolTable[key].kind === 'argument') functionSymbolTable[key].index++; // added this as zero argument. shift all other arguments up
    }
  }
  for (const statement of subroutineDec.subroutineBody.statements) {
    if (statement.type === 'returnStatement' && subroutineDec.returnType === 'void') {
      outVm += 'push constant 0\n'; // return 0 for void functions
    }
    outVm += generateStatement(statement, classSymbolTable, functionSymbolTable, className);
  }
  return outVm;
};
