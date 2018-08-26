import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

export const invokeIf = (fn, x) => fn && fn(x);

export const lensMatrix = n => L.lens(a => R.unnest(a), a => R.splitEvery(n, a));
