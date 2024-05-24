import { Command } from './types';

export const arithmeticCommandsBinary = (command: Command, comment: string) => {
  let outCode = '';

  //decrement sp
  outCode += `@SP ${comment}\n`;
  outCode += 'M=M-1\n';
  // put first operator from stack to D
  outCode += '@SP\n';
  outCode += 'A=M\n';
  outCode += 'D=M\n';
  // place second operator in A
  outCode += '@SP\n';
  outCode += 'A=M\n';
  outCode += 'A=A-1\n';

  switch (command) {
    case 'add':
      outCode += 'M=M+D\n';
      break;
    case 'sub':
      outCode += 'M=M-D\n';
      break;
    case 'or':
      outCode += 'M=D|M\n';
      break;
    case 'and':
      outCode += 'M=D&M\n';
      break;
  }
  return outCode;
};
export const arithmeticCommandsUnary = (command: Command, comment: String) => {
  let outCode = '';

  outCode += `@SP ${comment}\n`;
  outCode += 'A=M\n';
  outCode += 'A=A-1\n'; // get first operator from stack
  switch (command) {
    case 'not':
      outCode += 'M=!M\n';
      break;
    case 'neg':
      outCode += 'M=-M\n';
  }
  return outCode;
};

export const compareCommand = (command: Command, comment: string) => {
  const trueLabel = `trueLabel${Math.random()}`;
  const writeResultLabel = `writeResultLabel${Math.random()}`;
  let outCode = '';
  //decrement sp
  outCode += `@SP ${comment}\n`;
  outCode += 'M=M-1\n';
  // put first operator from stack to D
  outCode += '@SP\n';
  outCode += 'A=M\n';
  outCode += 'D=M\n';

  // place second operator in A
  outCode += '@SP\n';
  outCode += 'A=M\n';
  outCode += 'A=A-1\n';

  outCode += 'D=M-D\n';
  outCode += `@${trueLabel}\n`;

  switch (command) {
    case 'eq':
      outCode += 'D;JEQ\n';
      break;
    case 'gt':
      outCode += 'D;JGT\n';
      break;
    case 'lt':
      outCode += 'D;JLT\n';
      break;
  }
  // not equa; write 0

  outCode += '@0\n';
  outCode += 'D=A\n';
  outCode += `@${writeResultLabel}\n`;
  outCode += '0;JMP\n';
  outCode += `(${trueLabel})\n`;
  // equal write -1
  outCode += '@0\n';
  outCode += 'D=A\n';
  outCode += 'D=D-1\n';
  outCode += `(${writeResultLabel})\n`;
  //decrement sp
  outCode += '@SP\n';
  outCode += 'A=M\n';
  outCode += 'A=A-1\n';

  outCode += 'M=D\n';
  return outCode;
};
