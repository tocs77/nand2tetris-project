import { Parameter, SubroutineDec } from './types';

export const buildSubroutineDec = (data: any, className: string): SubroutineDec => {
  // console.log('data', data);

  const sd: SubroutineDec = { type: 'constructor', name: '', returnType: '', parameterList: [], subroutineBody: [] };

  let lexem = data.shift();
  sd.type = lexem['keyword'][0]['#text'];

  lexem = data.shift();
  sd.returnType = lexem['keyword'][0]['#text'];

  lexem = data.shift();
  sd.name = `${className}.${lexem['identifier'][0]['#text']}`;

  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'parameterList') sd.parameterList = buildParameterList(lexem[k]);
      if (k === 'subroutineBody') sd.subroutineBody = buildSubroutineBody(lexem[k]);
      // if (k === 'subroutineDec') cn.subroutineDec.push(buildSubroutineDec(lexem[k]));
      //console.log(k, lexem[k]);
      break;
    }
  }
  return sd;
};

const buildParameterList = (data: any) => {
  const parameterList: Parameter[] = [];
  // todo parma list
  return parameterList;
};

const buildSubroutineBody = (data: any) => {
  const subroutineBody: any[] = [];
  console.log('buildSubroutineBody', data);
  for (const lexem of data) {
    for (const k in lexem) {
      console.log(k, lexem[k]);
      break;
    }
  }
  return subroutineBody;
};
