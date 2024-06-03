import fs from 'fs';
import path from 'path';
import { tokenizer } from './jackCompiler/tokenizer';
import { parser } from './jackCompiler/parser';

// Check if a file path was provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

// The file path is the third argument (index 2)
const filePath = process.argv[2];
if (fs.lstatSync(filePath).isDirectory()) {
  tokenizeDirectory(filePath);
} else {
  tokenizeFile(filePath);
}

function tokenizeFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.jack') {
    console.error('Please provide a .jack file.');
    process.exit(1);
  }

  const fileName = path.basename(filePath);
  const fileDir = path.dirname(filePath);

  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      process.exit(1);
    }
    const lexems = tokenizer(data);
    const xml = parser(lexems);
    fs.writeFile(`${fileDir}/${fileName.replace('.jack', '_.xml')}`, xml, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        process.exit(1);
      }
    });
  });
}

function tokenizeDirectory(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  const vmFiles = collectJackFiles(files, dirPath);

  for (const file of vmFiles) {
    tokenizeFile(path.join(dirPath, file));
  }
}

function collectJackFiles(files: string[], dirPath: string) {
  const vmFiles: string[] = [];
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (fs.lstatSync(filePath).isDirectory()) continue;
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jack') {
      vmFiles.push(file);
    }
  }
  return vmFiles;
}
