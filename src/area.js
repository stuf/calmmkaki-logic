import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as RK from 'kefir.ramda';
import * as L from 'partial.lenses';

import { lensMatrix } from './utils';
import { Area as A } from './const';

const C = RK.always;

const getCellClass = RK.cond([
  [RK.is(Array), C('array')],
  [RK.equals(1), C('filled')],
  [RK.equals(0), C('empty')],
  [RK.equals(null), C('null')],
  [RK.T, C('other')],
]);

const Area = ({ area, player, onClickFn, width = A.WIDTH, height = A.HEIGHT }) =>
  <div className="cell game-area">
    {U.thru(player,
            U.view(lensMatrix(width)),
            U.mapElems((cell, i) =>
              <div key={i}
                   className={U.cns('game-area-cell', getCellClass(cell))}
                   onClick={() => onClickFn ? onClickFn(player, i) : console.warn('no handler given')}>
                {cell}
              </div>))}
  </div>;

export default Area;
