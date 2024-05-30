const keywordsList = [
  'class',
  'constructor',
  'function',
  'method',
  'field',
  'static',
  'var',
  'int',
  'char',
  'boolean',
  'void',
  'true',
  'false',
  'null',
  'this',
  'let',
  'do',
  'if',
  'else',
  'while',
  'return',
] as const;
export type Keyword = (typeof keywordsList)[number];
export const keywords = new Set(keywordsList);

const symbolsList = ['{', '}', '(', ')', '[', ']', '.', ',', ';', '+', '-', '*', '/', '&', '|', '<', '>', '=', '~'] as const;
export type Symbol = (typeof symbolsList)[number];
export const symbols = new Set(symbolsList);

interface KeywordLexem {
  type: 'keyword';
  value: Keyword;
}

interface SymbolLexem {
  type: 'symbol';
  value: Symbol;
}

interface IdentifierLexem {
  type: 'identifier';
  value: string;
}

interface IntConstLexem {
  type: 'integerConstant';
  value: number;
}

interface StringConstLexem {
  type: 'stringConstant';
  value: string;
}

export type Lexem = KeywordLexem | SymbolLexem | IdentifierLexem | IntConstLexem | StringConstLexem;
