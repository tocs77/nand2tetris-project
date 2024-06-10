import util from 'util';

import { XMLParser } from 'fast-xml-parser';
import { ClassNode } from './types';
import { buildClassVarDec } from './buildClassVarDec';
import { buildSubroutineDec } from './buildsubroutineDec';

export const buildAST = (xmlTree: string): ClassNode => {
  const cn: ClassNode = { name: '', classVarDec: [], subroutineDec: [] };
  const parser = new XMLParser({ preserveOrder: true, alwaysCreateTextNode: true, ignoreAttributes: true });
  const data = parser.parse(xmlTree)[0].class;

  for (const lexem of data) {
    for (const k in lexem) {
      if (k === 'identifier') cn.name = lexem[k][0]['#text'];
      if (k === 'classVarDec') cn.classVarDec = cn.classVarDec.concat(buildClassVarDec(lexem[k]));
      if (k === 'subroutineDec') cn.subroutineDec.push(buildSubroutineDec(lexem[k], cn.name));
      break;
    }
  }
  return cn;
  // console.log(util.inspect(cn, { showHidden: false, depth: null, colors: true }));
};
