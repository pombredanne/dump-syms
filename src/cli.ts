#! /usr/bin/env node
import { dumpSyms } from './index';

// We only do something on Windows
if (process.platform !== 'win32') {
  process.exit(0);
}

function printHelp() {
  console.log('dump-syms glob [outdir]')
}

if (process.argv.length < 2 || process.argv.length > 3) {
  printHelp();
  process.exit(0);
}

dumpSyms(process.argv[2], process.argv[3]);

