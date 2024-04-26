#!/usr/bin/env node

import { program } from "commander";

program
  .version("0.0.1", "-V, --version", "output the version number")
  .description("Compares two configuration files and shows a difference.")
  .help("-h, --help", "output usage information")
  .option("-f, --format [type]", "output format", "stylish")
  .argument("filepath1", "Path to the first configuration file.")
  .argument("filepath2", "Path to the second configuration file.")
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
