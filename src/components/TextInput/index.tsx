import React, { PureComponent } from 'react';
import cx from 'classnames';

const style = require('./index.scss');

interface TextInputProps {
  className: string;
  inputClassName: string;
  tabIndex: number;
  value: string;
  type: string;
  disabled: boolean;
  placeholder: string;
  hideClear: boolean;
  onBlur: () => void;
  onChange: (nextValue: string) => void;
}

class TextInput extends PureComponent<TextInputProps> {
  static defaultProps = {
    value: '',
    type: 'text',
    disabled: false,
    hideClear: false,
  };

  handleChange = evt => {
    evt.preventDefault();

    const { disabled, onChange } = this.props;
    if (!disabled && onChange) {
      onChange(evt.target.value);
    }
  };

  handleClear = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange('');
    }
  };

  render() {
    const {
      className,
      inputClassName,
      disabled,
      value,
      hideClear,
      children,
      ...inputProps
    } = this.props;

    const showClear = !hideClear && value !== '';

    return (
      <div className={cx(style.input, disabled && style.disabled, className)}>
        <i
          className={cx(style.clear, showClear && style.show)}
          onClick={this.handleClear}
        />
        <input
          {...inputProps}
          className={cx(style.inputElement, inputClassName)}
          disabled={disabled}
          value={value}
          onChange={this.handleChange}
        />
        {children}
      </div>
    );
  }
}

export default TextInput;
