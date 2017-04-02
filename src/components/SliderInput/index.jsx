import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import Frame from '../Frame';

import style from './index.scss';

export default class SliderInput extends PureComponent {
  static propTypes = {
    // Visual
    className: PropTypes.any,
    // State
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    disabled: PropTypes.bool,
    tooltip: PropTypes.bool,
    // Events
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    className: undefined,
    value: undefined,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    tooltip: false,
    onChange: Function.prototype,
    onBlur: undefined
  }

  constructor (props) {
    super(props);

    this.state = {
      tooltip: false
    };
  }

  handleChange = evt => {
    const { onChange } = this.props;
    const nextValue = evt.target.value;
    onChange(nextValue);
  }

  handleMouseEnter = () => { this.setState({ tooltip: true }); }
  handleMouseLeave = () => { this.setState({ tooltip: false }); }

  render () {
    const { className, value, min, max, step, disabled, tooltip, onBlur } = this.props;

    let finalValue = parseInt(value, 10);
    finalValue = (finalValue >= min) && (finalValue <= max)
      ? finalValue : ((min + (max - min)) / 2);

    const fillWidth = (finalValue / max) * 100;

    const showTooltip = tooltip && this.state.tooltip;

    let left = `${fillWidth}%`;
    let top = -30;

    if (tooltip && this.inputElem && this.tooltipElem) {
      // Find your center...
      left =
        ((this.inputElem.clientWidth - 30) * (fillWidth / 100))
        - ((this.tooltipElem.clientWidth - 30) / 2);

      top = -45 - (this.tooltipElem.clientHeight / 2);
    }

    const tooltipStyle = {
      top,
      left
    };

    const mouseEvents = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    };

    return (
      <div className={cx(style.sliderInput, disabled && style.disabled, className)}>
        <input
          ref={elem => { this.inputElem = elem; }}
          type="range"
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          value={finalValue}
          onChange={this.handleChange}
          onBlur={onBlur}
          {...mouseEvents}
        />
        {tooltip && <div
          ref={elem => { this.tooltipElem = elem; }}
          style={tooltipStyle}
          className={cx(style.tooltip, showTooltip && style.show)}
        >
          <Frame borders={{ bottom: 1 }}>{finalValue}</Frame>
        </div>}
        <div className={style.fill} style={{ width: `${fillWidth - 2}%` }} />
      </div>
    );
  }
}
