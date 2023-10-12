/* eslint-disable-file */
import importFrom from '../../index.js';
// import { FuzzedDataProvider } from '@jazzer.js/core';

test.fuzz('importFrom', async buffer => {
	// const data = new FuzzedDataProvider(buffer);
	// const moduleId = data.consumeString(Math.round(data._remainingBytes / 2), 'utf8');
	// const fromDirectory = data.consumeString(data._remainingBytes, 'utf8');

	try {
		// await importFrom.silent(buffer.toString(), './index');
		await importFrom(buffer.toString(), './index');
	} catch (error) {
		if (error.code !== 'MODULE_NOT_FOUND') {
			throw error;
		}
	}
});
