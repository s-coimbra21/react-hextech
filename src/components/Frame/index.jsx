import React, { PropTypes } from 'react';
import cx from 'classnames';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

import style from './index.scss';

export default function Frame ({ className, options, title, message, children }) {
  return (
    <div className={cx(style.dialog, className)}>
      <div className={style.contentWrapper}>
        <div className={style.content}>
          {children}
          {!children && <h1>{title}</h1>}
          {!children && <p>{message}</p>}
        </div>
        <ButtonGroup className={style.buttonGroup}>
          {options.map(o => <Button key={`button_${o.text || o.label}`} {...o} />)}
        </ButtonGroup>
      </div>
      <div className={style.border} />
    </div>
  );
}

Frame.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node
};

Frame.defaultProps = {
  children: undefined,
  className: undefined,
  title: '',
  message: ''
};
