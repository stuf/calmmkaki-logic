import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as RK from 'kefir.ramda';

import './app.css';

import { xHint$, yHint$, Cell, Indicator, board$, complete$ } from './main';

const C = RK.always;

Object.assign(window, { board$, complete$ });

const getCellClass = RK.cond([
  [RK.is(Array), C('array')],
  [RK.equals(1), C('filled')],
  [RK.equals(0), C('empty')],
  [RK.equals(null), C('null')],
  [RK.T, C('other')],
]);

const isIndicator = U.liftRec(i => (i > 0 && i < 6) || i !== 0 && i % 6 === 0);

const getIndicatorClass = RK.ifElse(isIndicator, C('indicator'), C('non-indicator'));

const App = () =>
  <div class="app">
    <div className="main-grid center">
      <div class="cell empty"></div>
      <div class="cell column-hints">
        {U.thru(yHint$,
                U.mapElems((n, i) =>
                  <div key={i} class="column-hint">
                    {U.mapElems((h, hi) =>
                      <div class="column-hint-number" key={hi}>
                        {h}
                      </div>, n)}
                  </div>))}
      </div>
      <div class="cell row-hints">
        {U.thru(xHint$,
                U.mapElems((r, ri) =>
                  <div key={ri}
                       className="row-hint">
                    {U.mapElems((i, ii) =>
                      <div key={ii}
                           className="row-hint-number">
                        {i}
                      </div>, r)}
                  </div>))}
      </div>
      <div class="cell game-area">
        {U.thru(board$,
                U.mapElems((r, ri) =>
                  <div key={ri}
                       className="game-area-row">
                    {U.mapElems((c, ci) =>
                      <div key={ci}
                           onClick={() => c.modify(n => n === 1 ? 0 : 1)}
                           className={U.cns("game-area-cell", getCellClass(c))}>
                        {c}
                      </div>, r)}
                  </div>))}
      </div>
    </div>
  </div>;

export default App;
