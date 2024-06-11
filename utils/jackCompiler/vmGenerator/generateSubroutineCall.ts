import { SubroutineCall } from '../ast/types';
import { generateExpression } from './generateExpression';
import { SymbolTable } from './types';

export const generateSubroutineCall = (
  subroutineCall: SubroutineCall,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
) => {
  let outVm = '';

  for (const expression of subroutineCall.expressionList) {
    outVm += generateExpression(expression, classSymbolTable, functionSymbolTable);
  }

  if (functionSymbolTable['this']) {
    outVm += `call ${functionSymbolTable['this'].type}.${subroutineCall.subroutineName} ${subroutineCall.expressionList.length}`;
  } else {
    outVm += `call ${subroutineCall.varOrClassName}.${subroutineCall.subroutineName} ${subroutineCall.expressionList.length}`;
  }
  return outVm;
};
