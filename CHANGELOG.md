## [0.1.0](https://github.com/sheerlox/import-from-esm/compare/v4.0.0...v0.1.0) (2023-10-06)

### ⚠ Breaking changes

- export whole module instead of default export
- importFrom and importFrom.silent now return promises
- file extentions now _must_ be specified
- `import-from-esm` is now a native ES Module.

### ✨ Features

- export whole module instead of default export ([ec44587](https://github.com/sheerlox/import-from-esm/commit/ec44587f180d73cf709c9f01ffc4911ae1bbb3f8))

### 🛠 Builds

- **npm:** update minimum node version ([c0ae5ad](https://github.com/sheerlox/import-from-esm/commit/c0ae5ad3078bea5836325bd825a132bca2795ce9))

### 📦 Code Refactoring

- convert to pure esm ([f873e47](https://github.com/sheerlox/import-from-esm/commit/f873e4783664cccd9856bf40db6ff5d8bd1efda8))
- replicate CJS module resolution outlines ([4128481](https://github.com/sheerlox/import-from-esm/commit/4128481c2bb33629e4b6a3e101075b71f95a5607))
- support importing ESM modules (naive approach) ([69d0166](https://github.com/sheerlox/import-from-esm/commit/69d016631fd980069e31dfe3f107248ac1384770))

### 🚨 Tests

- improve tests by testing for various extensions ([938c6bd](https://github.com/sheerlox/import-from-esm/commit/938c6bd961b45dc3729844e45cccf88acbcaf790))
- test both CJS & ESM modules ([16d85b4](https://github.com/sheerlox/import-from-esm/commit/16d85b43894776001d5d2d7d3577d9e1f89d15cc))

### ⚙️ Continuous Integrations

- **action:** update node & actions versions ([b1c50cc](https://github.com/sheerlox/import-from-esm/commit/b1c50cc9744e98c7d388832bda3bef86d3ca2ab2))

### ♻️ Chores

- add TODO.md ([ba7abbe](https://github.com/sheerlox/import-from-esm/commit/ba7abbed3f3cf39d1303bc4a198b8c0ee23133f9))
- various changes after repository transfer ([786824a](https://github.com/sheerlox/import-from-esm/commit/786824a027d3c10741436b714d4b18ca37f17a7d))
