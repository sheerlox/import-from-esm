import { fc, testProp } from '@fast-check/ava';
import importFrom from '../index.js';

testProp(
	'should return loaded module and not error unexpectedly', [fc.string(), fc.string()], async (t, a, b) => {
		t.timeout(60_000);
		let result;

		try {
			const loaded = await importFrom(a, b);
			result = Boolean(loaded);
			// If (result) {
			// 	console.debug('successfully loaded', a, ' | ', b);
			// 	console.debug(loaded);
			// }
		} catch (error) {
			result = error.code === 'MODULE_NOT_FOUND';
		}

		t.true(result);
	},
	{ numRuns: 100_000 },
);
