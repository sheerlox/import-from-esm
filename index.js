import { createRequire } from 'module';
import path from 'path';

const importFrom = (fromDirectory, moduleId) => createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);


importFrom.silent = (fromDirectory, moduleId) => {
	try {
		return createRequire(path.resolve(fromDirectory, 'noop.js'))(moduleId);
	} catch {}
};

export default importFrom;
