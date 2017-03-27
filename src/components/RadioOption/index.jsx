import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

function RadioOption ({ children, value, label, checked, disabled, onChange, onBlur }) {
  return (
    <div
      className={cx(style.radioOption, checked && style.checked, disabled && style.disabled)}
    >
      <input
        type="radio"
        id={`opt__${value}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={`opt__${value}`} className={style.label}>
        <div className={style.checkbox}>
          <div className={style.square} />
        </div>
        {children && children}
        {label && <span className={style.labelText}>{label}</span>}
      </label>
    </div>
  );
}

RadioOption.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

RadioOption.defaultProps = {
  children: undefined
};

export default RadioOption;
