import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import './sidebar.css';

import { SidebarGroup } from './components';

const Sidebar = ({ puzzles = [] }) =>
  <div className="sidebar">
    <SidebarGroup title="Upload">
      <div className="btn-group">
        <button className="btn">Upload PNG</button>
        <button className="btn">Enter manually</button>
      </div>
    </SidebarGroup>
    <SidebarGroup title="Puzzles">
      <ul className="puzzle-list">
        {U.mapElems((it, i) =>
          <li key={i}
              className="puzzle">
            <span className="puzzle--name">
              {U.view('name', it)}
            </span>
            <span className="puzzle--size">
              {U.thru(U.view('size', it),
                      R.join(' × '))}
            </span>
          </li>, puzzles)}
      </ul>
    </SidebarGroup>
  </div>;

export default Sidebar;
