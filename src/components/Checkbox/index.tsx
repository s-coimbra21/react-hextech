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
  onChange: (nextValue: T) => void;
  onClick: React.MouseEventHandler;
  onBlur: React.EventHandler<any>;
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

  root = React.createRef<HTMLDivElement>();

  handleClick = evt => {
    const { value, onClick, onChange } = this.props;
    onClick(evt);
    onChange(!value);
    this.root.current && this.root.current.blur(); // TODO: Investigate if this is too hacky
  };

  handleBlur = evt => {
    const { onBlur } = this.props;
    onBlur(evt);
  };

  render() {
    const { className, value, label, children } = this.props;
    const { disabled } = this.props;

    let eventHandlers = {
      onClick: this.handleClick,
      onBlur: this.handleBlur,
    };

    if (disabled) {
      eventHandlers = {} as any;
    }

    const isChecked = !!value;
    const classes = [
      isChecked && style.checked,
      disabled && style.disabled,
      className,
    ];

    return (
      <div
        ref={this.root}
        role="checkbox"
        aria-checked={isChecked}
        className={cx(style.checkbox, classes)}
        {...eventHandlers}
      >
        <input type="checkbox" onChange={this.handleClick} />
        <div className={style.box}>
          <div className={style.border} />
          <i className={cx(style.check, style.iconCheck)} />
        </div>
        <span className={style.label}>{children || label}</span>
      </div>
    );
  }
}
