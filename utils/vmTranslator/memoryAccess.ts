import { checkSegment } from './translatorUtils';
import { MemorySegment } from './types';

const TEMP_BASE = 5;

export const pushMemoryAccessCommand = (cmd: string, moduleName: string, comment: string) => {
  const [command, seg, value] = cmd.split(' ');
  if (command !== 'push') {
    console.error(`Invalid command ${cmd}`);
    process.exit(1);
  }

  const segment = checkSegment(seg);
  if (!segment) {
    console.error(`Invalid segment ${seg}`);
    process.exit(1);
  }

  let outCode = '';

  switch (segment) {
    case 'constant':
      outCode += `@${value} ${comment}\n`;
      outCode += `D=A\n`;
      break;
    case 'argument':
    case 'local':
    case 'this':
    case 'that':
      outCode += pushMemory(segment, value, comment);
      break;
    case 'static':
      outCode += `@${moduleName}.${value}\n`;
      outCode += 'D=M\n';
      break;
    case 'temp':
      const index = Number(value) + TEMP_BASE;
      outCode += `@${index} ${comment}\n`;
      outCode += 'D=M\n';
      break;
    case 'pointer':
      if (value === '0') {
        outCode += `@THIS ${comment}\n`;
      } else {
        outCode += `@THAT ${comment}\n`;
      }
      outCode += 'D=M\n';
      break;
    default:
      break;
  }
  // put value from D to Ram[sp]
  outCode += '@SP\n';
  outCode += 'A=M\n';
  outCode += 'M=D\n';
  //increment sp
  outCode += '@SP\n';
  outCode += 'M=M+1\n';

  return outCode;
};

const pushMemory = (segment: MemorySegment, value: string, comment: string) => {
  let outCode = '';
  let seg = '';
  switch (segment) {
    case 'argument':
      seg = 'ARG';
      break;
    case 'local':
      seg = 'LCL';
      break;
    case 'this':
      seg = 'THIS';
      break;
    case 'that':
      seg = 'THAT';
      break;

    default:
      break;
  }
  outCode += `@${value} ${comment}\n`;
  outCode += 'D=A\n';
  outCode += `@${seg}\n`;
  outCode += 'A=M\n';
  outCode += 'A=D+A\n';
  outCode += 'D=M\n'; // value from selected segment
  return outCode;
};

export const popMemoryAccessCommand = (cmd: string, moduleName: string, comment: string) => {
  const [command, seg, value] = cmd.split(' ');
  if (command !== 'pop') {
    console.error(`Invalid command ${cmd}`);
    process.exit(1);
  }

  const segment = checkSegment(seg);
  if (!segment) {
    console.error(`Invalid segment ${seg}`);
    process.exit(1);
  }
  let outCode = '';
  //decrement sp
  outCode += `@SP ${comment}\n`;
  outCode += 'M=M-1\n';
  // put value from Ram[sp] to D
  outCode += 'A=M\n';
  outCode += 'D=M\n';

  switch (segment) {
    case 'argument':
    case 'local':
    case 'this':
    case 'that':
      outCode += popMemory(segment, value);
      break;
    case 'static':
      outCode += `@${moduleName}.${value}\n`;
      outCode += 'M=D\n';
      break;
    case 'temp':
      const index = Number(value) + TEMP_BASE;
      outCode += `@${index}\n`;
      outCode += 'M=D\n';
      break;
    case 'pointer':
      if (value === '0') {
        outCode += '@THIS\n';
      } else {
        outCode += '@THAT\n';
      }
      outCode += 'M=D\n';
      break;
  }
  return outCode;
};

const popMemory = (segment: MemorySegment, value: string) => {
  let outCode = '';
  let seg = '';
  switch (segment) {
    case 'argument':
      seg = 'ARG';
      break;
    case 'local':
      seg = 'LCL';
      break;
    case 'this':
      seg = 'THIS';
      break;
    case 'that':
      seg = 'THAT';
      break;

    default:
      break;
  }
  outCode += '@R13\n';
  outCode += 'M=D\n'; // save value in R13
  outCode += `@${value}\n`;
  outCode += 'D=A\n';
  outCode += `@${seg}\n`;
  outCode += 'A=M\n';
  outCode += 'D=D+A\n';
  outCode += '@R14\n';
  outCode += 'M=D\n'; // save address in R14
  outCode += '@R13\n';
  outCode += 'A=M\n';
  outCode += 'D=A\n'; // get value from R13
  outCode += '@R14\n';
  outCode += 'A=M\n';
  outCode += 'M=D\n'; // store value in Ram[seg+index]

  return outCode;
};
