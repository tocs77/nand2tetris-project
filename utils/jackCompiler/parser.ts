import { compileClassVarDec } from './compilers/compileClassVarDec';
import { compileSubroutine } from './compilers/compileSubroutine';
import { Lexem } from './types';

export function parser(lexems: Lexem[]) {
  let outXml = '';
  outXml += compileClass(lexems);
  return outXml;
}

function compileClass(lexems: Lexem[]) {
  let outXml = '';
  let lexem = lexems.shift();
  if (lexem.type !== 'keyword' && lexem.value !== 'class') {
    throw new Error(`Expected class keyword ${lexem.type}-${lexem.value}`);
  }
  outXml += `<class>\n`;

  lexem = lexems.shift();
  if (lexem.type !== 'identifier') {
    throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
  }
  outXml += `<identifier> ${lexem.value} </identifier>\n`;

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '{') {
    throw new Error(`Expected { ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${lexem.value} </symbol>\n`;

  outXml += compileClassVarDec(lexems);
  outXml += compileSubroutine(lexems);

  return outXml;

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '}') {
    throw new Error(`Expected } ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${lexem.value} </symbol>\n`;
  outXml += `</class>\n`;
  return outXml;
}
