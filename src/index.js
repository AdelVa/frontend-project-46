import * as fs from "node:fs";
import path from "node:path";
import { parseFile } from "./script.js";

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath) => {
  const file = getPath(filepath);
  const readFile = fs.readFileSync(file, { encoding: "utf-8" });
  const data = parseFile(readFile);
  return data;
};

export default genDiff;
