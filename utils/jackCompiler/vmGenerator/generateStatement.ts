import { DoStatement, IfStatement, LetStatement, ReturnStatement, Statement, WhileStatement } from '../ast/types';
import { generateExpression } from './generateExpression';
import { generateSubroutineCall } from './generateSubroutineCall';
import { SymbolTable } from './types';

export const generateStatement = (
  statement: Statement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  if (statement.type === 'doStatement') return generateDoStatement(statement, classSymbolTable, functionSymbolTable, className);
  if (statement.type === 'letStatement') return generateLetStatement(statement, classSymbolTable, functionSymbolTable, className);
  if (statement.type === 'whileStatement')
    return generateWhileStatement(statement, classSymbolTable, functionSymbolTable, className);
  if (statement.type === 'returnStatement')
    return generateReturnStatement(statement, classSymbolTable, functionSymbolTable, className);
  if (statement.type === 'ifStatement') return generateIfStatement(statement, classSymbolTable, functionSymbolTable, className);

  throw new Error('Unknown statement type');
};

export const generateDoStatement = (
  statement: DoStatement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';
  outVm += generateSubroutineCall(statement.subroutineCall, classSymbolTable, functionSymbolTable, className);
  outVm += 'pop temp 0\n'; //remove returned value
  return outVm;
};

export const generateLetStatement = (
  statement: LetStatement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';

  outVm += generateExpression(statement.expression, classSymbolTable, functionSymbolTable, className);
  if (statement.arrayExpression) throw new Error('array expression not implemented');
  let variable = functionSymbolTable[statement.varName];
  if (!variable) variable = classSymbolTable[statement.varName];
  if (!variable) throw new Error(`variable ${statement.varName} not found`);
  outVm += `pop ${variable.kind} ${variable.index}\n`;
  return outVm;
};

export const generateWhileStatement = (
  statement: WhileStatement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';
  let whileLabel = `while_${Math.random()}`;
  outVm += `label ${whileLabel}\n`;
  outVm += generateExpression(statement.condition, classSymbolTable, functionSymbolTable, className);
  outVm += `not\nif-goto ${whileLabel}_end\n`;
  for (const statementItem of statement.statements) {
    outVm += generateStatement(statementItem, classSymbolTable, functionSymbolTable, className);
  }
  outVm += `goto ${whileLabel}\nlabel ${whileLabel}_end\n`;
  return outVm;
};

export const generateReturnStatement = (
  statement: ReturnStatement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';
  if (statement.expression) outVm += generateExpression(statement.expression, classSymbolTable, functionSymbolTable, className);
  outVm += 'return\n';
  return outVm;
};

export const generateIfStatement = (
  statement: IfStatement,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';
  let ifLabel = `if_${Math.random()}`;
  outVm += generateExpression(statement.condition, classSymbolTable, functionSymbolTable, className);
  outVm += `if-goto ${ifLabel}_true\n`;
  outVm += `goto ${ifLabel}_false\n`;

  outVm += `label ${ifLabel}_true\n`;

  for (const statementItem of statement.statements) {
    outVm += generateStatement(statementItem, classSymbolTable, functionSymbolTable, className);
  }
  outVm += `goto ${ifLabel}_end\n`;

  outVm += `label ${ifLabel}_false\n`;
  if (statement.elseStatements) {
    for (const statementItem of statement.elseStatements) {
      outVm += generateStatement(statementItem, classSymbolTable, functionSymbolTable, className);
    }
  }

  outVm += `label ${ifLabel}_end\n`;
  return outVm;
};
