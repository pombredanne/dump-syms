# dump-syms

`dump_syms.exe` can be used to convert Windows PDB's into breakpad symbols but it expects `.dll` binaries and outputs onto stdout which makes it troublesome to use on its own.


## CLI

If the current platform is not Windows the process exits. This allows it to be used in multi-platform CI scripts.


```shell
dump-syms path [outputpath]
```
