import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Slot from './Slot';
import Body from './Body';

class Rune extends PureComponent {
  static propTypes = {
    slot: PropTypes.any,
  };

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
