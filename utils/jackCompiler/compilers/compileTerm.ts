import { escapeHtml } from '../utils';
import { Lexem } from '../types';
import { compileSubroutineCall } from './compileSubroutineCall';
import { compileExpression } from './compileExpression';

export const compileTerm = (lexems: Lexem[]) => {
  let outXml = '<term>\n';

  outXml += parseTerm(lexems);

  outXml += '</term>\n';
  return outXml;
};

export const parseTerm = (lexems: Lexem[]) => {
  if (lexems[0].type === 'identifier') {
    if (lexems[1].value === '[') {
      return compileArrayIndex(lexems);
    }
    if (lexems[1].value === '(') {
      return compileSubroutineCall(lexems);
    }
    if (lexems[1].value === '.') {
      return compileSubroutineCall(lexems);
    }

    let lexem = lexems.shift();
    return `<identifier>${lexem.value}</identifier>\n`;
  }

  if (lexems[0].type === 'integerConstant') {
    let lexem = lexems.shift();
    return `<integerConstant>${lexem.value}</integerConstant>\n`;
  }

  if (lexems[0].type === 'stringConstant') {
    let lexem = lexems.shift();
    return `<stringConstant>${lexem.value}</stringConstant>\n`;
  }

  if (lexems[0].type === 'keyword') {
    let lexem = lexems.shift();
    if (lexem.value !== 'true' && lexem.value !== 'false' && lexem.value !== 'null' && lexem.value !== 'this') {
      throw new Error(`Expected KeywordConstant ${lexem.type}-${lexem.value}`);
    }
    return `<keyword>${lexem.value}</keyword>\n`;
  }
  if (lexems[0].value === '(') {
    let lexem = lexems.shift();
    let outXml = `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

    outXml += compileExpression(lexems);

    lexem = lexems.shift();
    if (lexem.type !== 'symbol' && lexem.value !== '(') {
      throw new Error(`Expected ( ${lexem.type}-${lexem.value}`);
    }
    outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

    return outXml;
  }

  if (lexems[0].value === '-' || lexems[0].value === '~') {
    let lexem = lexems.shift();

    let outXml = `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

    outXml += compileTerm(lexems);
    return outXml;
  }

  throw new Error(`Error parsing term ${lexems[0].type}-${lexems[0].value}`);
};

export const compileArrayIndex = (lexems: Lexem[]) => {
  let lexem = lexems.shift();
  if (lexem.type !== 'identifier') {
    throw new Error(`Expected identifier ${lexem.type}-${lexem.value}`);
  }
  let outXml = `<identifier>${lexem.value}</identifier>\n`;
  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== '[') {
    throw new Error(`Expected [ ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;

  outXml += compileExpression(lexems);

  lexem = lexems.shift();
  if (lexem.type !== 'symbol' && lexem.value !== ']') {
    throw new Error(`Expected ] ${lexem.type}-${lexem.value}`);
  }
  outXml += `<symbol> ${escapeHtml(lexem.value)} </symbol>\n`;
  return outXml;
};
