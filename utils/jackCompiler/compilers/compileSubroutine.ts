import { Lexem } from '../types';
import { compileType } from './compileType';
import { compileParameterList } from './compileParameterList';
import { compileVarDec } from './compileVarDec';
import { compileStatements } from './compileStatements';
import { escapeHtml } from '../utils';

export function compileSubroutine(lexems: Lexem[]) {
  if (lexems[0].type !== 'keyword') return '';
  if (lexems[0].value !== 'method' && lexems[0].value !== 'function' && lexems[0].value !== 'constructor') return '';
  let outXml = '<subroutineDec>\n';
  let lexem = lexems.shift();
  outXml += `<keyword> ${lexem.value} </keyword>\n`;

  lexem = lexems.shift();
  if (lexem.type === 'keyword' && lexem.value === 'void') {
    outXml += `<keyword> ${lexem.value} </keyword>\n`;
  } else {
    lexems.unshift(lexem);
    outXml += compileType(lexems);
  }

  //subroutineName
  lexem = lexems.shift();
  if (lexem.type !== 'identifier') throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
  outXml += `<identifier> ${lexem.value} </identifier>\n`;

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '(') throw new Error(`Expected ( ${lexem.type}-${lexem.value}`);
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  outXml += compileParameterList(lexems);
  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== ')') throw new Error(`Expected ) ${lexem.type}-${lexem.value}`);
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += '<subroutineBody>\n';

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '{') throw new Error(`Expected { ${lexem.type}-${lexem.value}`);
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  outXml += compileVarDec(lexems);
  outXml += compileStatements(lexems);
  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '}') throw new Error(`Expected } ${lexem.type}-${lexem.value}`);
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  outXml += '</subroutineBody>\n';
  outXml += `</subroutineDec>\n`;
  outXml += compileSubroutine(lexems);

  return outXml;
}
