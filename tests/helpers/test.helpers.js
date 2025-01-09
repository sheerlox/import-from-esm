/* eslint-disable max-params */
import path from 'node:path';

export const testImportFromLocal = async (t, importFrom, directory, file, extension, expected = 'unicorn') => {
	const extensionString = extension ? `.${extension}` : '';
	const relativeModuleId = `./${file}${extensionString}`;
	const absoluteModuleId = path.resolve(directory, `${file}${extensionString}`);
	const nonExistentModuleId = `./nonexistent${extensionString}`;

	t.deepEqual(await importFrom.silent(directory, relativeModuleId), expected);
	t.is(await importFrom.silent(directory, absoluteModuleId), expected);

	const moduleNotFoundError = await t.throwsAsync(importFrom(directory, nonExistentModuleId));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentModuleId}'`));

	t.is(await importFrom.silent(directory, nonExistentModuleId), undefined);
};

export const testImportFromPackage = async (t, importFrom, directory, packageName, expected) => {
	const nonExistentPackageName = 'nonexistent-package';

	t.deepEqual(await importFrom.silent(directory, packageName), expected);

	const moduleNotFoundError = await t.throwsAsync(importFrom(directory, nonExistentPackageName));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentPackageName}'`));

	t.is(await importFrom.silent(directory, nonExistentPackageName), undefined);
};
