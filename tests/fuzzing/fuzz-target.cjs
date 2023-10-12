/* eslint-disable-file */
const { FuzzedDataProvider } = require('@jazzer.js/core');

module.exports.fuzz = async function (buffer) {
	const { default: importFrom } = await import('../../index.js');

	const data = new FuzzedDataProvider(buffer);
	// const moduleId = data.consumeString(Math.round(data._remainingBytes / 2), 'utf8');
	const fromDirectory = data.consumeString(data._remainingBytes, 'utf8');

	try {
		await importFrom(fromDirectory, './index');
	} catch (error) {
		if (error.code !== 'MODULE_NOT_FOUND') {
			throw error;
		}
	}
};
