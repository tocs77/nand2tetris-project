import { keywords, Keyword, Symbol, symbols } from './types';

export function clearComments(source: string) {
  source = removeBlockComments(source);
  source = source.replace(/\t|\r/g, ' ');
  const lines = source.split('\n');
  let clearedSource = '';
  for (const line of lines) {
    const [code, _] = line.split('//');
    clearedSource += code;
  }

  return clearedSource;
}

function removeBlockComments(source: string) {
  let clearedSource = '';
  let isBlockComment = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (isBlockComment) {
      if (char === '*' && source[i + 1] === '/') {
        isBlockComment = false;
        i++;
      }
      continue;
    }

    if (char != '/' && !isBlockComment) {
      clearedSource += char;
      continue;
    }
    if (char === '/' && source[i + 1] === '*') {
      isBlockComment = true;
      i++;
      continue;
    }
    clearedSource += char;
  }
  return clearedSource;
}

export function isKeyword(str: string): str is Keyword {
  if (keywords.has(str as any)) return true;
  return false;
}

export function isSymbol(str: string): str is Symbol {
  if (symbols.has(str as any)) return true;
  return false;
}

export function escapeHtml(val: string | number): string {
  let str = String(val);
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
