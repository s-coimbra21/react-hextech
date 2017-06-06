import React, { PureComponent } from 'react';

/* eslint-disable */
import Ring from './Ring';
import Rune from './Rune';
import gradients from './gradients';

export default class RuneBuilder extends PureComponent {
  render () {
    return (
      <svg
        x="0px" y="0px"
        viewBox="0 0 635 560"
        enableBackground="new 0 0 635 560"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
      >
        {gradients}
        <Ring />
        <g>
          <Rune slot={27} />
          <Rune slot={28} />
          <Rune slot={29} />
        </g>
      </svg>
    );
  }
}
