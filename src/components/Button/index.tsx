import React, { PureComponent } from 'react';
import cx from 'classnames';

const style = require('./index.scss');

interface ButtonProps {
  className?: string;
  tabIndex?: string | number;
  label?: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
}
/**
 * Button that looks exactly like the golden border buttons on
 * the League Client
 */
export default class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    className: undefined,
    tabIndex: '0',
    label: undefined,
    disabled: false,
    children: undefined,
  };

  state = {
    isHover: false,
    isMouseDown: false,
    isClick: false,
  };

  root = React.createRef<HTMLDivElement>();

  /* Click end timeout */
  clickEnd = undefined;

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp as any, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp as any, false);
  }

  handleClick: React.MouseEventHandler = evt => {
    const { onClick, disabled } = this.props;

    if (!disabled) {
      this.playClickAnim();
      if (onClick) {
        onClick(evt);
      }
    }
  };

  playClickAnim = () => {
    if (this.state.isClick) {
      clearTimeout(this.clickEnd);
      return this.setState({ isClick: false }, this.playClickAnim);
    }

    if (typeof window === 'undefined') {
      return;
    }

    // Don't block animation if user decides to spam
    window.requestAnimationFrame(() =>
      this.setState({ isClick: true }, () => {
        this.clickEnd = setTimeout(() => {
          this.setState({ isClick: false });
        }, 300);
      })
    );
  };

  // TODO: might want to turn this into an actual state machine instead of this spaghetti
  handleMouseDown = () => this.setState({ isMouseDown: true });

  handleMouseUp = (evt: React.MouseEvent) => {
    const mouseIsOnButton =
      this.root.current && this.root.current.contains(evt.target as Node);
    this.setState({ isMouseDown: false, isHover: mouseIsOnButton });
  };

  handleMouseEnter = () => this.setState({ isHover: true });

  handleMouseLeave = () => this.setState({ isHover: this.state.isMouseDown });

  render() {
    const { className, tabIndex, children, label, disabled } = this.props;
    const { isHover, isMouseDown, isClick } = this.state;
    const classes = [
      isHover ? style.hover : style.idle,
      isMouseDown && style.down,
      isClick && style.click,
    ];

    return (
      <div className={className}>
        <div
          ref={this.root}
          tabIndex={+tabIndex}
          role="button"
          className={cx(
            style.button,
            disabled ? style.disabled : classes,
            className
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
          <div className={style.sheenWrapper}>
            <div className={style.sheen} />
          </div>
          <div className={style.content}>{children || label}</div>
        </div>
      </div>
    );
  }
}
