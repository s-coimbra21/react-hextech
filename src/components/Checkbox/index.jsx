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
class Checkbox extends PureComponent {

  static propTypes = {
    // Visual
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.string,
    children: PropTypes.node,
    // State
    checked: PropTypes.bool,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    // Events
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    className: undefined,
    label: undefined,
    checked: false,
    value: false,
    disabled: false,
    onChange: () => false,
    onClick: () => false,
    onBlur: () => false,
    children: undefined
  };

  isChecked = () => {
    const { checked, value } = this.props;
    return (checked === 'selected' || checked === true) || value;
  }

  handleClick = evt => {
    const { disabled, onClick, onChange } = this.props;
    if (!disabled) {
      onClick(evt);
      onChange(!this.isChecked());
      this.test && this.test.blur(); // TODO: Investigate if this is too hacky
    }
  }

  handleBlur = evt => {
    const { disabled, onBlur } = this.props;
    if (!disabled) {
      onBlur(evt);
    }
  }

  render () {
    const { className, label, children } = this.props;
    const { disabled } = this.props;

    const isChecked = this.isChecked();
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
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        tabIndex={disabled ? undefined : '1'}
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

export default Checkbox;
