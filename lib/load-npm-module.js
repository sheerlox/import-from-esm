
import { resolve as resolveModule } from "import-meta-resolve";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadNpmModule(fromDirectory, moduleId) {
	let parentModulePath = pathToFileURL(resolve(fromDirectory, "noop.js"));

	let loadedModule;

	do {
		try {
			loadedModule = (await import(resolveModule(moduleId, parentModulePath)))
				.default;
		} catch (e) {
			parentModulePath =
				parentModulePath.href === "file:///"
					? null
					: new URL("..", parentModulePath);
		}
	} while (!loadedModule && parentModulePath != null);

	return loadedModule;
}
