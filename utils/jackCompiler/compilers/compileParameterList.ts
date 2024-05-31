import { escapeHtml } from '../utils';
import { Lexem } from '../types';
import { compileType } from './compileType';

export const compileParameterList = (lexems: Lexem[]) => {
  if (lexems.length === 0) return '';
  let outXml = '<parameterList>';
  if (lexems[0].type === 'symbol' && lexems[0].value === ')') {
    outXml += '</parameterList>';
    return outXml;
  }

  outXml += compileType(lexems);

  let lexem = lexems.shift();
  if (lexem.type !== 'identifier') {
    console.log(outXml);
    throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
  }
  outXml += `<identifier> ${lexem.value} </identifier>\n`;

  while (lexems.length > 0) {
    // compile (',' type varName)*
    if (lexems[0].type === 'symbol' && lexems[0].value === ')') break;

    lexem = lexems.shift();
    if (lexem.type !== 'symbol' && lexem.value !== ',') {
      throw new Error(`Expected , or ; ${lexem.type}-${lexem.value}`);
    }
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

    outXml += compileType(lexems);

    lexem = lexems.shift();
    if (lexem.type !== 'identifier') {
      throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
    }
    outXml += `<identifier> ${lexem.value} </identifier>\n`;
  }
  outXml += '</parameterList>';
  return outXml;
};
