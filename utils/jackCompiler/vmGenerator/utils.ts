import { SymbolKind, SymbolTable, SymbolType } from './types';

interface AddSymbolTableEntryArgs {
  symbolTable: SymbolTable;
  name: string;
  type: SymbolType;
  kind: SymbolKind;
}

export const addSymbolTableEntry = ({ kind, name, symbolTable, type }: AddSymbolTableEntryArgs) => {
  if (name in symbolTable) {
    throw new Error(`Symbol ${name} already exists`);
  }
  let index = 0;
  for (const key in symbolTable) {
    if (symbolTable[key].kind === kind) index++;
  }
  symbolTable[name] = { name, type, kind, index };
};
