import { Lexem } from '../types';
import { compileType } from './compileType';
import { escapeHtml } from '../utils';

export function compileClassVarDec(lexems: Lexem[]) {
  if (lexems.length === 0) return '';

  if (lexems[0].type !== 'keyword') return '';
  if (lexems[0].value !== 'static' && lexems[0].value !== 'field') return '';
  let outXml = `<classVarDec>\n`;
  let lexem = lexems.shift();
  outXml += `<keyword> ${lexem.value} </keyword>\n`;

  outXml += compileType(lexems);

  lexem = lexems.shift();
  if (lexem.type !== 'identifier') {
    console.log(outXml);
    throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
  }
  outXml += `<identifier> ${lexem.value} </identifier>\n`;

  while (lexems.length > 0) {
    // compile (',' varName)*
    lexem = lexems.shift();
    if (lexem.type === 'symbol' && lexem.value === ';') {
      outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
      break;
    }
    if (lexem.type !== 'symbol' && lexem.value !== ',') {
      throw new Error(`Expected , or ; ${lexem.type}-${lexem.value}`);
    }
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
    lexem = lexems.shift();
    if (lexem.type !== 'identifier') {
      throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
    }
    outXml += `<identifier> ${lexem.value} </identifier>\n`;
  }

  outXml += `</classVarDec>\n`;
  outXml += compileClassVarDec(lexems);
  return outXml;
}
