const symbols: Record<string, number> = {
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
};

const destinations: Record<string, string> = {
  M: '001',
  D: '010',
  MD: '011',
  A: '100',
  AM: '101',
  AD: '110',
  AMD: '111',
};

const jumps: Record<string, string> = {
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111',
};

const a0Commands: Record<string, string> = {
  0: '101010',
  1: '111111',
  '-1': '111010',
  D: '001100',
  A: '110000',
  '!D': '001101',
  '!A': '110001',
  '-D': '001111',
  '-A': '110011',
  'D+1': '011111',
  'A+1': '110111',
  'D-1': '001110',
  'A-1': '110010',
  'D+A': '000010',
  'D-A': '010011',
  'A-D': '000111',
  'D&A': '000000',
  'D|A': '010101',
};

const a1Commands: Record<string, string> = {
  M: '110000',
  '!M': '110001',
  '-M': '110011',
  'M+1': '110111',
  'M-1': '110010',
  'D+M': '000010',
  'D-M': '010011',
  'M-D': '000111',
  'D&M': '000000',
  'D|M': '010101',
};

let nextMemoryAddress = 16;

export const assmebly = (source: string) => {
  const cleanedSource = clearSource(source);

  let lineNum = 0;
  const codeLines = [];

  // First run, find labels and add them to the symbols table
  for (const line of cleanedSource) {
    if (!line.startsWith('(')) {
      codeLines.push(line);
      lineNum += 1;
      continue;
    }
    const label = line.replaceAll('(', '').replaceAll(')', '');
    if (label in symbols) {
      console.error(`Duplicated label ${label}`);
      process.exit(1);
    }
    symbols[label] = lineNum;
  }

  let assembledCode = '';
  for (const line of codeLines) {
    if (line.startsWith('@')) {
      assembledCode += parseAcommand(line);
    } else {
      assembledCode += parseCcommand(line);
    }
  }
  return assembledCode;
};

const clearSource = (source: string) => {
  const cleanSource = [];
  const cleanedSource = source.replaceAll('\r', '').replaceAll(' ', '');
  const lines = cleanedSource.split('\n');
  for (const line of lines) {
    const [code, _] = line.split('//');
    if (code) cleanSource.push(code);
  }
  return cleanSource;
};

const parseAcommand = (codeLine: string) => {
  let symbol = codeLine.substring(1);
  let value = parseInt(symbol);

  if (isNaN(value)) {
    if (!(symbol in symbols)) {
      symbols[symbol] = nextMemoryAddress;
      nextMemoryAddress += 1;
    }
    value = symbols[symbol];
  }
  const binary = value.toString(2);
  const paddedBinary = binary.padStart(15, '0');
  return `0${paddedBinary}\n`;
};

const parseCcommand = (codeLine: string) => {
  if (!codeLine.includes('=')) {
    codeLine = `=${codeLine}`;
  }
  const [dest, compjump] = codeLine.split('=');
  const [comp, jump] = compjump.split(';');
  let asmCommand = '111';

  let compBinary = '';
  if (!comp) {
    console.error(`No comp found in ${codeLine}`);
    process.exit(1);
  }

  if (comp in a0Commands) {
    compBinary = `0${a0Commands[comp]}`;
  }

  if (comp in a1Commands) {
    compBinary = `1${a1Commands[comp]}`;
  }

  if (!compBinary) {
    console.error(`Invalid comp ${comp}`);
    process.exit(1);
  }

  let destBinary = '000';
  if (dest) {
    destBinary = destinations[dest];
    if (!destBinary) {
      console.error(`Invalid destination ${dest}`);
      process.exit(1);
    }
  }

  let jumpBinary = '000';
  if (jump) {
    if (!(jump in jumps)) {
      console.error(`Invalid jump ${jump}`);
      process.exit(1);
    }
    jumpBinary = jumps[jump];
  }
  asmCommand = `${asmCommand}${compBinary}${destBinary}${jumpBinary}\n`;
  return asmCommand;
};
