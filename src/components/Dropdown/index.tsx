import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';

import { withOptions } from '@utils';

import { Option as OptionType } from '../../utils/option';

import Wrapper from './components/Wrapper';
import Arrow from './components/Arrow';

import * as keyboardEventHandlers from './keyboardEvents';

import style from './index.m.scss';

const cx = classnames.bind(style);

interface DropdownProps<T = any> {
  className?: any;
  placeholder?: string | false;
  hideIcon?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  value?: any;
  onChange?: (nextValue: OptionType<T>) => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onToggle?: (nextOpen: boolean) => void;
  options?: OptionType<T>[];
  transparent?: boolean;
  isOpen?: boolean;
}

interface DropdownState {
  isOpen: boolean;
  focusedOption: any;
  focusedIdx: number;
}
/**
 * LoL UIKit Dropdown
 * Receives options in a array of objects with value and label properties
 * value should be present in one of the options' value property
 */
class Dropdown extends PureComponent<DropdownProps, DropdownState> {
  static defaultProps = {
    className: undefined,
    tabIndex: 0,
    disabled: false,
    value: undefined,
    onChange: Function.prototype,
    options: [],
  };

  searchTimeout: number;
  searchString = '';
  handleKeyDown: React.KeyboardEventHandler;

  root = React.createRef<HTMLDivElement>();
  menu = React.createRef<HTMLDivElement>();
  focused = React.createRef<HTMLDivElement>();

  constructor(props: DropdownProps) {
    super(props);

    this.state = {
      isOpen: false,
      focusedOption: props.value,
      focusedIdx: -1,
    };

    Object.keys(keyboardEventHandlers).forEach(key => {
      this[key] = keyboardEventHandlers[key].bind(this);
    });
  }

  componentDidMount() {
    if (this.props.isOpen) this.setState({ isOpen: true });

    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    clearTimeout(this.searchTimeout);
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  componentDidUpdate(_: any, prevState: DropdownState) {
    const { isOpen, focusedOption } = this.state;
    const { menu, focused } = this; // DOM refs

    if (!focused.current) {
      return;
    }

    // only update if necessary
    if (focusedOption === prevState.focusedOption) {
      if (isOpen === prevState.isOpen) {
        return;
      }
    }

    if (isOpen && menu.current.scrollTop >= focused.current.offsetTop) {
      menu.current.scrollTop = focused.current.offsetTop;
      return;
    }

    if (
      isOpen &&
      focused.current.getBoundingClientRect().bottom >
        menu.current.getBoundingClientRect().bottom
    ) {
      menu.current.scrollTop =
        focused.current.offsetTop +
        focused.current.clientHeight -
        menu.current.clientHeight;
    }
  }

  handleChange = nextOption => {
    const { onChange, value } = this.props;

    this.handleOptionFocus(nextOption);

    if (nextOption !== value) {
      onChange(nextOption);
    }

    this.handleToggle(false);
  };

  handleDocumentClick = evt => {
    if (this.state.isOpen && !this.root.current.contains(evt.target)) {
      this.handleToggle(false);
    }
  };

  // Prevent dropdown from losing focus before option is selected
  handleOptionMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  handleToggle = forceNextOpen => {
    const { onToggle, disabled } = this.props;
    const { isOpen } = this.state;

    if (disabled) return;

    const nextOpen = forceNextOpen.target ? !isOpen : forceNextOpen;

    if (nextOpen === this.state.isOpen) {
      return;
    }

    this.setState({
      isOpen: nextOpen,
    });

    if (onToggle) onToggle(nextOpen);
  };

  handleOptionFocus = option => {
    this.setState({ focusedOption: option });
  };

  navigateToOption = index => {
    const { options } = this.props;
    const { isOpen } = this.state;

    if (typeof index !== 'number') return;

    let nextIdx = index;
    if (nextIdx < 0) {
      nextIdx = options.length - 1;
    } else if (nextIdx >= options.length) {
      nextIdx = 0;
    }

    if (!isOpen) {
      this.handleChange(options[nextIdx]);
    } else if (nextIdx !== index) {
      return; // if the select is open, don't loop over
    }
    this.handleOptionFocus(options[nextIdx]);
  };

  renderOption = option => {
    const key = option.key || option.label;
    const selected = this.props.value === option;
    const focused = this.state.focusedOption === option;

    return (
      <div
        key={key}
        className={cx('option', { selected, focused })}
        role="option"
        aria-selected={selected}
        ref={focused ? this.focused : undefined}
        onMouseDown={this.handleOptionMouseDown}
        onClick={() => this.handleChange(option)}
        onMouseEnter={() => this.handleOptionFocus(option)}
      >
        {option.label}
      </div>
    );
  };

  render() {
    const {
      options,
      className,
      tabIndex,
      value,
      disabled,
      transparent,
      onFocus,
      onBlur,
      placeholder = 'Select...',
      hideIcon,
    } = this.props;

    const { isOpen } = this.state;
    const open = disabled ? false : !!isOpen;

    const noPlaceholder = placeholder === false;

    return (
      <Wrapper
        ref={this.root}
        onKeyDown={this.handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        {...{ open, className, disabled }}
      >
        {!noPlaceholder && (
          <h4
            tabIndex={disabled ? -1 : tabIndex}
            className={cx('control', { open, transparent })}
            onClick={this.handleToggle}
          >
            <span>{value ? value.label : placeholder}</span>
            {!hideIcon && <Arrow key={'arrow'} />}
          </h4>
        )}
        <div
          role="listbox"
          aria-hidden={!open}
          ref={this.menu}
          className={cx('menu', { open, noPlaceholder })}
        >
          {options.map(this.renderOption)}
        </div>
      </Wrapper>
    );
  }
}

export default withOptions(Dropdown);
