import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

export default class TextInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    tabIndex: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
    value: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    hideClear: PropTypes.bool,
    children: PropTypes.node,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    className: undefined,
    inputClassName: undefined,
    tabIndex: undefined,
    value: '',
    type: 'text',
    disabled: false,
    placeholder: undefined,
    hideClear: false,
    children: undefined,
    onBlur: () => false,
    onChange: () => false
  }

  handleChange = evt => {
    evt.preventDefault();
    const { disabled, onChange } = this.props;
    if (!disabled && onChange && onChange.call) {
      onChange(evt.target.value);
    }
  }

  handleBlur = evt => {
    const { disabled, onBlur } = this.props;
    if (!disabled && onBlur && onBlur.call) {
      onBlur(evt);
    }
  }

  handleClear = () => {
    const { onChange } = this.props;
    if (onChange && onChange.call) {
      onChange('');
    }
  }

  render () {
    const {
      className,
      inputClassName,
      tabIndex, disabled,
      value,
      type,
      placeholder,
      hideClear,
      children
    } = this.props;

    const showClear = hideClear ? false : value !== '';

    return (
      <div className={cx(style.input, disabled && style.disabled, className)}>
        <i
          className={cx(style.clear, showClear && style.show)}
          onClick={this.handleClear}
        />
        <input
          type={type}
          tabIndex={tabIndex}
          className={cx(style.inputElement, inputClassName)}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {children}
      </div>
    );
  }
}
