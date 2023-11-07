/* eslint-disable max-params */
import { resolve } from 'node:path';

export const testImportFromLocal = async (t, importFrom, dir, file, ext) => {
	const extString = ext ? `.${ext}` : '';
	const relativeModuleId = `./${file}${extString}`;
	const absoluteModuleId = resolve(dir, `${file}${extString}`);
	const nonExistentModuleId = `./nonexistent${extString}`;

	t.is(await importFrom.silent(dir, relativeModuleId), 'unicorn');
	t.is(await importFrom.silent(dir, absoluteModuleId), 'unicorn');

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
