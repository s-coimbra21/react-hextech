import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import Slider from './Slider';

import style from './index.scss';

export default class SliderInput extends PureComponent {
  render () {
    const { disabled } = this.props;
    return (
      <Slider className={cx(style.control, disabled && style.disabled)} state="idle" />
    );
  }
}
