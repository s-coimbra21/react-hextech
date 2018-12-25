import React, { PureComponent } from 'react';
import cx from 'classnames';

import { withOptions } from '@utils';

import RadioOption from '../RadioOption';
import { Option } from '../option';

const style = require('./index.scss');

interface RadioInputProps<T = any> {
  className?: any;
  disabled?: boolean;
  value: any;
  label?: string;
  options: Option<T>[];
  onChange: (nextValue: any) => void;
  onBlur?: () => void;
}

class RadioInput extends PureComponent<RadioInputProps> {
  static defaultProps = {
    className: undefined,
    disabled: false,
    value: undefined,
    label: '',
    options: [],
    onChange: Function.prototype,
    onBlur: Function.prototype,
  };

  handleSelect = (nextValue, evt) => {
    evt.preventDefault();
    const { value, onChange } = this.props;

    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  render() {
    const { options, className, disabled, value, label, onBlur } = this.props;

    return (
      <div
        role="radiogroup"
        aria-labelledby={label}
        className={cx(style.radioInput, className)}
      >
        {options.map((o, i) => (
          <RadioOption
            key={`${o.label}`}
            name={`group-option`}
            checked={o.value === value}
            disabled={disabled || o.disabled}
            onChange={evt => this.handleSelect(o.value, evt)}
            onBlur={onBlur}
            label={o.label}
            value={o.value}
            tabIndex={i > 0 ? -1 : 0}
          />
        ))}
      </div>
    );
  }
}

export default withOptions(RadioInput);
