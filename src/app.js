import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';

import './app.css';

import Placeholder from './components/placeholder';
import Hints from './components/hints';
import Area from './components/area';
import { isSolved, hints, matrix } from './game';
import { asBoolean } from './utils';

const App = () =>
  <div className="app">
    <div className="main-grid">
      {/* Success status indicator */}
      <React.Fragment>
        {U.when(isSolved,
                <div className="alert">
                  Puzzle: solved <strong>AF</strong> 👌
                </div>)}
      </React.Fragment>

      {/* The main view for the game */}
      <div className="main-grid-container">
        <Placeholder className="empty" />

        <Hints items={hints.area.y}
               type="column"
               className="cell" />

        <Hints items={hints.area.x}
               type="row"
               className="cell" />

        <Area area={matrix.area}
              player={matrix.player}
              width={15}
              height={15}
              onClickFn={(a, i) => a.view([i, asBoolean]).modify(R.not)} />
      </div>
    </div>
  </div>;

export default App;
