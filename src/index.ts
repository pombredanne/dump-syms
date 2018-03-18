import { sync, hasMagic } from 'glob';
import { join, resolve, parse, ParsedPath } from 'path';
import { existsSync, copyFileSync, writeFileSync, ensureDirSync, unlinkSync } from 'fs-extra';
import { execSync } from 'child_process'

export function dumpSyms(glob: string, outPath?: string) {
  if (process.platform !== 'win32') {
    throw new Error('There are currently only binaries for Windows');
  }

  const dumpSymsExecutable = join(__dirname, '../bin/', 'dump_syms.exe');

  console.log('[dump-syms] Searching:', glob);

  const pdbPaths = sync(glob);

  if (outPath && pdbPaths.length) {
    ensureDirSync(outPath);
  }

  for (const pdbPath of pdbPaths) {
    const { dir, name } = parse(pdbPath);
    const symbolOutPath = join(outPath ? resolve(outPath) : dir, name + '.sym');

    // dump_syms.exe looks for a matching binary and only accepts exe or dll
    // If we have a .node binary we copy it and delete it later
    const nodeBinary = join(dir, name + '.node');
    const dllBinary = join(dir, name + '.dll');
    const exeBinary = join(dir, name + '.exe');
    const copyNodeBinary = existsSync(nodeBinary);

    if (copyNodeBinary) {
      copyFileSync(nodeBinary, dllBinary);
    }

    if (existsSync(dllBinary) || existsSync(exeBinary)) {
      const symData = execSync(`${dumpSymsExecutable} ${pdbPath}`);
      writeFileSync(symbolOutPath, symData);
      console.log('[dump-syms] Symbol written to:', symbolOutPath);
    }

    if (copyNodeBinary) {
      unlinkSync(dllBinary);
    }
  }
}
