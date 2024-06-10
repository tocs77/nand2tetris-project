import { SymbolKind, SymbolTable, SymbolType } from './types';

export const addSymbolTableEntry = (symbolTable: SymbolTable, name: string, type: SymbolType, kind: SymbolKind) => {
  if (name in symbolTable) {
    throw new Error(`Symbol ${name} already exists`);
  }
  let index = 0;
  for (const key in symbolTable) {
    if (symbolTable[key].kind === kind) index++;
  }
  symbolTable[name] = { name, type, kind, index };
};
