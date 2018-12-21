import React, { PureComponent } from 'react';
import cx from 'classnames';

import Slot from './Slot';
import Body from './Body';

class Rune extends PureComponent {
  render() {
    const { slot } = this.props;
    return (
      <Slot slot={slot}>
        <Body />
      </Slot>
    );
  }
}

export default Rune;
