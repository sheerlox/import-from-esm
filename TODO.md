# TODO

- [x] import the specific npm module resolution from `import-meta-resolve` (its running a full ESM module resolution mechanism, while we only want npm module resolution with subpaths)

### extracting `packageResolve()` from `import-meta-resolve`

- from https://github.com/wooorm/import-meta-resolve/tree/4db9f0f67f67cbff10830e35674d2e30688dc311
- delete exported functions from `lib/resolve.js`: `moduleResolve` & `defaultResolve`
- export function `packageResolve`
- remove all unused code from `lib/resolve.js`
- run [`deadfile`](https://m-izadmehr.github.io/deadfile): `npx deadfile --ci lib/resolve.js` and delete detected unused files in `lib/`
- copy `license` file to `lib/`
- copy `lib/` to `import-from-esm/import-meta-resolve/resolve/`

(see patch file)
