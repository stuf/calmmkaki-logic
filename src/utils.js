import * as R from 'ramda';
import * as L from 'partial.lenses';

export const invokeIf = (fn, x) => fn && fn(x);
export const invokeIf2 = (fn, x, y) => fn && fn(x, y);

export const lensMatrix = n => L.lens(a => R.unnest(a), a => R.splitEvery(n, a));

export const asBoolean = L.lens(a => a === 1, a => a ? 1 : 0);

export const C = R.always;
