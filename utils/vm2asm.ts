import fs from 'fs';
import path from 'path';
import { bootstarp, vmTranslator } from './vmTranslator/vmTranslator';

// Check if a file path was provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

// The file path is the third argument (index 2)
const filePath = process.argv[2];
if (fs.lstatSync(filePath).isDirectory()) {
  translateDirectory(filePath);
} else {
  translateFile(filePath);
}

function translateFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.vm') {
    console.error('Please provide a .vm file.');
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
    const assembledText = vmTranslator(data, fileName.split('.')[0]);
    fs.writeFile(`${fileDir}/${fileName.replace('.vm', '.asm')}`, assembledText, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        process.exit(1);
      }
    });
  });
}

function translateDirectory(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  const vmFiles = collecVmFiles(files, dirPath);
  if (vmFiles.indexOf('Sys.vm') === -1) {
    console.error('No Sys.vm file in directory.');
    process.exit(1);
  }
  let assembledText = '';
  assembledText += bootstarp();

  for (const file of vmFiles) {
    // Read the file
    assembledText += `//${file}\n`;
    try {
      const data = fs.readFileSync(path.join(dirPath, file), 'utf8');
      assembledText += vmTranslator(data, file);
    } catch (err) {
      console.error('Error reading file:', err);
      process.exit(1);
    }
  }

  const fileName = path.basename(dirPath);
  fs.writeFile(`${dirPath}/${fileName}.asm`, assembledText, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      process.exit(1);
    }
  });
}

function collecVmFiles(files: string[], dirPath: string) {
  const vmFiles: string[] = [];
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (fs.lstatSync(filePath).isDirectory()) continue;
    const ext = path.extname(file).toLowerCase();
    if (ext === '.vm') {
      vmFiles.push(file);
    }
  }
  return vmFiles;
}
