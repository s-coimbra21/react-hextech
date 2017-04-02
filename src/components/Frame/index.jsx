import React, { PropTypes, PureComponent } from 'react';
import cx from 'classnames';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

import style from './index.scss';

export default class Frame extends PureComponent {

  static propTypes = {
    // Visual
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    borders: PropTypes.object,
    // State
    options: PropTypes.array,
    title: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    className: undefined,
    contentClassName: undefined,
    borders: {
      top: true,
      bottom: true,
      left: false,
      right: false
    },
    options: undefined,
    title: undefined,
    message: undefined,
    children: undefined
  };

  render () {
    const { className, contentClassName, borders, options, title, message, children } = this.props;
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
        <div
          className={
            cx(style.border,
          ...Object.entries(borders).map(([s, v]) => v && style[s]))
          }
        />
      </div>
    );
  }
}
