/* eslint-disable ava/no-inline-assertions */

import test from 'ava';
import importFrom from '../index.js';

const testImportFrom = async (t, dir, file, ext) => {
	const extString = ext ? `.${ext}` : '';
	const moduleId = `./${file}${extString}`;
	const nonExistentModuleId = `./nonexistent${extString}`;

	t.is(await importFrom(dir, moduleId), 'unicorn');

	const moduleNotFoundError = await t.throwsAsync(importFrom(dir, nonExistentModuleId));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentModuleId}'`));
};

test('importFrom() (CJS module in CJS folder - no extension)', t => testImportFrom(t, 'tests/fixture/commonjs', 'fixture-cjs', undefined));
test('importFrom() (CJS module in CJS folder - .js extension)', t => testImportFrom(t, 'tests/fixture/commonjs', 'fixture-cjs', 'js'));
test('importFrom() (CJS module in ESM folder - no extension)', t => testImportFrom(t, 'tests/fixture/module', 'fixture-cjs', undefined));
test('importFrom() (CJS module in ESM folder - .cjs extension)', t => testImportFrom(t, 'tests/fixture/module', 'fixture-cjs', 'cjs'));

test('importFrom() (ESM module in ESM folder - no extension)', t => testImportFrom(t, 'tests/fixture/module', 'fixture-esm', undefined));
test('importFrom() (ESM module in ESM folder - .js extension)', t => testImportFrom(t, 'tests/fixture/module', 'fixture-esm', 'js'));
test('importFrom() (ESM module in CJS folder - no extension)', t => testImportFrom(t, 'tests/fixture/commonjs', 'fixture-esm', undefined));
test('importFrom() (ESM module in CJS folder - .mjs extension)', t => testImportFrom(t, 'tests/fixture/commonjs', 'fixture-esm', 'mjs'));

test('importFrom.silent() (CJS)', async t => {
	t.is(await importFrom.silent('tests/fixture/module', './fixture-cjs.cjs'), 'unicorn');
	t.is(await importFrom.silent('tests/fixture/module', './nonexistent'), undefined);
});

test('importFrom.silent() (ESM)', async t => {
	t.is(await importFrom.silent('tests/fixture/module', './fixture-esm.js'), 'unicorn');
	t.is(await importFrom.silent('tests/fixture/module', './nonexistent'), undefined);
});
