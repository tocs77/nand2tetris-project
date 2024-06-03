import { Lexem } from '../types';

import { compileLet } from './statements/compileLet';
import { compileDo } from './statements/compileDo';
import { compileIf } from './statements/compileIf';
import { compileWhile } from './statements/compileWhile';
import { compileReturn } from './statements/compileReturn';

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
