import fs from 'fs';
import path from 'path';
import { vmTranslator } from './vmTranslator/vmTranslator';

// Check if a file path was provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

// The file path is the third argument (index 2)
const filePath = process.argv[2];

const ext = path.extname(filePath).toLowerCase();
if (ext !== '.vm') {
  console.error('Please provide a .vm file.');
  process.exit(1);
}

const fileName = path.basename(filePath);

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    process.exit(1);
  }
  const assembledText = vmTranslator(data, fileName.split('.')[0]);
  fs.writeFile(`./${fileName.replace('.vm', '.asm')}`, assembledText, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      process.exit(1);
    }
  });
});
