import * as fs from 'node:fs';
import path from 'node:path';
import { parseFile } from './script.js';
import { getComparison } from './getcomp.js';
import { getFormat } from './format.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const file1 = getPath(filepath1);
  const file2 = getPath(filepath2);
  const readFile1 = fs.readFileSync(file1, { encoding: 'utf-8' });
  const readFile2 = fs.readFileSync(file2, { encoding: 'utf-8' });
  const dataFile1 = parseFile(readFile1);
  const dataFile2 = parseFile(readFile2);
  const compResult = getComparison(dataFile1, dataFile2);
  const formattedResult = getFormat(compResult);
  return formattedResult;
};

export default genDiff;
