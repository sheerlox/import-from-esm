import importFrom from '../../index.js';

export const fuzzImportFromESM = async (t, a, b) => {
	t.timeout(60_000);
	let result;

	try {
		const loaded = await importFrom(a, b);
		result = Boolean(loaded);
	} catch (error) {
		result = error.code === 'MODULE_NOT_FOUND';
	}

	t.true(result);
};
