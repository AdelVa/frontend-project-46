#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
  .version("0.0.1", "-V, --version", "output the version number")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format", "stylish")
  .help("-h, --help", "output usage information")
  .argument("filepath1", "Path to the first file.")
  .argument("filepath2", "Path to the second file.")
  .action((filepath1) => {
    console.log(genDiff(filepath1));
  });

program.parse();
