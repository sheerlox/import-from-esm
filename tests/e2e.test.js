/* eslint-disable ava/no-inline-assertions */

import test from 'ava';
import { resolve } from 'node:path';
import importFrom from '../index.js';
import { testImportFromLocal, testImportFromPackage } from './test-helpers.js'; // eslint-disable-line ava/no-import-test-files

test('local - CJS module in CJS folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-cjs', undefined));
test('local - CJS module in CJS folder - .js extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-cjs', 'js'));
test('local - CJS module in ESM folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-cjs', undefined));
test('local - CJS module in ESM folder - .cjs extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-cjs', 'cjs'));

test('local - ESM module in ESM folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-esm', undefined));
test('local - ESM module in ESM folder - .js extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/module', 'fixture-esm', 'js'));
test('local - ESM module in CJS folder - no extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-esm', undefined));
test('local - ESM module in CJS folder - .mjs extension', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', 'fixture-esm', 'mjs'));

const absoluteModulePath = resolve('tests/fixture/module/fixture-esm');
test('local - absolute path', t => testImportFromLocal(t, importFrom, 'tests/fixture/commonjs', absoluteModulePath, 'mjs'));

test('package - main export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test', 'main'));
test('package - simple export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/simple', 'simple'));
test('package - conditional export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/conditional', 'conditional-import'));
test('package - wildcard export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/wildcard/js.js', 'wildcard-one'));
test('package - extension wildcard export', t => testImportFromPackage(t, importFrom, 'tests/fixture/', '@insurgent/export-map-test/wildcard-js/one', 'wildcardjs-one'));
