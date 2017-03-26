import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

function RadioOption ({ children, value, label, checked, disabled, onClick, onBlur }) {
  return (
    <div
      role="radio"
      aria-checked={checked}
      className={cx(style.radioOption, checked && style.checked, disabled && style.disabled)}
      onClick={onClick}
      onBlur={onBlur}
    >
      <div className={style.checkbox}>
        <div className={style.square} />
      </div>
      <span className={style.label}>{children || label}</span>
    </div>
  );
}

RadioOption.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func
};

export default RadioOption;
