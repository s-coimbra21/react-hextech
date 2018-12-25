import React from 'react';
import cx from 'classnames';

const style = require('./index.scss');

interface ButtonGroupProps {
  className?: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, children }) => (
  <div className={cx(style.buttonGroup, className)}>
    <div className={style.content}>{children}</div>
  </div>
);

export default ButtonGroup;
