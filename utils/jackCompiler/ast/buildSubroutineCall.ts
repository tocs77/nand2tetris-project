import { buildExpression } from './buildExpression';
import { SubroutineCall } from './types';

export const buildSubroutineCall = (data: any): SubroutineCall => {
  const scall: SubroutineCall = { callType: 'function', subroutineName: '', expressionList: [] };
  if (data[1]?.['symbol'][0]['#text'] === '.') {
    // method call
    scall.callType = 'method';
    scall.varOrClassName = data[0]['identifier'][0]['#text'];
    scall.subroutineName = data[2]['identifier'][0]['#text'];
  } else {
    //function call
    scall.subroutineName = data[0]['identifier'][0]['#text'];
  }
  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'expressionList') {
        for (const expression of lexem[k]) {
          if (expression['expression']) scall.expressionList.push(buildExpression(expression['expression']));
        }
      }
      break;
    }
  }
  return scall;
};
