import { popMemoryAccessCommand } from './memoryAccess';

export const functionCommand = (cmd: string, moduleName: string, comment: string) => {
  const [_, funcName, args] = cmd.split(' ');
  let assembledText = '';
  assembledText += `(${funcName}) ${comment}\n`;
  const argNum = Number(args);
  assembledText += 'D=0\n';
  for (let i = 0; i < argNum; i++) {
    // push zero in local segment
    assembledText += '@SP\n';
    assembledText += 'A=M\n';
    assembledText += 'M=D\n';
    // increment SP
    assembledText += '@SP\n';
    assembledText += 'M=M+1\n';
  }
  return assembledText;
};
export const returnCommand = (comment: string) => {
  let assembledText = '';
  // FRAME = LCL  FRAME is a temporary variable R13
  assembledText += `@LCL ${comment}\n`;
  assembledText += 'D=M\n';
  assembledText += '@R13\n';
  assembledText += 'M=D\n';

  // RET = *(FRAME-5) Put the return-address in a temp. var. R14
  assembledText += '@5\n';
  assembledText += 'D=A\n';
  assembledText += '@R13\n';
  assembledText += 'A=M-D\n';
  assembledText += 'D=M\n';
  assembledText += '@R14\n';
  assembledText += 'M=D\n';

  // *ARG = pop() Reposition the return value for the caller
  assembledText += '@SP\n';
  assembledText += 'A=M-1\n';
  assembledText += 'D=M\n'; // save return value in D
  assembledText += '@ARG\n';
  assembledText += 'A=M\n';
  assembledText += 'M=D\n';

  // SP = ARG+1 Restore SP of the caller
  assembledText += '@ARG\n';
  assembledText += 'D=M+1\n';
  assembledText += '@SP\n';
  assembledText += 'M=D\n';
  // THAT = *(FRAME-1) Restore THAT of the caller
  assembledText += '@1\n';
  assembledText += 'D=A\n';
  assembledText += '@R13\n';
  assembledText += 'A=M-D\n';
  assembledText += 'D=M\n';
  assembledText += '@THAT\n';
  assembledText += 'M=D\n';
  // THIS = *(FRAME-2) Restore THIS of the caller
  assembledText += '@2\n';
  assembledText += 'D=A\n';
  assembledText += '@R13\n';
  assembledText += 'A=M-D\n';
  assembledText += 'D=M\n';
  assembledText += '@THIS\n';
  assembledText += 'M=D\n';
  // ARG = *(FRAME-3) Restore ARG of the caller
  assembledText += '@3\n';
  assembledText += 'D=A\n';
  assembledText += '@R13\n';
  assembledText += 'A=M-D\n';
  assembledText += 'D=M\n';
  assembledText += '@ARG\n';
  assembledText += 'M=D\n';
  // LCL = *(FRAME-4) Restore LCL of the caller
  assembledText += '@4\n';
  assembledText += 'D=A\n';
  assembledText += '@R13\n';
  assembledText += 'A=M-D\n';
  assembledText += 'D=M\n';
  assembledText += '@LCL\n';
  assembledText += 'M=D\n';
  // goto RET Goto return-address (in the caller’s code)
  assembledText += '@R14\n';
  assembledText += 'A=M\n';
  assembledText += '0;JMP\n';
  return assembledText;
};
export const callCommand = (cmd: string, comment: string) => {
  const [_, funcName, args] = cmd.split(' ');
  let assembledText = '';
  const returnLabel = `${funcName}$ret.${Math.random()}`;

  const argNum = Number(args);
  // push return-address (Using the label declared below)
  assembledText += `@${returnLabel} ${comment}\n`;
  assembledText += 'D=A\n';
  assembledText += '@SP\n';
  assembledText += 'A=M\n';
  assembledText += 'M=D\n';
  // increase SP
  assembledText += '@SP\n';
  assembledText += 'M=M+1\n';

  // push LCL Save LCL of the calling function
  assembledText += '@LCL\n';
  assembledText += 'D=M\n';
  assembledText += '@SP\n';
  assembledText += 'A=M\n';
  assembledText += 'M=D\n';
  // increase SP
  assembledText += '@SP\n';
  assembledText += 'M=M+1\n';

  // push ARG Save ARG of the calling function
  assembledText += '@ARG\n';
  assembledText += 'D=M\n';
  assembledText += '@SP\n';
  assembledText += 'A=M\n';
  assembledText += 'M=D\n';
  // increase SP
  assembledText += '@SP\n';
  assembledText += 'M=M+1\n';

  // push THIS Save THIS of the calling function
  assembledText += '@THIS\n';
  assembledText += 'D=M\n';
  assembledText += '@SP\n';
  assembledText += 'A=M\n';
  assembledText += 'M=D\n';
  // increase SP
  assembledText += '@SP\n';
  assembledText += 'M=M+1\n';
  // push THAT Save THAT of the calling function
  assembledText += '@THAT\n';
  assembledText += 'D=M\n';
  assembledText += '@SP\n';
  assembledText += 'A=M\n';
  assembledText += 'M=D\n';
  // increase SP
  assembledText += '@SP\n';
  assembledText += 'M=M+1\n';

  // ARG = SP-n-5 Reposition ARG (n ¼ number of args.)
  assembledText += `@${argNum}\n`;
  assembledText += 'D=A\n';
  assembledText += '@5\n';
  assembledText += 'D=D+A\n';
  assembledText += '@SP\n';
  assembledText += 'D=M-D\n';
  assembledText += '@ARG\n';
  assembledText += 'M=D\n';
  // LCL = SP  Reposition LCL
  assembledText += '@SP\n';
  assembledText += 'D=M\n';
  assembledText += '@LCL\n';
  assembledText += 'M=D\n';
  // goto f Transfer control
  assembledText += `@${funcName}\n`;
  assembledText += '0;JMP\n';
  // (return-address) Declare a label for the return-address
  assembledText += `(${returnLabel})\n`;
  return assembledText;
};
