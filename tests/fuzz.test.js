import { fc, testProp } from '@fast-check/ava';
import { fuzzImportFromESM } from './helpers/fuzz.helpers.js';

testProp(
	'should return loaded module and not error unexpectedly', [fc.string(), fc.string()], fuzzImportFromESM,
	{ numRuns: 50_000, verbose: 1 },
);
