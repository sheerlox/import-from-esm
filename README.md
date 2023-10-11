# import-from-esm

[![Version](https://badgen.net/npm/v/import-from-esm?icon=npm)](https://badgen.net/npm/v/import-from-esm)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/sheerlox/import-from-esm/badge)](https://securityscorecards.dev/viewer/?uri=github.com/sheerlox/import-from-esm)
[![Test](https://github.com/sheerlox/import-from-esm/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/sheerlox/import-from-esm/actions/workflows/main.yml)
[![CodeQL](https://github.com/sheerlox/import-from-esm/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/sheerlox/import-from-esm/actions/workflows/codeql.yml)

## Overview

> Import a module like with [`require()`](https://nodejs.org/api/modules.html#modules_require_id) but from a given path (for ESM)

This is the ESM version of the [`import-from`](https://github.com/sindresorhus/import-from), exposing the same API and behavior but supporting ESM modules. Just add `await` before `importFrom`/`importFrom.silent`

This library intends to be an _almost_ drop-in replacement of sindresorhus/import-from (from which it is forked) that supports loading ESM & CJS modules like require() does.

## Install

```
$ npm install import-from-esm
```

## Usage

```js
import importFrom from "import-from-esm";

// note: there is a file at `./foo/bar.{js,mjs,cjs}`

// to load the whole module (default export + named exported)
await importFrom("foo", "./bar");

// to access the default export
(await importFrom("foo", "./bar")).default;

// note: us the optional chaining operator when using .silent()
// since no error will be thrown if the module is not found
(await importFrom.silent("foo", "./bar"))?.default;
```

## API

### importFrom(fromDirectory, moduleId)

Like `require()`, throws when the module can't be found.

### importFrom.silent(fromDirectory, moduleId)

Returns `undefined` instead of throwing when the module can't be found.

#### fromDirectory

Type: `string`

Directory to import from.

#### moduleId

Type: `string`

What you would use in `require()`.

## Tip

Create a partial using a bound function if you want to import from the same `fromDir` multiple times:

```js
const importFromFoo = importFrom.bind(null, "foo");

importFromFoo("./bar");
importFromFoo("./baz");
```

## Related

- [import-from](https://github.com/sindresorhus/import-from) - Import a module like with `require()` but from a given path
- [import-cwd](https://github.com/sindresorhus/import-cwd) - Import a module from the current working directory
- [resolve-from](https://github.com/sindresorhus/resolve-from) - Resolve the path of a module from a given path
- [resolve-cwd](https://github.com/sindresorhus/resolve-cwd) - Resolve the path of a module from the current working directory
- [resolve-pkg](https://github.com/sindresorhus/resolve-pkg) - Resolve the path of a package regardless of it having an entry point
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import modules lazily
- [import-global](https://github.com/sindresorhus/import-global) - Import a globally installed module
