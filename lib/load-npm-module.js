import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { packageResolve } from "./import-meta-resolve/resolve.js";

export async function loadNpmModule(fromDirectory, moduleId) {
	let parentModulePath = pathToFileURL(resolve(fromDirectory, "noop.js"));

	let loadedModule;

	do {
		try {
			loadedModule = await import(packageResolve(moduleId, parentModulePath));
		} catch (e) {
			parentModulePath =
				parentModulePath.href === "file:///"
					? null
					: new URL("..", parentModulePath);
		}
	} while (!loadedModule && parentModulePath != null);

	return loadedModule;
}
