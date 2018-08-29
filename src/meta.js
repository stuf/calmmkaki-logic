import * as U from 'karet.util';
import { lensMatrix } from './utils';

/**
 * View the given game area.
 * When reading, the game area will be represented as a one dimensional array.
 * When written through, the given 1D array will be written as a 2D array.
 *
 * @type {Function}
 * @param {Array<Array<*>>} matrix - 2D matrix to create a view into
 */
export const collapseM = pw => U.view(lensMatrix(pw));

/**
 * View `area` from the given object.
 * Works on atoms and observables, but any structure will work.
 *
 * @type {Function}
 * @param {*} object
 */
export const areaIn = U.view('area');

/**
 * View `player` from the given object.
 * Works on atoms and observables, but any structure will work.
 *
 * @type {Function}
 * @param {*} object
 */
export const playerAreaIn = U.view('player');

