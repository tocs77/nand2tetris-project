import { escapeHtml } from '../../utils';
import { Lexem } from '../../types';
import { compileExpression } from '../compileExpression';

export const compileReturn = (lexems: Lexem[]) => {
  let outXml = '<returnStatement>\n';
  let lexem = lexems.shift();
  if (lexem.type !== 'keyword' && lexem.value !== 'return') {
    throw new Error(`Expected do keyword ${lexem.type}-${lexem.value}`);
  }
  outXml += `<keyword> ${escapeHtml(lexem.value)} </keyword>\n`;

  if (lexems[0].value !== ';') outXml += compileExpression(lexems);

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== ';') {
    throw new Error(`Expected ; ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += '</returnStatement>\n';
  return outXml;
};
