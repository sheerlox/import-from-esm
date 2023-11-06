# import-from-esm

[![Version](https://img.shields.io/npm/v/import-from-esm?logo=npm)](https://www.npmjs.com/package/import-from-esm)
[![Test](https://img.shields.io/github/actions/workflow/status/sheerlox/import-from-esm/release.yml?logo=github)](https://github.com/sheerlox/import-from-esm/actions/workflows/release.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/sheerlox/import-from-esm/codeql.yml?logo=github&label=CodeQL)](https://github.com/sheerlox/import-from-esm/actions/workflows/codeql.yml)
[![Coverage](https://img.shields.io/sonar/coverage/sheerlox_import-from-esm?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/summary/overall?id=sheerlox_import-from-esm)
[![OpenSSF Scorecard](https://img.shields.io/ossf-scorecard/github.com/sheerlox/import-from-esm?label=openssf%20scorecard)
](https://securityscorecards.dev/viewer/?uri=github.com/sheerlox/import-from-esm)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## Overview

> Import a module like with [`require()`](https://nodejs.org/api/modules.html#modules_require_id) but from a given path (for ESM)

This is the ESM version of the [`import-from`](https://github.com/sindresorhus/import-from), exposing the same API and behavior but supporting ESM modules. Just add `await` before `importFrom`/`importFrom.silent`

This library intends to be an _almost_ drop-in replacement of sindresorhus/import-from (from which it is forked) that supports loading ESM & CJS modules like require() does.

> **Known limitation:** this module cannot import JSON modules, because it would rely on the experimental [Import Attributes](https://nodejs.org/docs/latest-v18.x/api/esm.html#import-attributes) feature. If this is something you would like to see in this library, please open an issue and I'll release it on the `experimental` distribution channel.

## Install

```
$ npm install import-from-esm
```

## Usage

```js
import importFrom from "import-from-esm";

// there is a file at `./foo/bar.{js,mjs,cjs}`

await importFrom("foo", "./bar");
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
