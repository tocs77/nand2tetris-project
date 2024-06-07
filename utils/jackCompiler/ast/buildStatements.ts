import { buildExpression } from './buildExpression';
import { buildSubroutineCall } from './buildSubroutineCall';
import { DoStatement, IfStatement, LetStatement, ReturnStatement, Statement, WhileStatement } from './types';

export const buildStatements = (data: any): Statement[] => {
  const statements: Statement[] = [];
  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'letStatement') statements.push(buildLetStatement(lexem[k]));
      if (k === 'doStatement') statements.push(buildDoStatement(lexem[k]));
      if (k === 'IfStatement') statements.push(buildIfStatement(lexem[k]));
      if (k === 'whileStatement') statements.push(buildWhileStatement(lexem[k]));
      if (k === 'returnStatement') statements.push(buildReturnStatement(lexem[k]));
      break;
    }
  }
  return statements;
};

export const buildLetStatement = (data: any): LetStatement => {
  const statement: LetStatement = { type: 'letStatement' };
  console.log('let statement', data);
  return statement;
};

export const buildIfStatement = (data: any): IfStatement => {
  const statement: IfStatement = { type: 'ifStatement' };
  return statement;
};

export const buildDoStatement = (data: any): DoStatement => {
  data.shift(); // remove do keyword
  const scall = buildSubroutineCall(data);
  return { type: 'doStatement', subroutineCall: scall };
};

export const buildWhileStatement = (data: any): WhileStatement => {
  const statement: WhileStatement = { type: 'whileStatement' };
  return statement;
};

export const buildReturnStatement = (data: any): ReturnStatement => {
  const statement: ReturnStatement = { type: 'returnStatement' };
  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'expression') statement.expression = buildExpression(lexem[k]);
      break;
    }
  }
  return statement;
};
