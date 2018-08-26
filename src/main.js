import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as RK from 'kefir.ramda';
import * as L from 'partial.lenses';

export function Cell(val, isChecked = false) {
  this.val = val;
  this.checked = isChecked;
}

Cell.prototype.toggle = function () {
  this.checked = !this.checked;
}

//

export function Indicator(val) {
  this.val = val;
}

//

export const board = [
  [1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
];

export const board$ = U.atom(board);

export const x$ = board$.map(R.identity);
export const y$ = board$.map(R.transpose);

const groupArr = RK.groupWith(RK.equals);

const eq0 = RK.equals(0);
const listEq0 = RK.all(eq0);
const filter = RK.filter(R.complement(listEq0));

const doSomething =
  R.map(R.compose(R.map(R.length), filter, groupArr));

export const xHint$ = x$.map(doSomething);
export const yHint$ = y$.map(doSomething);

const combine = (xs, xHint) =>
  U.thru(U.combine([xHint, xs], (a, b) => [a, b]),
         RK.apply(R.zip),
         RK.map(R.compose(R.unnest,
                          R.adjust(R.of, 0))))

const xs$ = combine(x$, xHint$).log('xs');
const ys$ = combine(y$, yHint$).log('ys');

const ysHints$ =
  U.thru(ys$,
         RK.pluck(0),
         RK.prepend(null));

export const complete$ =
  U.combine([xs$, ysHints$], (a, b) => [b, ...a]).log('complete');

ysHints$.log('jorma');