import { arithmeticCommandsBinary, arithmeticCommandsUnary, compareCommand } from './arithmetic';
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
