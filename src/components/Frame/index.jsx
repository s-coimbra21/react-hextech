import React, { PropTypes, PureComponent } from 'react';
import cx from 'classnames';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

import style from './index.scss';

export default class Frame extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    options: PropTypes.array,
    title: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    className: undefined,
    contentClassName: undefined,
    options: undefined,
    title: undefined,
    message: undefined,
    children: undefined
  };

  render () {
    const { className, contentClassName, options, title, message, children } = this.props;
    return (
      <div className={cx(style.frame, className)}>
        <div className={style.contentWrapper}>
          <div className={cx(style.content, contentClassName)}>
            {title && <h2>{title}</h2>}
            {!children && <p>{message}</p>}
            {children}
          </div>
          {options && <ButtonGroup className={style.buttonGroup}>
            {options.map(o => <Button key={`button_${o.label}`} {...o} />)}
          </ButtonGroup>}
        </div>
        <div className={style.border} />
      </div>
    );
  }
}
