import { Lexem, symbols } from './types';
import { clearComments, escapeHtml, isKeyword, isSymbol } from './utils';

export function tokenizer(source: string) {
  source = clearComments(source);
  const lexems: Lexem[] = [];
  let head = '';
  let isString = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (char === '"') isString = !isString;
    if (char === ' ' && !isString) {
      if (head !== '') {
        lexems.push(parseToken(head));
        head = '';
      }
      continue;
    }
    if (symbols.has(char as any) && !isString) {
      if (head !== '') {
        lexems.push(parseToken(head));
        head = '';
      }
      lexems.push(parseToken(char));
      continue;
    }
    head += char;
  }
  return lexems;
}

function parseToken(token: string): Lexem {
  if (isKeyword(token)) return { type: 'keyword', value: token };
  if (isSymbol(token)) return { type: 'symbol', value: token };
  if (token[0] === '"' && token[token.length - 1] === '"')
    return { type: 'stringConstant', value: token.slice(1, token.length - 1) };
  if (/[a-zA-Z]/.test(token.charAt(0))) return { type: 'identifier', value: token };
  const intVal = Number(token);
  if (!isNaN(intVal)) return { type: 'integerConstant', value: intVal };
  throw new Error(`Unknown token: ${token}`);
}

export function tokenizerXml(source: string) {
  const tokens = tokenizer(source);
  let outXml = '<tokens>\n';
  for (const token of tokens) {
    outXml += `<${token.type}> ${escapeHtml(token.value)} </${token.type}>\n`;
  }
  outXml += '</tokens>';
  return outXml;
}
