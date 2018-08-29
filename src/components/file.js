import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'partial.lenses';

import { readFile, parseFile } from '../utils';

//

const handleFile = file =>
  U.thru(readFile(file),
         U.skipUnless(R.identity),
         U.liftRec(L.get(['target', 'result'])),
         U.flatMapLatest(parseFile)).log();

const File = ({ dom = U.variable(), file = U.variable() }) =>
  <div>
    <div>
      <input type="file"
             ref={U.refTo(dom)}
             onChange={U.actions(R.pipe(U.view(['target', 'files', 0]),
                                        handleFile))} />
    </div>
  </div>;

export default File;
