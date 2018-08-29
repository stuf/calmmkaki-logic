import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'partial.lenses';

import { lensMatrix, invokeIf2, C } from '../utils';

const getCellClass = R.cond([
  [R.is(Array), C('array')],
  [R.equals(1), C('filled')],
  [R.equals(0), C('empty')],
  [R.equals(null), C('null')],
  [R.T, C('other')],
]);

const mapIndexed = R.addIndex(R.map);

const Area = ({ player, onClickFn, width, height = width }) =>
  <div className="cell game-area"
       style={{ gridTemplateColumns: U.string`repeat(${width}, var(--cell-size))`,
                gridTemplateRows: U.string`repeat(${height}, var(--cell-size))`, }}>
    {U.thru(player,
            U.mapValue(L.get(lensMatrix(width))),
            U.skipDuplicates(R.identical),
            mapIndexed((cell, i) =>
                              <div key={i}
                                   className={U.cns('game-area-cell', getCellClass(cell))}
                                   onClick={() => invokeIf2(onClickFn, player, i) }>
                                {cell}
                              </div>))}
  </div>;

export default Area;
