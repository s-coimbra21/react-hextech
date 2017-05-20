import React, { PureComponent } from 'react';

import Ring from './Ring';

export default class RuneBuilder extends PureComponent {
  render () {
    return (
      <svg
        x="0px" y="0px"
        viewBox="0 0 635 560"
        enableBackground="new 0 0 635 560"
        {...this.props}
      >
        <Ring />
      </svg>
    );
  }
}
