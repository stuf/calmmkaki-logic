import * as React from 'karet';
import * as U from 'karet.util';

const Hint = ({ item, type = "row" }) =>
  <div className={U.cns(U.string`${type}-hint`)}>
    {U.mapElems((n, ni) =>
      <div key={ni}
           className={U.string`${type}-hint-number`}>
        {n}
      </div>, item)}
  </div>;

const Hints = ({ items, className, type = "row" }) =>
  <div className={U.cns(className, U.string`${type}-hints`)}>
    {U.mapElems((item, i) =>
      <Hint key={i}
            item={item}
            type={type} />,
      items)}
  </div>;

export default Hints;
