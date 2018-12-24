import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const style = require('./index.scss');

const RadioOption: React.SFC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  name,
  value,
  label,
  checked,
  disabled,
  onChange,
  onBlur,
}) => (
  <div
    className={cx(
      style.radioOption,
      checked && style.checked,
      disabled && style.disabled
    )}
  >
    <input
      type="radio"
      id={`opt__${value}`}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      checked={checked}
      disabled={disabled}
    />
    <label htmlFor={`opt__${value}`} className={style.label}>
      <svg
        className={style.control}
        viewBox="0 0 6 6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="hextech-option-active"
            x1="100%"
            y1="100%"
            x2="0%"
          >
            <stop stopColor="#684e23" />
            <stop offset=".8" stopColor="#493915" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="4" height="4" />
      </svg>
      {children && children}
      {label && <span className={style.labelText}>{label}</span>}
    </label>
  </div>
);

RadioOption.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.any.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

RadioOption.defaultProps = {
  children: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: () => false,
  label: undefined,
  checked: false,
  disabled: false,
};

export default RadioOption;
