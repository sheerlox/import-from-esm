/* eslint-disable ava/no-inline-assertions */

import test from 'ava';
import { resolve } from 'import-meta-resolve';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import importFrom from '../index.js';
import { testImportFromLocal, testImportFromPackage } from './helpers/test.helpers.js';

test('local - CJS module in CJS folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-cjs', undefined));
test('local - CJS module in CJS folder - .js extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-cjs', 'js'));
test('local - CJS module in ESM folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-cjs', undefined));
test('local - CJS module in ESM folder - .cjs extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-cjs', 'cjs'));

test('local - ESM module in ESM folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-esm', undefined));
test('local - ESM module in ESM folder - .js extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-esm', 'js'));
test('local - ESM module in CJS folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-esm', undefined));
test('local - ESM module in CJS folder - .mjs extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-esm', 'mjs'));

test('local - JSON files', async t => {
	const JSON_DIR = 'tests/fixture/json';
	const NON_EXISTENT_MODULE_ID = './nonexistent.json';
	t.deepEqual(await importFrom.silent(JSON_DIR, './valid.json'), { ok: true });
	t.is(await importFrom.silent(JSON_DIR, './invalid.json'), undefined);

	const moduleNotFoundError = await t.throwsAsync(importFrom(JSON_DIR, NON_EXISTENT_MODULE_ID));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${NON_EXISTENT_MODULE_ID}'`));

	t.is(await importFrom.silent(JSON_DIR, NON_EXISTENT_MODULE_ID), undefined);
});

test('package - main export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test', 'main'));
test('package - simple export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/simple', 'simple'));
test('package - conditional export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/conditional', 'conditional-import'));
test('package - wildcard export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/wildcard/js.js', 'wildcard-one'));
test('package - extension wildcard export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/wildcard-js/one', 'wildcardjs-one'));

const testPackageJSON = JSON.parse(readFileSync(fileURLToPath(resolve('@insurgent/export-map-test/package.json', import.meta.url))));
test('package - JSON file export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/package.json', testPackageJSON));

test('package - JSON index', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/json-index-test', { ok: true }));
test('package - JSON main', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/json-main-test', { ok: true }));
