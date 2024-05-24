import { Command } from './types';

export const flowCommand = (cmd: string, moduleName: string, comment: string) => {
  const [command, label] = cmd.split(' ');

  let assembledText = '';
  switch (command as Command) {
    case 'label':
      assembledText += `(${moduleName}.${label}) ${comment}\n`;
      break;
    case 'goto':
      assembledText += `@${moduleName}.${label} ${comment}\n`;
      assembledText += `0;JMP\n`;
      break;
    case 'if-goto':
      assembledText += `@SP ${comment}\n`;
      assembledText += 'AM=M-1\n';
      assembledText += 'D=M\n';
      assembledText += `@${moduleName}.${label}\n`;
      assembledText += `D;JNE\n`;
      break;
    default:
      break;
  }
  return assembledText;
};
