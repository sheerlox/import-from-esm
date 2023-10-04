import test from 'ava';
import importFrom from './index.js';

test('importFrom() (CJS)', async t => {
	t.is(await importFrom('fixture', './fixture-cjs.cjs'), 'unicorn');
	await t.throwsAsync(importFrom('fixture', './nonexistent'));

	const moduleNotFoundError = await t.throwsAsync(
		importFrom('fixture', './nonexistent')
	);
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, /^Cannot find module '.\/nonexistent'/);
});

test('importFrom() (ESM)', async t => {
	t.is(await importFrom('fixture', './fixture-esm.js'), 'unicorn');
	await t.throwsAsync(importFrom('fixture', './nonexistent'));

	const moduleNotFoundError = await t.throwsAsync(
		importFrom('fixture', './nonexistent')
	);
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, /^Cannot find module '.\/nonexistent'/);
});

test('importFrom.silent() (CJS)', async t => {
	t.is(await importFrom.silent('fixture', './fixture-cjs.cjs'), 'unicorn');
	t.is(await importFrom.silent('fixture', './nonexistent'), undefined);
});

test('importFrom.silent() (ESM)', async t => {
	t.is(await importFrom.silent('fixture', './fixture-esm.js'), 'unicorn');
	t.is(await importFrom.silent('fixture', './nonexistent'), undefined);
});
