export interface SymbolEntry {
  name: string;
  kind: 'static' | 'field' | 'argument' | 'local';
  type: 'string' | 'int' | 'boolean' | string;
  index: number;
}

export type SymbolKind = SymbolEntry['kind'];
export type SymbolType = SymbolEntry['type'];

export interface SymbolTable {
  [key: string]: SymbolEntry;
}
