import { buildSubroutineCall } from './buildSubroutineCall';
import { Expression, Term } from './types';

export const buildExpression = (data: any): Expression => {
  let lexem = data.shift();
  const term = buildTerm(lexem['term']);
  const expression: Expression = { term, terms: [] };
  while (true) {
    if (data.length === 0) break;
    const op = data[0]?.['symbol'][0]['#text'];
    if (!op || op === ';') break;
    data.shift(); // remove operator
    lexem = data.shift();
    const opTerm = { operator: op, term: buildTerm(lexem['term']) };
    expression.terms.push(opTerm);
  }
  return expression;
};

const buildTerm = (data: any): Term => {
  const [lexemType, value] = getKeyValue(data[0]);
  if (lexemType === 'integerConstant') return { type: 'integerConstant', value: Number(value) };
  if (lexemType === 'stringConstant') return { type: 'stringConstant', value: value };
  if (lexemType === 'keyword') return { type: 'keywordConstant', value: value };
  if (lexemType === 'symbol' && (value === '~' || value === '-')) {
    for (const lexem of data) {
      for (const k in lexem) {
        if (k === 'term') return { type: 'unaryOp', operator: value, term: buildTerm(lexem[k]) };
      }
    }
  }
  if (lexemType === 'symbol' && value === '(') {
    for (const lexem of data) {
      for (const k in lexem) {
        if (k === 'expression') return { type: 'paren', expression: buildExpression(lexem[k]) };
      }
    }
  }

  if (lexemType === 'identifier') {
    const [lexType, val] = getKeyValue(data[1]);
    if (lexType !== 'symbol') return { type: 'varName', value };

    if (val === '[') {
      for (const lexem of data) {
        for (const k in lexem) {
          if (k === 'expression') return { type: 'array', name: value, expression: buildExpression(lexem[k]) };
        }
      }
    }
    if (val === '(') {
      return { type: 'subroutineCall', value: buildSubroutineCall(data) };
    }
  }
  throw new Error('Build term error');
};

export const getKeyValue = (data: any) => {
  for (const k in data) {
    return [k, data[k][0]['#text']];
  }
  return ['', ''];
};
