import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import elementResizeDetector from 'element-resize-detector';

import Frame from '../Frame';
import Handle from './Handle';

const style = require('./index.scss');

const erd = elementResizeDetector({
  strategy: 'scroll',
});

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
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    value: undefined,
    min: 0,
    max: 100,
    step: 10,
    disabled: false,
    tooltip: false,
    onChange: Function.prototype,
    onBlur: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      tooltip: false,
      width: 0,
    };
  }

  componentDidMount() {
    // Intentionally discarding first render, don't think there's a better way
    erd.listenTo(this.root, ({ offsetWidth }) =>
      this.handleResize(offsetWidth)
    );
  }

  componentWillUnmount() {
    erd.removeAllListeners(this.root);
  }

  handleChange = evt => {
    const { onChange } = this.props;
    const nextValue = evt.target.value;
    onChange(nextValue);
  };

  handleMouseEnter = () => {
    this.props.tooltip && this.setState({ tooltip: true });
  };

  handleMouseLeave = () => {
    this.props.tooltip && this.setState({ tooltip: false });
  };

  handleResize = width => {
    this.setState({ width });
  };

  render() {
    const {
      className,
      value,
      min,
      max,
      step,
      disabled,
      tooltip,
      onBlur,
    } = this.props;
    const width = this.state.width;

    let finalValue = parseInt(value, 10);
    finalValue =
      finalValue >= min && finalValue <= max
        ? finalValue
        : (min + (max - min)) / 2;

    const fillPercentage = (finalValue / max) * 100;

    const showTooltip = tooltip && this.state.tooltip;

    const left = `${fillPercentage}%`;
    let tooltipOffset = left;
    // defaults for first render
    let handleOffset = `calc(${left} - 15px)`;
    let top = -30;

    if (tooltip && width && this.tooltipElem) {
      // Find your center...
      tooltipOffset =
        (width - 30) * (fillPercentage / 100) -
        (this.tooltipElem.clientWidth - 30) / 2;

      top = -45 - this.tooltipElem.clientHeight / 2;
    }

    if (width) {
      handleOffset = (width - 30) * (fillPercentage / 100);
    }

    const tooltipStyle = {
      top,
      left: tooltipOffset,
    };

    const handleStyle = {
      left: handleOffset,
    };

    const mouseEvents = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

    return (
      <div
        ref={elem => {
          this.root = elem;
        }}
        className={cx(style.sliderInput, disabled && style.disabled, className)}
      >
        <input
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
        <div className={style.control}>
          <div
            className={style.fill}
            style={{ width: `${fillPercentage > 0 ? fillPercentage - 1 : 0}%` }}
          />
          <div className={style.track} />
          <Handle className={style.handle} style={handleStyle} />
        </div>
        {tooltip && (
          <div
            ref={elem => {
              this.tooltipElem = elem;
            }}
            style={tooltipStyle}
            className={cx(style.tooltip, showTooltip && style.show)}
          >
            <Frame borders={{ bottom: 1 }}>{finalValue}</Frame>
          </div>
        )}
      </div>
    );
  }
}
