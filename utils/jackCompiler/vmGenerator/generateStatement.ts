import { DoStatement, LetStatement, Statement } from '../ast/types';
import { generateSubroutineCall } from './generateSubroutineCall';
import { SymbolTable } from './types';

export const generateStatement = (statement: Statement, classSymbolTable: SymbolTable, functionSymbolTable: SymbolTable) => {
  if (statement.type === 'doStatement') return generateDoStatement(statement, classSymbolTable, functionSymbolTable);
  if (statement.type === 'letStatement') return generateLetStatement(statement, classSymbolTable, functionSymbolTable);
  return '';
};

export const generateDoStatement = (statement: DoStatement, classSymbolTable: SymbolTable, functionSymbolTable: SymbolTable) => {
  let outVm = '';
  outVm += generateSubroutineCall(statement.subroutineCall, classSymbolTable, functionSymbolTable);
  return outVm;
};

export const generateLetStatement = (
  statement: LetStatement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
) => {
  let outVm = '';
  console.log('let staement', statement);
  return outVm;
};
