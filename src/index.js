import * as fs from 'node:fs';
import path from 'node:path';
import { parseFile } from './script.js';
import { getComparison } from './getcomp.js';
import { getFormat } from './format.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (filepath) => fs.readFileSync(filepath, { encoding: 'utf-8' });

const getExt = (filepath) => {
  const pathSplit = filepath.split('.');
  const fileExt = pathSplit.at(-1);
  return fileExt;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getPath(filepath1);
  const file2 = getPath(filepath2);

  const fileExt1 = getExt(filepath1);
  const fileExt2 = getExt(filepath2);

  const fileData1 = getData(file1);
  const fileData2 = getData(file2);

  const dataSet1 = parseFile(fileData1, fileExt1);
  const dataSet2 = parseFile(fileData2, fileExt2);

  const compResult = getComparison(dataSet1, dataSet2);
  const formattedResult = getFormat(compResult);
  return formattedResult;
};

export default genDiff;
