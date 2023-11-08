import { fc, testProp } from '@fast-check/ava';
import { fuzzImportFromESM } from './helpers/fuzz.helpers.js';

// This is skipped in `fuzz.helper.js`, but leaving it
// to illustrate fuzzing regression for future use
testProp(
	'should not error on ["!cBsSgR<","xo"]', [fc.string(), fc.string()], fuzzImportFromESM,
	{ seed: 841_782_558, path: '54113', verbose: 1, endOnFailure: true },
);
