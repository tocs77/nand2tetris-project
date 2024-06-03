import { escapeHtml } from '../utils';
import { Lexem } from '../types';
import { compileExpression } from './compileExpression';

export const compileSubroutineCall = (lexems: Lexem[]) => {
  let lexem = lexems.shift();
  if (lexem.type !== 'identifier') throw new Error('Expected identifier');
  let outXml = `<identifier>${lexem.value}</identifier>\n`;

  lexem = lexems.shift();
  if (lexem.type === 'symbol' && lexem.value === '.') {
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
    lexem = lexems.shift();
    if (lexem.type !== 'identifier') throw new Error('Expected identifier');
    outXml += `<identifier>${lexem.value}</identifier>\n`;
    lexem = lexems.shift();
  }

  if (lexem.type !== 'symbol' || lexem.value !== '(') throw new Error(`Expected ( got ${lexem.value}`);
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  if (lexems[0].value === ')') {
    //empty expression list
    outXml += '<expressionList>\n';
    outXml += '</expressionList>\n';
    lexem = lexems.shift();
    if (lexem.type !== 'symbol' || lexem.value !== ')') throw new Error(`Expected ) got ${lexem.value}`);
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
    return outXml;
  }

  outXml += compileExpressionList(lexems);
  lexem = lexems.shift();
  if (lexem.type !== 'symbol' || lexem.value !== ')') throw new Error(`Expected ) got ${lexem.value}`);
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  return outXml;
};

const compileExpressionList = (lexems: Lexem[]) => {
  let outXml = '<expressionList>\n';
  outXml += compileExpression(lexems);

  while (true) {
    if (lexems.length === 0) break;
    if (lexems[0].value !== ',') break;
    let lexem = lexems.shift();
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
    outXml += compileExpression(lexems);
  }
  outXml += '</expressionList>\n';
  return outXml;
};
