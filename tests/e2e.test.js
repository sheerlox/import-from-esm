/* eslint-disable ava/no-inline-assertions */

import test from 'ava';
import importFrom from '../index.js';

const testImportFromLocal = async (t, dir, file, ext) => {
	const extString = ext ? `.${ext}` : '';
	const moduleId = `./${file}${extString}`;
	const nonExistentModuleId = `./nonexistent${extString}`;

	t.is(await importFrom.silent(dir, moduleId), 'unicorn');

	const moduleNotFoundError = await t.throwsAsync(importFrom(dir, nonExistentModuleId));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentModuleId}'`));

	t.is(await importFrom.silent(dir, nonExistentModuleId), undefined);
};

const testImportFromPackage = async (t, dir, packageName, expected) => {
	const nonExistentPackageName = 'nonexistent-package';

	t.is(await importFrom.silent(dir, packageName), expected);

	const moduleNotFoundError = await t.throwsAsync(importFrom(dir, nonExistentPackageName));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentPackageName}'`));

	t.is(await importFrom.silent(dir, nonExistentPackageName), undefined);
};

test('local - CJS module in CJS folder - no extension', t => testImportFromLocal(t, 'tests/fixture/commonjs', 'fixture-cjs', undefined));
test('local - CJS module in CJS folder - .js extension', t => testImportFromLocal(t, 'tests/fixture/commonjs', 'fixture-cjs', 'js'));
test('local - CJS module in ESM folder - no extension', t => testImportFromLocal(t, 'tests/fixture/module', 'fixture-cjs', undefined));
test('local - CJS module in ESM folder - .cjs extension', t => testImportFromLocal(t, 'tests/fixture/module', 'fixture-cjs', 'cjs'));

test('local - ESM module in ESM folder - no extension', t => testImportFromLocal(t, 'tests/fixture/module', 'fixture-esm', undefined));
test('local - ESM module in ESM folder - .js extension', t => testImportFromLocal(t, 'tests/fixture/module', 'fixture-esm', 'js'));
test('local - ESM module in CJS folder - no extension', t => testImportFromLocal(t, 'tests/fixture/commonjs', 'fixture-esm', undefined));
test('local - ESM module in CJS folder - .mjs extension', t => testImportFromLocal(t, 'tests/fixture/commonjs', 'fixture-esm', 'mjs'));

test('package - main export', t => testImportFromPackage(t, 'tests/fixture/commonjs', '@insurgent/export-map-test', 'main'));
test('package - simple export', t => testImportFromPackage(t, 'tests/fixture/commonjs', '@insurgent/export-map-test/simple', 'simple'));
test('package - conditional export', t => testImportFromPackage(t, 'tests/fixture/commonjs', '@insurgent/export-map-test/conditional', 'conditional-import'));
test('package - wildcard export', t => testImportFromPackage(t, 'tests/fixture/commonjs', '@insurgent/export-map-test/wildcard/js.js', 'wildcard-one'));
test('package - extension wildcard export', t => testImportFromPackage(t, 'tests/fixture/commonjs', '@insurgent/export-map-test/wildcard-js/one', 'wildcardjs-one'));
