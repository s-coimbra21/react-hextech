import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

/**
 * Button that looks exactly like the golden border buttons on
 * the League Client
 */
export default class Button extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    className: undefined,
    text: undefined,
    label: undefined,
    disabled: false,
    children: undefined
  }

  constructor (props) {
    super(props);

    this.state = {
      isHover: false,
      isMouseDown: false,
      isClick: false
    };
  }

  onClick = () => {
    const { onClick, disabled } = this.props;
    if (!disabled) {
      this.setState({ isClick: true });
      setTimeout(() => {
        if (this.state.isClick) {
          this.setState({ isClick: false });
        }
      }, 600);
      onClick && onClick.call && onClick();
    }
  }

  onMouseDown = () => this.setState({ isMouseDown: true });
  onMouseUp = () => this.setState({ isMouseDown: false });

  onMouseEnter = () => this.setState({ isHover: true });
  onMouseLeave = () => this.setState({ isHover: false, isMouseDown: false });

  render () {
    const { className, children, text, label, disabled } = this.props;
    const { isHover, isMouseDown, isClick } = this.state;
    const hoverClass = !disabled && isHover ? style.hover : style.idle;
    const mouseDownClass = !disabled && isMouseDown && style.down;
    const clickClass = !disabled && isClick && style.click;
    const disabledClass = disabled && style.disabled;
    return (
      <div
        role="button"
        className={cx(
          style.button, hoverClass, mouseDownClass, clickClass, disabledClass, className
        )}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <div className={style.buttonBg} />
        <div className={style.borderIdle} />
        <div className={style.borderTransition} />
        <div className={style.flare} />
        <div className={style.glow} />
        <div className={style.sheenWrapper} >
          <div className={style.sheen} />
        </div>
        <div className={style.content}>
          {children || text || label}
        </div>
      </div>
    );
  }
}
