import { ClassVarDec } from './types';

export const buildClassVarDec = (data: any): ClassVarDec[] => {
  const classVarDec: ClassVarDec[] = [];
  console.log('buildClassVarDec', data);
  let lexem = data.shift();
  const varType = lexem['keyword'][0]['#text'];

  lexem = data.shift();
  const type = lexem['keyword'][0]['#text'];

  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'identifier') classVarDec.push({ varType, type, name: lexem[k][0]['#text'] });
      break;
    }
  }
  console.log('buildClassVarDec', classVarDec);
  return classVarDec;
};
