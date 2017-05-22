import React from 'react';
import cx from 'classnames';

import slots from './slots.js';
import style from './index.scss';

const RuneSlot = (props) => {
  const slotData = slots[props.slot];

  return (
    <svg
      className={cx(style.rune, style[slotData.type])}
      width={props.slot >= 27 ? '105px' : '50px'}
      height={props.slot >= 27 ? '119.3px' : '56.8px'}
      viewBox="0 0 276 313"
      enableBackground="new 0 0 276 313"
      {...slotData}
      {...props}
    >
      <g>
        <path
          className={style.st0}
          d="M0.5,77.7C33.3,59,138,0.6,138,0.6s134.5,75.1,137.5,77.1v159c-45.2,25-91.2,50.4-137.1,75.8C92.2,287,46.2,261.9,0.5,236.7V77.7z"
        />
        <path
          className={style.st1}
          d="M138.2,282.8c-38-21.5-75.5-42.7-113-64V94.9l112.7-64.7c38.3,21.8,76.4,43.5,114.3,65.1v123C214.2,239.8,176.1,261.3,138.2,282.8z"
        />
        <path
          className={style.st2}
          d="M137.7,11L9.7,85.5v142.8c44,24.5,85.3,48.9,128.4,73.7c43.1-24.7,86.6-49.5,129.6-74.3V86.1C225.7,61.2,181.3,36.2,137.7,11z M252.7,218.3c-38,21.5-76.5,43-114.5,64.4c-38.1-21.5-75.5-42.7-113.5-64V94.9l113.2-64.7c38.4,21.8,77.8,43.5,114.8,65.1V218.3z"
        />
      </g>
    </svg>
  );
};

export default RuneSlot;
