import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as RK from 'kefir.ramda';

import './app.css';

import Placeholder from './placeholder';
import Hints from './hints';
import Area from './area';
import { xHint$, yHint$, board$, state, areaIn, playerAreaIn } from './main';

const App = () =>
  <div class="app">
    <div className="main-grid center">
      <Placeholder className="empty" />
      <Hints items={yHint$} type="column" className="cell" />
      <Hints items={xHint$} type="row" className="cell" />
      <Area area={areaIn(state)}
            player={playerAreaIn(state)}
            onClickFn={(a, i) => a.view(i).modify(v => v === 1 ? 0 : 1)} />
    </div>
  </div>;

export default App;
