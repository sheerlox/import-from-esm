import { fc, testProp } from '@fast-check/ava';
import { fuzzImportFromESM } from './helpers/fuzz.helpers.js';

testProp(
	'should not error on ["!cBsSgR<","xo"]', [fc.string(), fc.string()], fuzzImportFromESM,
	{ seed: 841_782_558, path: '54113', endOnFailure: true },
);
