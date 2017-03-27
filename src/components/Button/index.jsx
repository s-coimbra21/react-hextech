import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

/**
 * Button that looks exactly like the golden border buttons on
 * the League Client
 */
export default class Button extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: undefined,
    tabIndex: '0',
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

  componentDidMount () {
    document.addEventListener('mouseup', this.handleMouseUp, false);
  }

  componentWillUnmount () {
    document.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  handleClick = evt => {
    const { onClick, disabled } = this.props;
    if (!disabled) {
      this.playClickAnim();
      onClick && onClick.call && onClick(evt);
    }
  }

  playClickAnim = () => {
    if (this.state.isClick) {
      clearTimeout(this.clickEnd);
      return this.setState({ isClick: false }, this.playClickAnim);
    }

    // Don't block animation if user decides to spam
    window.requestAnimationFrame(() =>
      this.setState({ isClick: true }, () => {
        this.clickEnd = setTimeout(() => {
          this.setState({ isClick: false });
        }, 300);
      })
    );
  }

  // TODO: might want to turn this into an actual state machine instead of this spaghetti
  handleMouseDown = () => this.setState({ isMouseDown: true });
  handleMouseUp = evt => {
    const mouseIsOnButton = this.root && this.root.contains(evt.target);
    this.setState({ isMouseDown: false, isHover: mouseIsOnButton });
  }

  handleMouseEnter = () => this.setState({ isHover: true });
  handleMouseLeave = () => this.setState({ isHover: this.state.isMouseDown });

  render () {
    const { className, tabIndex, children, label, disabled } = this.props;
    const { isHover, isMouseDown, isClick } = this.state;
    const classes = [
      isHover ? style.hover : style.idle,
      isMouseDown && style.down,
      isClick && style.click
    ];

    return (
      <div
        ref={elem => { this.root = elem; }}
        tabIndex={tabIndex}
        role="button"
        className={cx(
          style.button, disabled ? style.disabled : classes, className
        )}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
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
          {children || label}
        </div>
      </div>
    );
  }
}
