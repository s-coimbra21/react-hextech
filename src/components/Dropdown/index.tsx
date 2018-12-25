import React, { PureComponent } from 'react';

import { withOptions } from '@utils';

import { Option as OptionType } from '../option';

import Wrapper from './components/Wrapper';
import Arrow from './components/Arrow';
import Option from './components/Option';

import * as keyboardEventHandlers from './keyboardEvents';

const cx = require('./index.scss');

interface DropdownProps<T = any> {
  className?: any;
  tabIndex?: string | number;
  disabled?: boolean;
  value?: any;
  onChange?: (nextValue: OptionType<T>) => void;
  onBlur?: () => void;
  onToggle?: (nextOpen: boolean) => void;
  options?: OptionType<T>[];
  transparent?: boolean;
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
    if (!this.root.current.contains(evt.target)) {
      this.handleToggle(false);
    }
  };

  handleToggle = nextOpen => {
    const { onToggle } = this.props;

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
    const isSelected = this.props.value === option;
    const isFocused = this.state.focusedOption === option;

    return (
      <Option
        ref={isFocused ? this.focused : undefined}
        key={key}
        aria-selected={isSelected}
        selected={isSelected}
        focused={isFocused}
        onClick={() => this.handleChange(option)}
        onMouseEnter={() => this.handleOptionFocus(option)}
      >
        {option.label}
      </Option>
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
      onBlur,
    } = this.props;

    const { isOpen: isOpenState } = this.state;
    const open = disabled ? false : !!isOpenState;

    const eventHandlers = disabled
      ? {}
      : {
          onClick: () => this.handleToggle(!open),
          onKeyDown: this.handleKeyDown,
          onBlur,
        };

    return (
      <Wrapper
        ref={this.root}
        {...{ open, className, disabled }}
        {...eventHandlers}
      >
        <h4 className={cx('control', { open, transparent })}>
          <span>{value ? value.label : 'Select...'}</span>
          <Arrow key={'arrow'} />
        </h4>
        <div
          role="listbox"
          aria-hidden={!open}
          ref={this.menu}
          className={cx('menu', { open })}
        >
          {options.map(this.renderOption)}
        </div>
      </Wrapper>
    );
  }
}

export default withOptions(Dropdown);
