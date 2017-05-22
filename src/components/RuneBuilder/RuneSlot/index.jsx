import React from 'react';
import cx from 'classnames';

import slots from './slots.js';
import style from './index.scss';

const RuneSlot = (props) => {
  const slotData = slots[props.slot];

  return (
    <svg
      className={cx(style.rune, style[slotData.type])}
      width={props.slot >= 27 ? '156px' : '50px'}
      height={props.slot >= 27 ? '159px' : '56.8px'}
      viewBox="0 0 425 433"
      enableBackground="new 0 0 425 433"
      {...slotData}
      {...props}
    >
      <g>
        <path
          className={style.slotOuter}
          d="M77.7,138.7c32.8-18.7,137.5-77.1,137.5-77.1s134.5,75.1,137.5,77.1v159c-45.2,25-91.2,50.4-137.1,75.8c-46.3-25.5-92.3-50.6-137.9-75.8V138.7z"
        />
        <path
          className={style.slotMiddle}
          d="M214.7,72l-128,74.5v142.8c44,24.5,85.3,48.9,128.4,73.7c43.1-24.7,86.6-49.5,129.6-74.3V147C302.7,122.1,258.3,97.1,214.7,72z M329.7,279.3c-38,21.5-76.5,43-114.5,64.4c-38.1-21.5-75.5-42.7-113.5-64V155.9l113.2-64.7c38.4,21.8,77.8,43.5,114.8,65.1V279.3z"
        />
        <path
          className={style.slotInner}
          d="M215.4,343.8c-38-21.5-75.5-42.7-113-64V155.9L215,91.2c38.3,21.8,76.4,43.5,114.3,65.1v123C291.3,300.8,253.3,322.3,215.4,343.8z"
        />
      </g>
    </svg>
  );
};

export default RuneSlot;
