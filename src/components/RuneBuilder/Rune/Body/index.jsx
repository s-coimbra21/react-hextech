import React from 'react';

import style from './index.scss';

const Rune = () => (
  <g>
    <g id="Body">
      <polygon fill="#182632" points="320.2,161.2 320.2,281 215.6,335.3 112.2,280 112.2,161.2 215.1,106.3" />
    </g>
    <g id="QuintBody">
      <polygon className={style.quintBodyStroke} points="312.9,165.1 312.9,275 215.7,324.9 119.7,274.1 119.7,165.1 215.3,114.6" />
      <polygon className={style.quintBodyInner} points="308.8,167.4 308.8,272.7 215.7,320.5 123.8,271.8 123.8,167.4 215.3,119.1" />
      <polygon className={style.quintBody} points="305.8,169.1 305.8,271 215.7,317.2 126.8,270.1 126.8,169.1 215.3,122.4" />
    </g>
  </g>
);

export default Rune;
