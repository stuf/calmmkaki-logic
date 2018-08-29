/**
 * Game state management
 */
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'partial.lenses';

import { parsePuzzleString, initMatrix, multiplyMatrix, signatureForArray } from './utils';
import { areaIn, playerAreaIn, collapseM } from './meta';

// After implementing data import, these hardcoded puzzles are going to be cleared
import puzzleData, { dimensions as puzzleDimensions } from './puzzles/puzzle01';
import _data from './puzzles/puzzle02';

// And so are these as well
// const [pw, ph] = puzzleDimensions;
// const puzzleArea = parsePuzzleString(pw, puzzleData);
const { width: pw, height: ph } = _data;

const puzzleArea =
  R.pipe(L.get(['pixels', 'data']),
         R.map(x => x === 1 ? 0 : 1),
         R.splitEvery(pw))(_data);

const collapse = collapseM(pw);

/**
 * Observable atom representing the game state, with the underlying solution and
 * the solution entered by the player.
 */
export const state = U.atom({ area: puzzleArea, player: initMatrix(pw, ph), loaded: _data });

const loaded$ = U.view('loaded', state);

const area$ = areaIn(state);
const player$ = playerAreaIn(state);

area$.log('area$');

const areaM$ = collapse(area$);
const playerM$ = collapse(player$);

export const loaded = U.toProperty(loaded$);

export const matrix = { area: areaM$, player: playerM$ };

/**
 * Calculated diff for the underlying area and the player's entry
 */
export const areaDiff = multiplyMatrix(areaM$, playerM$, pw);

export const isSolved = R.equals(areaM$, playerM$);

// Combined

export const axes = {
  area: {
    x: area$.map(R.identity),
    y: area$.map(R.transpose),
  },
  player: {
    x: player$.map(R.identity),
    y: player$.map(R.transpose),
  },
};

//

/**
 * @todo Hints should be combined into [a, b] pairs so that we can show completed as strikethrough.
 */
export const hints = {
  area: {
    x: signatureForArray(axes.area.x),
    y: signatureForArray(axes.area.y),
  },
  player: {
    x: signatureForArray(axes.player.x),
    y: signatureForArray(axes.player.y),
  },
};

/**
 * Axes and Player state hints combined into [a, b] pairs
 *
 * @todo Make me work like planned.
 */
export const combined = {
  x: U.combine([hints.area.x, hints.player.x], R.pair).map(R.apply(R.zip)),
  y: U.combine([hints.area.y, hints.player.y], R.pair).map(R.apply(R.zip)),
};
