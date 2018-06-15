import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './index.scss';

function ButtonGroup ({ className, children }) {
  return (
    <div className={cx(style.buttonGroup, className)}>
      <div className={style.content}>
        {children}
      </div>
    </div>
  );
}

ButtonGroup.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default ButtonGroup;
