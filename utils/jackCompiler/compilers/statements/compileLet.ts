import { escapeHtml } from '../../utils';
import { Lexem } from '../../types';
import { compileExpression } from '../compileExpression';

export const compileLet = (lexems: Lexem[]) => {
  let outXml = '<letStatement>\n';

  let lexem = lexems.shift();
  if (lexem.type !== 'keyword' && lexem.value !== 'let') {
    throw new Error(`Expected let keyword ${lexem.type}-${lexem.value}`);
  }
  outXml += `<keyword> ${lexem.value} </keyword>\n`;

  lexem = lexems.shift();
  if (lexem.type !== 'identifier') {
    throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
  }
  outXml += `<identifier> ${lexem.value} </identifier>\n`;
  
  // parse ('[' expression ']')?
  if (lexems[0].type === 'symbol' && lexems[0].value === '[') {
    lexem = lexems.shift();
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
    outXml += compileExpression(lexems);
    lexem = lexems.shift();
    if (lexem.type !== 'symbol' && lexem.value !== ']') {
      throw new Error(`Expected ] ${lexem.type}-${lexem.value}`);
    }
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  }

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '=') {
    throw new Error(`Expected = ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  outXml += compileExpression(lexems);
  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== ';') {
    throw new Error(`Expected ; ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += '</letStatement>\n';
  return outXml;
};
