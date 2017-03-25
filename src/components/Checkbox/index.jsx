import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';


/**
 * <Checkbox />
 *
 * An uncontrolled checkbox.
 * onClick is called with the click event,
 * onChange is called with next value
 *
 */
export default class Checkbox extends PureComponent {
  static propTypes = {
    // Visual
    className: PropTypes.any,
    label: PropTypes.string,
    children: PropTypes.node,
    // State
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    // Events
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    className: undefined,
    label: '',
    value: false,
    disabled: false,
    onChange: () => false,
    onClick: () => false,
    onBlur: () => false,
    children: undefined
  };

  handleClick = evt => {
    const { value, onClick, onChange } = this.props;
    onClick(evt);
    onChange(!value);
    this.test && this.test.blur(); // TODO: Investigate if this is too hacky
  }

  handleBlur = evt => {
    const { onBlur } = this.props;
    onBlur(evt);
  }

  render () {
    const { className, value, label, children } = this.props;
    const { disabled } = this.props;

    let eventHandlers = {
      onClick: this.handleClick,
      onBlur: this.handleBlur
    };

    if (disabled) {
      eventHandlers = {};
    }

    const isChecked = !!value;
    const classes = [
      isChecked && style.checked,
      disabled && style.disabled,
      className
    ];

    return (
      <div
        ref={elem => { this.test = elem; }}
        role="checkbox"
        aria-checked={isChecked}
        className={cx(style.checkbox, classes)}
        tabIndex={disabled ? undefined : '1'}
        {...eventHandlers}
      >
        <div className={style.box}>
          <div className={style.border} />
          <i className={cx(style.check, style.iconCheck)} />
        </div>
        <span className={style.label}>{children || label}</span>
      </div>
    );
  }
}
