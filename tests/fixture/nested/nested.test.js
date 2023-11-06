/* eslint-disable ava/no-inline-assertions */

import test from 'ava';
import importFrom from '../../../index.js';
import { testImportFromPackage } from '../../test-helpers.js'; // eslint-disable-line ava/no-import-test-files

test('package - loading from parent node_modules - main', t => testImportFromPackage(t, importFrom, '.', '@insurgent/export-map-test', 'main'));
test('package - loading from parent node_modules - conditional export', t => testImportFromPackage(t, importFrom, '.', '@insurgent/export-map-test/conditional', 'conditional-import'));

test('package - subpath import', t => testImportFromPackage(t, importFrom, '.', '#subpath-import', 'subpath-import'));
