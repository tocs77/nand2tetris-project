import { Expression, Term, Operator, UnaryOperator, KeywordConstantTerm } from '../ast/types';
import { generateSubroutineCall } from './generateSubroutineCall';
import { SymbolTable } from './types';

export const generateExpression = (
  expression: Expression,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';
  outVm += generateTerm(expression.term, classSymbolTable, functionSymbolTable, className);
  for (const opTerm of expression.terms) {
    outVm += generateTerm(opTerm.term, classSymbolTable, functionSymbolTable, className);
    outVm += generateOperator(opTerm.operator);
  }

  return outVm;
};

const generateTerm = (term: Term, classSymbolTable: SymbolTable, functionSymbolTable: SymbolTable, className: string) => {
  let outVm = '';
  if (term.type === 'integerConstant') {
    outVm += `push constant ${term.value}\n`;
    return outVm;
  }
  if (term.type === 'paren') {
    outVm += generateExpression(term.expression, classSymbolTable, functionSymbolTable, className);
    return outVm;
  }

  if (term.type === 'unaryOp') {
    outVm += generateTerm(term.term, classSymbolTable, functionSymbolTable, className);
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
    outVm += generateSubroutineCall(term.value, classSymbolTable, functionSymbolTable, className);
    return outVm;
  }

  if (term.type === 'keywordConstant') {
    outVm += generateKeywordConstant(term.value);
    return outVm;
  }

  if (term.type === 'stringConstant') {
    outVm += `push constant ${term.value.length}\n`;
    outVm += 'call String.new 1\n';
    for (let i = 0; i < term.value.length; i++) {
      outVm += `push constant ${term.value[i].charCodeAt(0)}\n`;
      outVm += 'call String.appendChar 2\n';
    }
    return outVm;
  }

  if (term.type === 'array') {
    let variable = functionSymbolTable[term.name];
    if (!variable) variable = classSymbolTable[term.name];
    if (!variable) throw new Error('variable not found');
    outVm += generateExpression(term.expression, classSymbolTable, functionSymbolTable, className);
    outVm += `push ${variable.kind} ${variable.index}\n`;

    outVm += 'add\n';
    outVm += 'pop pointer 1\n';
    outVm += 'push that 0\n';
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

const generateKeywordConstant = (keyword: KeywordConstantTerm['value']) => {
  switch (String(keyword)) {
    case 'true':
      return 'push constant 0\nnot\n';
    case 'false':
      return 'push constant 0\n';
    case 'this':
      return 'push pointer 0\n';
    case 'null':
      return 'push constant 0\n';
    default:
      throw new Error('not implemented');
  }
};
