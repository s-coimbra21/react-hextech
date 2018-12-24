import React from 'react';
import cx from 'classnames';

import slotsJs from './slots.js';
const style = require('./index.scss');

const RuneSlot = ({ slot, children }) => {
  const slotData = slots[slot];

  return (
    <svg
      className={cx(style.rune, style[slotData.type])}
      width={slot >= 27 ? '156px' : '50px'}
      height={slot >= 27 ? '159px' : '56.8px'}
      viewBox="0 0 425 433"
      enableBackground="new 0 0 425 433"
      {...slotData}
    >
      <g>
        <path
          className={style.slotOuter}
          d="M77.7,138.7c32.8-18.7,137.5-77.1,137.5-77.1s134.5,75.1,137.5,77.1v159c-45.2,25-91.2,50.4-137.1,75.8c-46.3-25.5-92.3-50.6-137.9-75.8V138.7z"
        />
        <path
          className={style.slotMiddle}
          d="M214.7,76l-128,69.5l1,145.8L215.1,359l128.6-67.3V145L214.7,76z M329.7,286.3l-114.5,59.4l-113.5-59V149.9l113.2-59.7l114.8,60.1V286.3z"
        />
        <path
          className={style.slotInner}
          d="M215.4,345.8c-114-59,0,0-114-59V148.9L215,90.2c114.3,60.1,0,0,114.3,60.1v136C215.4,345.8,329.4,286.3,215.4,345.8z"
        />
      </g>
      {children}
    </svg>
  );
};

export default RuneSlot;
