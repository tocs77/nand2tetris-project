import { SubroutineDec } from '../ast/types';
import { buildAST } from '../ast/buildAST';
import { generateStatement } from './generateStatement';
import { SymbolTable } from './types';

export const vmGenerator = (xml: string) => {
  const ast = buildAST(xml);
  let outVm = '';
  for (const subroutineDec of ast.subroutineDec) {
    outVm += generateSubroutineDec(subroutineDec);
  }
  console.log(outVm);
};

export const generateSubroutineDec = (subroutineDec: SubroutineDec) => {
  let outVm = '';
  const symbolTables: SymbolTable = {};
  outVm += `function ${subroutineDec.name} ${subroutineDec.parameterList.length}\n`;
  for (const statement of subroutineDec.subroutineBody.statements) {
    outVm += generateStatement(statement, symbolTables);
  }
  return outVm;
};
