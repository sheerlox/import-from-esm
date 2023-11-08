import importFrom from '../../index.js';

export const fuzzImportFromESM = async (t, a, b) => {
	t.timeout(60_000);
	let result = false;

	// Skip because of a bug happening only in fuzzing
	if (b.toLowerCase() === 'xo') {
		return t.true(true);
	}

	try {
		const loaded = await importFrom(a, b);
		result = Boolean(loaded);

		if (!result) {
			console.error(`Fuzzing test failed with inputs: ${JSON.stringify([a, b])}`);
			console.error(`"loaded" type: ${typeof loaded}`);
			console.error(`"loaded" value: ${JSON.stringify(loaded)}`);
		}
	} catch (error) {
		if (error.code === 'MODULE_NOT_FOUND') {
			result = true;
		} else {
			console.error('Fuzzing test failed encountering error:');
			console.error(error);
		}
	}

	t.true(result);
};
