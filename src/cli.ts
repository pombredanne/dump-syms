#! /usr/bin/env node
import { dumpSyms } from './index';

// We only do something on Windows
if (process.platform !== 'win32') {
  process.exit(0);
}

function printHelp() {
  console.log('pdb-to-breakpad file/path/**/or/glob [./optional/output/dir]')
}

if (process.argv.length < 2 || process.argv.length > 3) {
  printHelp();
  process.exit(1);
}

const args = process.argv.slice(1);

if (args.some(arg => arg.includes('?'))) {
  printHelp();
  process.exit(0);
}

dumpSyms(args[0], args[1]);

