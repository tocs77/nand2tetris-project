import { arithmeticCommandsBinary, arithmeticCommandsUnary, compareCommand } from './arithmetic';
import { functionCommand, callCommand, returnCommand } from './functions';
import { popMemoryAccessCommand, pushMemoryAccessCommand } from './memoryAccess';
import { flowCommand } from './programFlow';
import { clearSource } from './translatorUtils';
import { commands, Command } from './types';

export const vmTranslator = (source: string, moduleName: string) => {
  const sourceCode = clearSource(source);
  let assembledText = '';
  for (const line of sourceCode) {
    const command = getCommand(line);
    const comment = `// ${line}`;
    switch (command) {
      case 'pop':
        assembledText += popMemoryAccessCommand(line, moduleName, comment);
        break;
      case 'push':
        assembledText += pushMemoryAccessCommand(line, moduleName, comment);
        break;
      case 'add':
      case 'sub':
      case 'or':
      case 'and':
        assembledText += arithmeticCommandsBinary(command, comment);
        break;
      case 'eq':
      case 'gt':
      case 'lt':
        assembledText += compareCommand(command, comment);
        break;
      case 'not':
      case 'neg':
        assembledText += arithmeticCommandsUnary(command, comment);
        break;
      case 'label':
      case 'goto':
      case 'if-goto':
        assembledText += flowCommand(line, moduleName, comment);
        break;

      case 'function':
        assembledText += functionCommand(line, moduleName, comment);
        break;
      case 'call':
        assembledText += callCommand(line, comment);
        break;
      case 'return':
        assembledText += returnCommand(comment);
        break;

      default:
        break;
    }
  }
  return assembledText;
};

const getCommand = (cmd: string): Command => {
  const command = cmd.split(' ')[0];
  if (!command) {
    console.error(`No command in line ${cmd}`);
    process.exit(1);
  }
  if (commands.includes(command as any)) {
    return command as Command;
  }
  console.error(`Unknown command ${cmd}`);
  process.exit(1);
};

export const bootstarp = () => {
  let assembledText = '';
  assembledText += '@256  //Bootstrap code\n';
  assembledText += 'D=A\n';
  assembledText += '@SP\n';
  assembledText += 'M=D\n';
  assembledText += '';
  assembledText += callCommand('call Sys.init 0', '');
  return assembledText;
};
