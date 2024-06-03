import { escapeHtml } from '../utils';
import { Lexem } from '../types';
import { compileTerm } from './compileTerm';

export const compileExpression = (lexems: Lexem[]) => {
  let outXml = '<expression>\n';

  outXml += compileTerm(lexems);

  // compile (op term)*
  while (true) {
    if (lexems.length === 0) break;
    const { type, value } = lexems[0];
    if (type !== 'symbol') break;
    if (
      value !== '+' &&
      value !== '-' &&
      value !== '*' &&
      value !== '/' &&
      value !== '&' &&
      value !== '|' &&
      value !== '<' &&
      value !== '>' &&
      value !== '='
    )
      break;

    let lexem = lexems.shift();
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
    outXml += compileTerm(lexems);
  }
  outXml += '</expression>\n';

  return outXml;
};
