import { buildStatements } from './buildStatements';
import { Parameter, SubroutineBody, SubroutineDec } from './types';

export const buildSubroutineDec = (data: any, className: string): SubroutineDec => {
  const sd: SubroutineDec = {
    type: 'constructor',
    name: '',
    returnType: '',
    parameterList: [],
    subroutineBody: { varDec: [], statements: [] },
  };

  let lexem = data.shift();
  sd.type = lexem['keyword'][0]['#text'];

  lexem = data.shift();
  if (lexem['keyword']) {
    sd.returnType = lexem['keyword'][0]['#text'];
  } else {
    sd.returnType = lexem['identifier'][0]['#text'];
  }

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

  while (data.length > 0) {
    const p: Parameter = { name: '', type: '' };
    let lexem = data.shift();

    try {
      p.type = lexem['keyword'][0]['#text'];
    } catch (error) {
      p.type = lexem['identifier'][0]['#text'];
    }

    lexem = data.shift();
    p.name = lexem['identifier'][0]['#text'];
    parameterList.push(p);

    if (data[0]?.['symbol'][0]['#text'] !== ',') break;
    data.shift();
  }
  return parameterList;
};

const buildSubroutineBody = (data: any): SubroutineBody => {
  const sb: SubroutineBody = { varDec: [], statements: [] };

  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'varDec') sb.varDec = sb.varDec.concat(buildVarDec(lexem[k]));
      if (k === 'statements') sb.statements = sb.statements.concat(buildStatements(lexem[k]));
      break;
    }
  }

  return sb;
};

const buildVarDec = (data: any): Parameter[] => {
  const parameterList: Parameter[] = [];
  data.shift(); // remove var

  let lexem = data.shift();
  let type;
  try {
    type = lexem['keyword'][0]['#text'];
  } catch (error) {
    type = lexem['identifier'][0]['#text'];
  }

  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'identifier') parameterList.push({ type, name: lexem[k][0]['#text'] });
      break;
    }
  }
  return parameterList;
};
