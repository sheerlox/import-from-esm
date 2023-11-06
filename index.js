import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { moduleResolve } from 'import-meta-resolve';

const EXTENSIONS = ['.js', '.mjs', '.cjs'];

function resolveToFileURL(...paths) {
	return pathToFileURL(resolve(...paths));
}

async function tryImport(moduleId) {
	try {
		return await import(moduleId);
	} catch {}
}

async function importFrom(fromDirectory, moduleId) {
	let loadedModule;

	if (/^(\/|\.\.\/|\.\/)/.test(moduleId)) {
		// If moduleId begins with '/', '../', or './', try to
		// resolve manually so we can support extensionless imports
		// - https://nodejs.org/api/modules.html#file-modules

		const localModulePath = resolveToFileURL(fromDirectory, moduleId);

		// Try to resolve exact file path
		loadedModule = await tryImport(localModulePath);

		if (!loadedModule) {
			// Try to resolve file path with added extensions

			for (const ext of EXTENSIONS) {
				// eslint-disable-next-line no-await-in-loop
				loadedModule = await tryImport(`${localModulePath}${ext}`);
				if (loadedModule) {
					break;
				}
			}
		}
	} else {
		// Let `import-meta-resolve` deal with resolving packages & import maps
		// - https://nodejs.org/api/modules.html#loading-from-node_modules-folders
		// - https://nodejs.org/api/packages.html#subpath-imports

		try {
			const parentModulePath = resolveToFileURL(fromDirectory, 'noop.js');
			loadedModule = await import(moduleResolve(moduleId, parentModulePath, new Set(['node', 'import'])));
		} catch {}

		// Support for extensionless subpath package access (not subpath exports)
		if (!loadedModule && !moduleId.startsWith('#')) {
			// Try to resolve file path with added extensions

			for (const ext of EXTENSIONS) {
				try {
					const parentModulePath = resolveToFileURL(fromDirectory, 'noop.js');
					// eslint-disable-next-line no-await-in-loop
					loadedModule = await import(moduleResolve(`${moduleId}${ext}`, parentModulePath, new Set(['node', 'import'])));
				} catch {}

				if (loadedModule) {
					break;
				}
			}
		}
	}

	if (!loadedModule) {
		const error = new Error(`Cannot find module '${moduleId}'`);
		error.code = 'MODULE_NOT_FOUND';
		throw error;
	}

	return loadedModule.default;
}

importFrom.silent = async function (fromDirectory, moduleId) {
	try {
		return await importFrom(fromDirectory, moduleId);
	} catch {}
};

export default importFrom;
