/* eslint-disable max-params */

export const testImportFromLocal = async (t, importFrom, dir, file, ext) => {
	const leadingString = /^(\/|\.\.\/|\.\/|[a-zA-Z]:)/.test(file) ? '' : './';
	const extString = ext ? `.${ext}` : '';
	const moduleId = `${leadingString}${file}${extString}`;
	const nonExistentModuleId = `./nonexistent${extString}`;

	t.is(await importFrom.silent(dir, moduleId), 'unicorn');

	const moduleNotFoundError = await t.throwsAsync(importFrom(dir, nonExistentModuleId));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentModuleId}'`));

	t.is(await importFrom.silent(dir, nonExistentModuleId), undefined);
};

export const testImportFromPackage = async (t, importFrom, dir, packageName, expected) => {
	const nonExistentPackageName = 'nonexistent-package';

	t.is(await importFrom.silent(dir, packageName), expected);

	const moduleNotFoundError = await t.throwsAsync(importFrom(dir, nonExistentPackageName));
	t.is(moduleNotFoundError.code, 'MODULE_NOT_FOUND');
	t.regex(moduleNotFoundError.message, new RegExp(`^Cannot find module '${nonExistentPackageName}'`));

	t.is(await importFrom.silent(dir, nonExistentPackageName), undefined);
};
