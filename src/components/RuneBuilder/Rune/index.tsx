import React, { PureComponent } from 'react';

import Slot from './Slot';
import Body from './Body';

interface RuneProps {
  slot: any;
}

class Rune extends PureComponent<RuneProps> {
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
