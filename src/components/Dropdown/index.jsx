import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import withOptions from '../../util/withOptions';

import style from './index.scss';

let instanceId = 1;

/**
 * LoL UIKit Dropdown
 * Receives options in a array of objects with value and label properties
 * value should be present in one of the options' value property
 */
@withOptions
export default class Dropdown extends PureComponent {
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
    onChange: () => false,
    onBlur: () => false,
    onToggle: undefined,
    options: []
  }

  constructor (props) {
    super(props);

    instanceId += 1;
    this.instanceId = instanceId;

    this.state = {
      isOpen: false,
      focusedOption: this.props.value || this.props.options[0]
    };

    this.handleArrowKeyNavigation = this.handleArrowKeyNavigation.bind(this);
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
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleSelect = nextOption => {
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
      this.handleSelect(focusedOption);
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
    this.setState({ focusedOption: option });
  }

  handleKeyDown = evt => {
    const { options } = this.props;

    switch (evt.keyCode) {
      // Tab
      case 9:
        return this.handleSelect(this.state.focusedOption);
      // Enter
      case 13:
        this.handleSelect(this.state.focusedOption);
        break;
      // Space
      case 32:
        this.handleToggle(true);
        break;
      // Escape
      case 27:
        return this.handleSelect(this.state.focusedOption);
      // Up & Down
      case 38:
      case 40:
        this.handleArrowKeyNavigation(evt.keyCode === 40);
        break;
      // End
      case 35:
        this.navigateToOption(options.length);
        break;
      // Home
      case 36:
        this.navigateToOption(0);
        break;
      default:
        return;
    }

    evt.preventDefault();
  }

  handleArrowKeyNavigation = next => {
    const aux = next ? 1 : -1; // if it's next or previous

    const { options } = this.props;
    const { focusedOption } = this.state;

    const currIdx = options.findIndex(o => o === focusedOption);

    const nextIdx = currIdx + aux;

    this.navigateToOption(nextIdx);
  }

  navigateToOption = index => {
    const { options } = this.props;
    const { isOpen } = this.state;

    let nextIdx = index;

    if (nextIdx < 0) nextIdx = options.length - 1;
    if (nextIdx >= options.length) nextIdx = 0;

    if (!isOpen) {
      this.handleSelect(options[nextIdx]);
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
        onClick={() => this.handleSelect(option)}
        onMouseEnter={() => this.handleOptionFocus(option)}
      >
        {option.label}
      </div>
    );
  }

  render () {
    const { options, className, tabIndex, value, expanded } = this.props;
    const { isOpen: isOpenState, focusedOption } = this.state;
    const isOpen = !!isOpenState || !!expanded;

    const selected = focusedOption || options.find(o => o.value === value);

    return (
      <div
        ref={e => { this.root = e; }}
        tabIndex={tabIndex}
        role="combobox"
        aria-expanded={isOpen}
        className={cx(style.dropdown, className)}
        onClick={() => this.handleToggle(!isOpen)}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      >
        <div className={cx(style.control, isOpen && style.active)}>
          {selected ? selected.label : 'Select...'}
          <span className={style.arrow} />
        </div>
        <div
          ref={e => { this.menu = e; }}
          role="listbox"
          aria-hidden={!isOpen}
          className={cx(style.options, { [style.hidden]: !isOpen })}
        >
          {options.map(o => this.renderOption(o, value === o.value, focusedOption === o))}
        </div>
      </div>
    );
  }
}
