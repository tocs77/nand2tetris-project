import { Lexem } from '../types';
import { compileType } from './compileType';

export const compileVarDec = (lexems: Lexem[]) => {
  if (lexems.length === 0) return '';

  if (lexems[0].type !== 'keyword') return '';
  if (lexems[0].value !== 'var') return '';
  let outXml = `<varDec>\n`;
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
      outXml += `<symbol> ${lexem.value} </symbol>\n`;
      break;
    }
    if (lexem.type !== 'symbol' && lexem.value !== ',') {
      throw new Error(`Expected , or ; ${lexem.type}-${lexem.value}`);
    }
    outXml += `<symbol> ${lexem.value} </symbol>\n`;
    lexem = lexems.shift();
    if (lexem.type !== 'identifier') {
      throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
    }
    outXml += `<identifier> ${lexem.value} </identifier>\n`;
  }

  outXml += `</varDec>\n`;
  outXml += compileVarDec(lexems);
  return outXml;
};
