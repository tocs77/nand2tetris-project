import { SubroutineCall } from '../ast/types';
import { generateExpression } from './generateExpression';
import { SymbolTable } from './types';

export const generateSubroutineCall = (
  subroutineCall: SubroutineCall,
  classSymbolTable: SymbolTable,
  functionSymbolTable: SymbolTable,
  className: string,
) => {
  let outVm = '';

  for (const expression of subroutineCall.expressionList) {
    outVm += generateExpression(expression, classSymbolTable, functionSymbolTable, className);
  }

  let variable = functionSymbolTable[subroutineCall.varOrClassName];
  if (!variable) variable = classSymbolTable[subroutineCall.varOrClassName];

  let calledClass = variable ? variable.type : subroutineCall.varOrClassName;
  let thisAdded = 0;
  if (!calledClass) {
    outVm += 'push pointer 0\n'; // call for current class method. Add this
    calledClass = className;
    thisAdded++;
  }

  if (variable) {
    outVm += `push ${variable.kind} ${variable.index}\n`;
    thisAdded++;
  }

  outVm += `call ${calledClass}.${subroutineCall.subroutineName} ${subroutineCall.expressionList.length + thisAdded}\n`;

  return outVm;
};
