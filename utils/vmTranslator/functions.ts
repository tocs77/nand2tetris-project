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
export const callCommand = (cmd: string, moduleName: string, comment: string) => {};
