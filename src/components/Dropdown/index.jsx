import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import normalizeOptions from '../../util/normalize-options';

import style from './index.scss';

/**
 * LoL UIKit Dropdown
 * Receives options in a array of objects with value and label properties
 * value should be present in one of the options' value property
 */
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
    this.state = {
      isOpen: false
    };
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleOptionClick = nextValue => {
    const { onChange } = this.props;
    this.setState({
      isOpen: false
    });
    onChange(nextValue);
  }

  handleDocumentClick = evt => {
    const { onToggle } = this.props;
    if (!this.mounted && !this.domElement.contains(evt.target)) {
      this.setState({ isOpen: false });

      if (onToggle && onToggle.call) {
        onToggle(false, evt);
      }
    }
  }

  handleBlur = evt => {
    const { onBlur, disabled } = this.props;
    if (!disabled) {
      onBlur(evt);
    }
  }

  handleToggle = evt => {
    const { onToggle, expanded } = this.props;
    const isOpen = !!this.state.isOpen || !!expanded;
    this.setState({
      isOpen: !isOpen
    });

    if (onToggle && onToggle.call) {
      onToggle(!isOpen, evt);
    }
  }

  renderOption = (option, idx, selectedValue) => {
    const isSelected = option.value === selectedValue;
    const classnames = cx(style.option, { [style.selected]: isSelected });
    return (
      <div
        key={option.value || idx}
        role="option"
        aria-selected={isSelected}
        className={classnames}
        onClick={() => this.handleOptionClick(option.value)}
      >
        {option.label}
      </div>
    );
  }

  render () {
    const { options: baseOptions, className, tabIndex, value, expanded } = this.props;
    const { isOpen: isOpenState } = this.state;
    const isOpen = !!isOpenState || !!expanded;

    const options = normalizeOptions(baseOptions);

    const selected = options.find(o => o.value === value);

    return (
      <div
        ref={e => { this.domElement = e; }}
        tabIndex={tabIndex}
        role="combobox"
        aria-expanded={isOpen}
        className={cx(style.dropdown, className)}
        onClick={this.handleToggle}
      >
        <div className={cx(style.control, isOpen && style.active)}>
          {selected ? selected.label : 'Select...'}
          <span className={style.arrow} />
        </div>
        <div
          role="listbox"
          aria-hidden={!isOpen}
          className={cx(style.options, { [style.hidden]: !isOpen })}
        >
          {options.map((o, i) => this.renderOption(o, i, value))}
        </div>
      </div>
    );
  }
}
