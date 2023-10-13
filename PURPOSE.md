This library is intended to be an _almost_ drop-in replacement of [sindresorhus/import-from](https://github.com/sindresorhus/import-from) (from which it is forked) that supports loading ESM & CJS modules like `require()` does.

Since `import-from` uses `createRequire()` under the hood, it throws the [`ERR_REQUIRE_ESM` error](https://nodejs.org/api/errors.html#err_require_esm) when trying to import a [pure ESM module](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

The [Node.js modules documentation](https://nodejs.org/api/modules.html#the-mjs-extension) states:

> Due to the synchronous nature of require(), it is not possible to use it to load ECMAScript module files. Attempting to do so will throw a [ERR_REQUIRE_ESM](https://nodejs.org/api/errors.html#err_require_esm) error. Use [import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) instead.

Switching from `require()` to a dynamic `import()` has a lot of implications, but these are the ones I encountered issues with:

- `import()` is asynchronous,
- file extensions _must_ be specified for relative path,
- "dependencies (without an explicit path) for a given module are searched for relative to the module loading them" ([source](https://stackoverflow.com/a/73382148/5567941)).

This library will provide a module loading strategy as close to CJS' as possible, as well as work around the above issues (except the first one, nothing can be done about this).

It's only breaking change from `import-from` should be adding an `await` in front of the `importFrom()` calls, and a `.default` when importing default exports.

### Resources

- CommonJS module resolution strategy: https://nodejs.org/api/modules.html#all-together
- https://www.npmjs.com/package/import-meta-resolve
