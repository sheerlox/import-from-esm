import { resolve } from 'path';

async function importFrom (fromDirectory, moduleId) {
  const localModulePath = resolve(fromDirectory, moduleId);

  try {
    return (await import(moduleId)).default;
  } catch (e) {
    try {
      return (await import(localModulePath)).default;
    } catch (e) {
      const error = new Error(`Cannot find module '${moduleId}'`);
      error.code = "MODULE_NOT_FOUND";
      throw error;
    }
  }
};

importFrom.silent = async function (fromDirectory, moduleId) {
	try {
		return (await importFrom(fromDirectory, moduleId));
	} catch {}
}

export default importFrom;
