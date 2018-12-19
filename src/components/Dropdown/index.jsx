import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import withOptions from '../../util/withOptions';

import style from './index.scss';
import Arrow from './Arrow.jsx';

import * as keyboardEventHandlers from './keyboardEvents';

let instanceId = 1;

/**
 * LoL UIKit Dropdown
 * Receives options in a array of objects with value and label properties
 * value should be present in one of the options' value property
 */
class Dropdown extends PureComponent {
  static propTypes = {
    className: PropTypes.any,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    expanded: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onToggle: PropTypes.func,
    options: PropTypes.array
  }

  static defaultProps = {
    className: undefined,
    tabIndex: '0',
    disabled: false,
    value: undefined,
    expanded: undefined,
    onChange: Function.prototype,
    onBlur: Function.prototype,
    onToggle: Function.prototype,
    options: []
  }

  constructor (props) {
    super(props);

    instanceId += 1;
    this.instanceId = instanceId;

    this.searchString = '';

    this.state = {
      isOpen: false,
      focusedOption: undefined,
      focusedIdx: -1
    };

    Object.keys(keyboardEventHandlers).forEach(key => {
      this[key] = keyboardEventHandlers[key].bind(this);
    });
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentDidUpdate (prevProps, prevState) {
    const { isOpen, focusedOption } = this.state;
    const { menu, focused } = this; // DOM refs

    if (focusedOption === prevState.focusedOption) return;

    if (isOpen && (menu.scrollTop > focused.offsetTop)) {
      menu.scrollTop = focused.offsetTop;
    }

    if (isOpen && (focused.getBoundingClientRect().bottom > menu.getBoundingClientRect().bottom)) {
      menu.scrollTop = (focused.offsetTop + focused.offsetHeight) - menu.clientHeight;
    }
  }

  componentWillUnmount () {
    clearTimeout(this.searchTimeout);
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleChange = nextOption => {
    const { onChange, value } = this.props;

    if (nextOption.value !== value) {
      onChange(nextOption.value);
    }

    this.handleToggle(false);
  }

  handleBlur = evt => {
    const { onBlur, value } = this.props;
    const { focusedOption } = this.state;

    if (focusedOption !== value) {
      // this should never happen
      this.handleChange(focusedOption);
    }

    onBlur && onBlur(evt);
  }

  handleDocumentClick = evt => {
    if (!this.root.contains(evt.target) && this.state.isOpen === true) {
      this.handleToggle(false);
    }
  }

  handleToggle = toggled => {
    const { onToggle, expanded } = this.props;
    let nextOpen = toggled;

    if (nextOpen === this.state.isOpen) return;

    if (nextOpen !== false && nextOpen !== true) {
      nextOpen = !this.state.isOpen || !expanded;
    }

    this.setState({
      isOpen: nextOpen
    });

    onToggle && onToggle(nextOpen);
  }

  handleOptionFocus = option => {
    const { options } = this.props;

    const idx = options.findIndex(o => o === option);

    this.setState({ focusedOption: option, focusedIdx: idx });
  }

  navigateToOption = index => {
    const { options } = this.props;
    const { isOpen } = this.state;

    let nextIdx = index;

    if (nextIdx < 0) nextIdx = options.length - 1;
    if (nextIdx >= options.length) nextIdx = 0;

    if (!isOpen) {
      this.handleChange(options[nextIdx]);
    } else if (!isOpen && (nextIdx !== index)) {
      return; // if the select is closed, don't loop over
    }

    this.handleOptionFocus(options[nextIdx]);
  }

  renderOption = (option, isSelected, isFocused = false) => {
    const key = option.key || option.label;
    const ref = isFocused ? e => { this.focused = e; } : undefined;
    const classnames = [
      style.option,
      isSelected && style.selected,
      isFocused && style.focused
    ];

    return (
      <div
        ref={ref}
        key={`${key}-${this.instanceId}`}
        role="option"
        aria-selected={isSelected}
        className={cx(classnames)}
        onClick={() => this.handleChange(option)}
        onMouseEnter={() => this.handleOptionFocus(option)}
      >
        {option.label}
      </div>
    );
  }

  render () {
    const { options, className, tabIndex, value, expanded, disabled } = this.props;
    const { isOpen: isOpenState, focusedOption } = this.state;
    const isOpen = disabled ? false : (!!isOpenState || !!expanded);

    let selected = focusedOption;

    if (!selected || disabled) {
      selected = options.find(o => o.value === value);
    }

    let eventHandlers = {
      onClick: () => this.handleToggle(!isOpen),
      onKeyDown: this.handleKeyDown,
      onBlur: this.handleBlur
    };

    if (disabled) {
      eventHandlers = {};
    }

    return (
      <div
        ref={e => { this.root = e; }}
        tabIndex={disabled ? '-1' : tabIndex}
        role="combobox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        className={cx(style.dropdown, disabled && style.disabled, className)}
        {...eventHandlers}
      >
        <div className={cx(style.control, isOpen && style.active)}>
          {selected ? selected.label : 'Select...'}
          <Arrow className={style.arrow} />
        </div>
        <div
          ref={e => { this.menu = e; }}
          role="listbox"
          aria-hidden={!isOpen}
          className={cx(style.options, { [style.hidden]: !isOpen })}
        >
          {!disabled &&
            options.map(o => this.renderOption(o, value === o.value, focusedOption === o))}
        </div>
      </div>
    );
  }
}

export default withOptions(Dropdown);