import React, { PureComponent } from 'react';
import cx from 'classnames';

const style = require('./index.scss');

interface CheckboxProps<T = any> {
  // Visual
  className: any;
  label: string;
  // State
  value: boolean;
  disabled: boolean;
  // Events
  onFocus: React.FormEventHandler;
  onChange: (nextValue: T) => void;
  onClick: React.MouseEventHandler;
  onBlur: React.FormEventHandler;
  tabIndex: number;
}

/**
 * <Checkbox />
 *
 * An uncontrolled checkbox.
 * onClick is called with the click event,
 * onChange is called with next value
 *
 */
export default class Checkbox extends PureComponent<CheckboxProps> {
  static defaultProps = {
    className: undefined,
    label: '',
    value: false,
    disabled: false,
    onChange: () => false,
    onClick: () => false,
    onBlur: () => false,
    tabIndex: '0',
    children: undefined,
  };

  input = React.createRef<HTMLInputElement>();

  handleClick = evt => {
    const { value, onClick, onChange } = this.props;

    if (evt.target !== this.input.current) {
      this.input.current.focus();

      onClick(evt);
    }

    onChange(!value);
  };

  render() {
    const { className, value, label, onBlur, onFocus, children } = this.props;
    const { disabled } = this.props;

    const isChecked = !!value;
    const classes = [
      isChecked && style.checked,
      disabled && style.disabled,
      className,
    ];

    return (
      <div
        role="checkbox"
        aria-checked={isChecked}
        className={cx(style.checkbox, classes)}
        onClick={this.handleClick}
      >
        <input
          ref={this.input}
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div className={style.visible}>
          <div className={style.box}>
            <div className={style.border} />
            <i className={cx(style.check, style.iconCheck)} />
          </div>
          <span className={style.label}>{children || label}</span>
        </div>
      </div>
    );
  }
}
