import { fc, testProp } from '@fast-check/ava';
import { fuzzImportFromESM } from './helpers/fuzz.helpers.js';

testProp(
	'should not error on [""," A:"]', [fc.string(), fc.string()], fuzzImportFromESM,
	{
		seed: 642_984_661, path: '122:0:3:1:10:17', verbose: 1, endOnFailure: true,
	},
);
