import { escapeHtml } from '../../utils';
import { Lexem } from '../../types';
import { compileSubroutineCall } from '../compileSubroutineCall';

export const compileDo = (lexems: Lexem[]) => {
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
