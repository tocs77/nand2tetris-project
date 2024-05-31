import { Lexem } from 'jackCompiler/types';

export function compileType(lexems: Lexem[]) {
  if (lexems.length === 0) return '';
  let lexem = lexems.shift();
  if (lexem.type === 'identifier') return `<identifier> ${lexem.value} </identifier>\n`;
  if (lexem.type === 'keyword') {
    if (lexem.value !== 'int' && lexem.value !== 'char' && lexem.value !== 'boolean') {
      throw new Error(`Expected int, char or boolean ${lexem.type}-${lexem.value}`);
    }
    return `<keyword> ${lexem.value} </keyword>\n`;
  }
  throw new Error(`Expected identifier or keyword ${lexem.type}-${lexem.value}`);
}
