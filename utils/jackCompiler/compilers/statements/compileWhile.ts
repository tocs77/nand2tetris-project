import { escapeHtml } from '../../utils';
import { Lexem } from '../../types';
import { compileExpression } from '../compileExpression';
import { compileStatements } from '../compileStatements';

export const compileWhile = (lexems: Lexem[]) => {
  let outXml = '<whileStatement>\n';
  let lexem = lexems.shift();
  if (lexem.type !== 'keyword' && lexem.value !== 'while') {
    throw new Error(`Expected do keyword ${lexem.type}-${lexem.value}`);
  }
  outXml += `<keyword> ${escapeHtml(lexem.value)} </keyword>\n`;

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '(') {
    throw new Error(`Expected ( ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  outXml += compileExpression(lexems);

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== ')') {
    throw new Error(`Expected ( ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '{') {
    throw new Error(`Expected ( ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += compileStatements(lexems);

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '}') {
    throw new Error(`Expected ( ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += '</whileStatement>\n';
  return outXml;
};
