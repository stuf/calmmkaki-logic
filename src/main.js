import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as RK from 'kefir.ramda';
import * as L from 'partial.lenses';

import { lensMatrix } from './utils';
import { Area } from './const';

//

export const board = [
  [1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
];

const createArea = (w, h) => R.splitEvery(w, Array(w * h).fill(0));

export const board$ = U.atom(board);

export const state = U.atom({ area: board, player: createArea(Area.WIDTH, Area.HEIGHT)});

state.log('state');

export const areaIn = U.view(['area', lensMatrix(Area.WIDTH)]);
export const playerAreaIn = U.view(['player', lensMatrix(Area.WIDTH)]);

export const areaDiff =
  U.thru(U.combine([areaIn(state), playerAreaIn(state)], R.pair),
         RK.apply(RK.zip),
         RK.map(RK.apply(RK.multiply)),
         RK.splitEvery(Area.WIDTH));

export const isSolved = RK.equals(areaIn(state), playerAreaIn(state)).log('state solved?');

export const x$ = board$.map(R.identity);
export const y$ = board$.map(R.transpose);

const doSomething =
  RK.map(RK.compose(RK.map(RK.length),
                    RK.filter(RK.complement(RK.all(RK.equals(0)))),
                    RK.groupWith(RK.equals)));

export const xHint$ = x$.map(doSomething);
export const yHint$ = y$.map(doSomething);
