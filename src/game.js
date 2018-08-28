import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import { lensMatrix } from './utils';
import puzzleData, { dimensions as puzzleDimensions } from './puzzles/puzzle01';

//

const [pw, ph] = puzzleDimensions;
const puzzleDataProcessed =
  R.compose(R.splitEvery(pw),
            R.map(parseInt),
            R.split(''))(puzzleData);

const createArea = (w, h) => R.splitEvery(w, Array(w * h).fill(0));

const collapseM = U.view(lensMatrix(pw));

export const state = U.atom({ area: puzzleDataProcessed, player: createArea(pw, ph) });

export const areaIn = U.view(['area']);
export const playerAreaIn = U.view(['player']);

const area$ = areaIn(state);
const player$ = playerAreaIn(state);

const areaM$ = collapseM(area$);
const playerM$ = collapseM(player$);

export const matrix = { area: areaM$, player: playerM$ };

export const areaDiff =
  U.thru(U.combine([areaM$, playerM$], R.pair),
         R.apply(R.zip),
         R.map(R.apply(R.multiply)),
         R.splitEvery(pw));

export const isSolved = R.equals(areaM$, playerM$);

export const getArrHints =
  R.map(R.compose(R.map(R.length),
                  R.filter(R.complement(R.all(R.equals(0)))),
                  R.groupWith(R.equals)));

//

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
    x: getArrHints(axes.area.x),
    y: getArrHints(axes.area.y),
  },
  player: {
    x: getArrHints(axes.player.x),
    y: getArrHints(axes.player.y),
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
