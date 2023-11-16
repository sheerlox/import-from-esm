import { createRequire } from 'node:module';
import { extname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import createDebug from 'debug';
import { moduleResolve } from 'import-meta-resolve';

const debug = createDebug('import-from-esm');
const require = createRequire(import.meta.url);

const EXTENSIONS = ['.js', '.mjs', '.cjs'];

function resolveToFileURL(...paths) {
	return pathToFileURL(resolve(...paths));
}

function tryResolve(moduleId, base) {
	debug(`Trying to import.meta.resolve ${moduleId} from ${base}`);
	try {
		return moduleResolve(moduleId, base, new Set(['node', 'import']));
	} catch (error) {
		debug(`Failed to import.meta.resolve ${moduleId} from ${base}: ${String(error)}`);
	}
}

async function tryImport(absolutePath, asJSON = false) {
	debug(`Trying to import ${absolutePath}${asJSON ? ' as JSON' : ''}`);
	try {
		return asJSON ? require(fileURLToPath(absolutePath)) : await import(absolutePath);
	} catch (error) {
		debug(`Failed to import ${absolutePath}${asJSON ? ' as JSON' : ''}: ${String(error)}`);
		if (error instanceof SyntaxError) {
			throw error;
		}
	}
}

async function importFrom(fromDirectory, moduleId) {
	debug(`Executing importFrom(${fromDirectory}, ${moduleId})`);

	let loadedModule;

	const isJSON = extname(moduleId) === '.json';

	if (/^(\/|\.\.\/|\.\/|[a-zA-Z]:)/.test(moduleId)) {
		// If moduleId begins with '/', '../', './' or Windows path (e.g. "C:"),
		// resolve manually (so we can support extensionless imports)
		// - https://nodejs.org/api/modules.html#file-modules
		debug(`${moduleId} is a file module`);

		const localModulePath = resolveToFileURL(fromDirectory, moduleId);

		// Try to resolve exact file path
		loadedModule = await tryImport(localModulePath, isJSON);

		if (!loadedModule && !isJSON) {
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
		debug(`${moduleId} is not a file module`);

		const parentModulePath = resolveToFileURL(fromDirectory, 'noop.js');
		loadedModule = await tryImport(tryResolve(moduleId, parentModulePath), isJSON);

		// Support for extensionless subpath package access (not subpath exports)
		if (!loadedModule && !moduleId.startsWith('#')) {
			// Try to resolve file path with added extensions

			for (const ext of EXTENSIONS) {
				// eslint-disable-next-line no-await-in-loop
				loadedModule = await tryImport(tryResolve(`${moduleId}${ext}`, parentModulePath), isJSON);

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

	return isJSON ? loadedModule : loadedModule.default;
}

importFrom.silent = async function (fromDirectory, moduleId) {
	try {
		return await importFrom(fromDirectory, moduleId);
	} catch {}
};

export default importFrom;
