import { escapeHtml } from '../utils';
import { Lexem } from '../types';
import { compileSubroutineCall } from './compileSubroutineCall';

export const compileStatements = (lexems: Lexem[]) => {
  let outXml = '<statements>';
  while (true) {
    const statement = compileStatement(lexems);
    if (statement === '') break;
    outXml += statement;
  }
  outXml += '</statements>';
  return outXml;
};

export const compileStatement = (lexems: Lexem[]) => {
  const lexem = lexems[0];
  if (lexem.type !== 'keyword') {
    return '';
  }
  if (
    lexem.value !== 'do' &&
    lexem.value !== 'let' &&
    lexem.value !== 'if' &&
    lexem.value !== 'while' &&
    lexem.value !== 'return'
  )
    return '';

  switch (lexem.value) {
    case 'let':
      return compileLet(lexems);
    case 'do':
      return compileDo(lexems);
    case 'if':
      return compileIf(lexems);
    case 'while':
      return compileWhile(lexems);
    case 'return':
      return compileReturn(lexems);
  }
};

const compileDo = (lexems: Lexem[]) => {
  let outXml = '<doStatement>';

  let lexem = lexems.shift();
  if (lexem.type !== 'keyword' && lexem.value !== 'do') {
    throw new Error(`Expected do keyword ${lexem.type}-${lexem.value}`);
  }
  outXml += `<keyword> ${lexem.value} </keyword>\n`;
  outXml += compileSubroutineCall(lexems);
  
  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== ';') {
    throw new Error(`Expected ; ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += '</doStatement>';
  return outXml;
};
const compileLet = (lexems: Lexem[]) => {};
const compileWhile = (lexems: Lexem[]) => {};
const compileIf = (lexems: Lexem[]) => {};
const compileReturn = (lexems: Lexem[]) => {};
