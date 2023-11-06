/* eslint-disable ava/no-inline-assertions */

import test from 'ava';
import importFrom from '../../../index.js';
import { testImportFromPackage } from '../../test-helpers.js'; // eslint-disable-line ava/no-import-test-files

test('package - loading from parent node_modules', t => testImportFromPackage(t, importFrom, '../../../tests/fixture/', '@insurgent/export-map-test', 'main'));
