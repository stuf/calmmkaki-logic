import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'partial.lenses';
import PNGReader from 'png.js';

export const invokeIf = (fn, x) => fn && fn(x);
export const invokeIf2 = (fn, x, y) => fn && fn(x, y);

export const lensMatrix = n => L.lens(a => R.unnest(a), a => R.splitEvery(n, a));

export const asBoolean = L.lens(a => a === 1, a => a ? 1 : 0);

export const C = R.always;

/**
 *
 * @param {Number} width - width of the puzzle
 * @param {String} data - puzzle string representation
 * @returns {Array<Array<Number>>}
 */
export const parsePuzzleString_ = (width, data) =>
  R.compose(R.splitEvery(width),
            R.map(parseInt),
            R.split(''))(data);

/**
 * Curried version of `parsePuzzleString_`
 *
 * @type {Function}
 * @param {Number} width - width of the puzzle
 * @param {String} data - puzzle string representation
 * @returns {Array<Array<Number>>}
 */
export const parsePuzzleString = R.curry(parsePuzzleString_);

/**
 * Initialize an empty 2D matrix with zeroes.
 *
 * @param {Number} w
 * @param {Number} h
 */
export const initMatrix = (w, h) => R.splitEvery(w, Array(w * h).fill(0))

/**
 * Perform matrix multiplication on `o1` multiplied by `o2`
 *
 * @type {Function}
 * @param {*} o1 - matrix to multiply on
 * @param {*} o2 - matrix to multiply with
 * @returns {*}
 */
export const multiplyMatrix = (o1, o2, pw) =>
  U.thru(U.combine([o1, o2], R.pair),
         R.apply(R.zip),
         R.map(R.apply(R.multiply)),
         R.splitEvery(pw))

/**
 * @type {Function}
 * @param {Array<Number>} xs - calculate signature for the given row
 */
export const signatureForArray =
  R.map(R.compose(R.map(R.length),
    R.filter(R.complement(R.all(R.equals(0)))),
    R.groupWith(R.equals)))

export const parseFile = data => {
  const bus = U.bus();

  const reader = new PNGReader(data);

  reader.parse((err, png) => {
    if (err) bus.error(err);

    bus.push(png);

    bus.end();
  })

  return U.toProperty(bus);
}


export const readFile = file => {
  const bus = U.bus();

  const reader = new FileReader();

  reader.onload = e => {
    console.log('reader on load', { e });
    bus.push(e);
    bus.end();
  };

  reader.onerror = e => {
    console.error('reader errored', { e });
    bus.error(e);
    bus.end();
  }

  reader.readAsArrayBuffer(file);

  return bus.toProperty();
}
