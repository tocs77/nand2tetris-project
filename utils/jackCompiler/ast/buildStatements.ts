import { buildExpression } from './buildExpression';
import { buildSubroutineCall } from './buildSubroutineCall';
import { DoStatement, Expression, IfStatement, LetStatement, ReturnStatement, Statement, WhileStatement } from './types';

export const buildStatements = (data: any): Statement[] => {
  const statements: Statement[] = [];
  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'letStatement') statements.push(buildLetStatement(lexem[k]));
      if (k === 'doStatement') statements.push(buildDoStatement(lexem[k]));
      if (k === 'ifStatement') statements.push(buildIfStatement(lexem[k]));
      if (k === 'whileStatement') statements.push(buildWhileStatement(lexem[k]));
      if (k === 'returnStatement') statements.push(buildReturnStatement(lexem[k]));
      break;
    }
  }
  return statements;
};

export const buildLetStatement = (data: any): LetStatement => {
  //  const statement: LetStatement = { type: 'letStatement' };
  data.shift(); // remove let keyword
  let lexem = data.shift();
  const varName = lexem['identifier'][0]['#text'];

  let arrayExpression: Expression;
  lexem = data.shift();
  if (lexem['symbol'][0]['#text'] === '[') {
    lexem = data.shift();
    arrayExpression = buildExpression(lexem['expression']);
    data.shift(); // remove ]
    data.shift(); // remove =
  }

  lexem = data.shift();
  const expression = buildExpression(lexem['expression']);
  return { type: 'letStatement', varName, expression, arrayExpression };
};

export const buildIfStatement = (data: any): IfStatement => {
  let condition: Expression;
  let statements: Statement[];
  let elseStatements: Statement[];
  let elseMode = false;
  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'keyword' && lexem[k][0]['#text'] === 'else') elseMode = true;
      if (k === 'expression') condition = buildExpression(lexem[k]);
      if (k === 'statements' && !elseMode) statements = buildStatements(lexem[k]);
      if (k === 'statements' && elseMode) elseStatements = buildStatements(lexem[k]);

      break;
    }
  }
  return { type: 'ifStatement', condition, statements, elseStatements };
};

export const buildDoStatement = (data: any): DoStatement => {
  data.shift(); // remove do keyword
  const scall = buildSubroutineCall(data);
  return { type: 'doStatement', subroutineCall: scall };
};

export const buildWhileStatement = (data: any): WhileStatement => {
  let condition: Expression;
  let statements: Statement[];
  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'expression') condition = buildExpression(lexem[k]);
      if (k === 'statements') statements = buildStatements(lexem[k]);
      break;
    }
  }
  return { type: 'whileStatement', condition, statements };
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
