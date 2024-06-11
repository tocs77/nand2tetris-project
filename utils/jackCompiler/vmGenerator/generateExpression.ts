import { Expression, Term, Operator, UnaryOpTerm, UnaryOperator } from '../ast/types';
import { generateSubroutineCall } from './generateSubroutineCall';
import { SymbolTable } from './types';

export const generateExpression = (expression: Expression, classSymbolTable: SymbolTable, functionSymbolTable: SymbolTable) => {
  let outVm = '';
  outVm += generateTerm(expression.term, classSymbolTable, functionSymbolTable);
  for (const opTerm of expression.terms) {
    outVm += generateTerm(opTerm.term, classSymbolTable, functionSymbolTable);
    outVm += generateOperator(opTerm.operator);
  }

  return outVm;
};

const generateTerm = (term: Term, classSymbolTable: SymbolTable, functionSymbolTable: SymbolTable) => {
  let outVm = '';
  if (term.type === 'integerConstant') {
    outVm += `push constant ${term.value}\n`;
    return outVm;
  }
  if (term.type === 'paren') {
    outVm += generateExpression(term.expression, classSymbolTable, functionSymbolTable);
    return outVm;
  }

  if (term.type === 'unaryOp') {
    outVm += generateTerm(term.term, classSymbolTable, functionSymbolTable);
    outVm += generateUnaryOperator(term.operator);
    return outVm;
  }

  if (term.type === 'varName') {
    let variable = functionSymbolTable[term.value];
    if (!variable) variable = classSymbolTable[term.value];
    if (!variable) throw new Error('variable not found');
    outVm += `push ${variable.kind} ${variable.index}\n`;
    return outVm;
  }

  if (term.type === 'subroutineCall') {
    outVm += generateSubroutineCall(term.value, classSymbolTable, functionSymbolTable);
    return outVm;
  }

  console.log('Not implemented', term);
  throw new Error('not implemented');
};

const generateOperator = (op: Operator) => {
  switch (op) {
    case '+':
      return 'add\n';
    case '-':
      return 'sub\n';
    case '*':
      return 'call Math.multiply 2\n';
    case '/':
      return 'call Math.divide 2\n';
    case '&':
      return 'and\n';
    case '|':
      return 'or\n';
    case '=':
      return 'eq\n';
    case '>':
      return 'gt\n';
    case '<':
      return 'lt\n';
    default:
      throw new Error('not implemented');
  }
};
const generateUnaryOperator = (op: UnaryOperator) => {
  switch (op) {
    case '-':
      return 'neg\n';
    case '~':
      return 'not\n';

    default:
      throw new Error('not implemented');
  }
};
