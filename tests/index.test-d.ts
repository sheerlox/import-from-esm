/* eslint-disable @typescript-eslint/no-floating-promises */

import importFrom from '../index.js';

importFrom('foo', './bar');
importFrom.silent('foo', './bar');
