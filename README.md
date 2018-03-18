# dump-syms

Generate breakpad symbols from Windows PDB files

## CLI

If the current platform is not Windows the process exits which means it can safely be used in multi-platform CI scripts.

```shell
dump-syms glob [outdir]
```

Argument  | Description
----------|-------------
glob      | A glob expression to find PDB files
outdir    | Optional output directory. If this is not supplied the symbol files will be saved next to the original PDB file

### Examples

Recursively search `node_modules` for PDB files and generate breakpad symbols for each
```
dump-syms ./node_modules/**/*.pdb
```

Create breakpad symbols for `usb-detection.pdb` and output the file to the `symbols` directory
```
dump-syms ./Release/usb-detection.pdb ./symbols
```

## API

You can also use this library in code.

```javascript
import { dumpSyms } from 'dump-syms';
// or
const { dumpSyms } = require('dump-syms');

dumpSyms('./node_modules/**/*.pdb', './optional/output/path/');
```

If the current platform is not Windows it will throw an error.




