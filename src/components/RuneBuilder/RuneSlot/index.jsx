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
      viewBox="0 0 105.5 119.3"
      enableBackground="new 0 0 105.5 119.3"
      {...slotData}
      {...props}
    >
      <g>
        <path
          className={style.st0}
          d="M0.5,29.8C13,22.7,52.8,0.6,52.8,0.6S103.9,29,105,29.8V90c-17.2,9.5-34.7,19.1-52.1,28.7c-17.6-9.7-35.1-19.3-52.4-28.8V29.8z"
        />
        <path
          className={style.st1}
          d="M52.6,114.1c-16.3-9.3-32.4-18.4-48.5-27.6V33L52.5,5.1c16.5,9.4,32.8,18.8,49.1,28.1v53.1C85.3,95.6,68.9,104.9,52.6,114.1z"
        />
        <path
          className={style.st2}
          d="M52.8,108.2c-14.5-8.2-28.8-16.4-43-24.5V36.3l42.9-24.7c14.6,8.3,29.1,16.7,43.6,24.9v47.1C81.8,91.8,67.3,100,52.8,108.2z"
        />
      </g>
    </svg>
  );
};

export default RuneSlot;
