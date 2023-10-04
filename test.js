import test from 'ava';
import importFrom from './index.js';

test('importFrom()', t => {
	t.is(importFrom('fixture', './fixture.cjs'), 'unicorn');
	t.throws(() => importFrom('fixture', './nonexistent'));

	const moduleNotFoundError = t.throws(() => {
		importFrom('fixture', './nonexistent');
	});
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, /^Cannot find module '.\/nonexistent'/);
});

test('importFrom.silent()', t => {
	t.is(importFrom.silent('fixture', './fixture.cjs'), 'unicorn');
	t.is(importFrom.silent('fixture', './nonexistent'), undefined);
});
