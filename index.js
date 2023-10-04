import { builtinModules } from "node:module";
import { resolve } from "node:path";
import { loadNpmModule } from "./lib/load-npm-module.js";

async function tryImport(moduleId) {
	try {
		return await import(moduleId);
	} catch {}
}

async function importFrom(fromDirectory, moduleId) {
	// https://nodejs.org/api/modules.html#core-modules
	// TODO: write test and make this is working as expected
	if (/^node:/.test(moduleId) || builtinModules.includes(moduleId)) {
		console.debug('------------- NODE BUILTIN MODULE DETECTED');
		return import(moduleId);
	}

	let loadedModule;

	// https://nodejs.org/api/modules.html#file-modules
	// if moduleId begins with '/', '../', or './'
	if (/^(\/|\.\.\/|\.\/)/.test(moduleId)) {
		const localModulePath = resolve(fromDirectory, moduleId);

		// try to resolve exact file path
		loadedModule = await tryImport(localModulePath);

		if (!loadedModule) {
			// try to resolve file path with added extensions
			const extensions = [".js", ".mjs", ".cjs"];

			for (let ext of extensions) {
				loadedModule = await tryImport(`${localModulePath}${ext}`);
				if (loadedModule) break;
			}
		}

		if (loadedModule) return loadedModule;
	}

	// https://nodejs.org/api/modules.html#loading-from-node_modules-folders
	// try to resolve npm module
	loadedModule = await loadNpmModule(fromDirectory, moduleId);
	if (loadedModule) return loadedModule;

	const error = new Error(`Cannot find module '${moduleId}'`);
	error.code = "MODULE_NOT_FOUND";
	throw error;
}

importFrom.silent = async function (fromDirectory, moduleId) {
	try {
		return await importFrom(fromDirectory, moduleId);
	} catch {}
};

export default importFrom;
