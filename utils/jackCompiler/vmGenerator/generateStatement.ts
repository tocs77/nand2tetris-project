import { DoStatement, Statement } from '../ast/types';
import { generateSubroutineCall } from './generateSubroutineCall';
import { SymbolTable } from './types';

export const generateStatement = (statement: Statement, symbolTable: SymbolTable) => {
  if (statement.type === 'doStatement') return generateDoStatement(statement, symbolTable);
  return '';
};

export const generateDoStatement = (statement: DoStatement, symbolTable: SymbolTable) => {
  let outVm = '';
  outVm += generateSubroutineCall(statement.subroutineCall, symbolTable);
  return outVm;
};
