import React, { PureComponent } from 'react';
import { withOptions } from '@utils';

import Wrapper from './components/Wrapper';
import Control from './components/Control';
import Menu from './components/Menu';
import Option from './components/Option';

import * as keyboardEventHandlers from './keyboardEvents';

interface DropdownProps {
	className?: any;
	tabIndex?: string | number;
	disabled?: boolean;
	value?: any;
	onChange?: (...args: any[]) => any;
	onBlur?: (...args: any[]) => any;
	onToggle?: (...args: any[]) => any;
	options?: any[];
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
		tabIndex: '0',
		disabled: false,
		value: undefined,
		onChange: Function.prototype,
		onBlur: Function.prototype,
		onToggle: Function.prototype,
		options: [],
  };

	constructor(props) {
		super(props);
		this.searchString = '';
		this.state = {
			isOpen: false,
			focusedOption: props.value,
			focusedIdx: -1,
		};
		Object.keys(keyboardEventHandlers).forEach(key => {
			this[key] = keyboardEventHandlers[key].bind(this);
		});
  }

	menu = React.createRef();
  focused = React.createRef();

	componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, false);
		document.addEventListener('touchend', this.handleDocumentClick, false);
  }

	componentWillUnmount() {
		clearTimeout(this.searchTimeout);
		document.removeEventListener('click', this.handleDocumentClick, false);
		document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

	componentDidUpdate(_, prevState) {
		const { isOpen, focusedOption } = this.state;
		const { menu, focused } = this; // DOM refs
		if (!focused.current) return;
		// only update if necessary
		if (focusedOption === prevState.focusedOption) {
			if (isOpen === prevState.isOpen) return;
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
		if (!this.root.contains(evt.target)) {
			this.handleToggle(false);
		}
  };
  
	handleToggle = nextOpen => {
		const { onToggle } = this.props;
		if (nextOpen === this.state.isOpen) return;
		this.setState({
			isOpen: nextOpen,
		});
		onToggle(nextOpen);
  };
  
	handleOptionFocus = option => {
		this.setState({ focusedOption: option });
  };

	navigateToOption = index => {
		const { options } = this.props;
		const { isOpen } = this.state;
		if (typeof index !== 'number') return;
		let nextIdx = index;
		if (nextIdx < 0) nextIdx = options.length - 1;
		if (nextIdx >= options.length) nextIdx = 0;
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
				role="option"
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
		} = this.props;
		const { isOpen: isOpenState } = this.state;
    const isOpen = disabled ? false : !!isOpenState;

		let eventHandlers = {
			onClick: () => this.handleToggle(!isOpen),
			onKeyDown: this.handleKeyDown,
			onBlur: this.props.onBlur,
    };

		if (disabled) {
			eventHandlers = {};
    }

		return (
			<Wrapper
				ref={e => {
					this.root = e;
				}}
				{...{ isOpen, className, isDisabled: disabled }}
				{...eventHandlers}
			>
				<Control
					value={value}
					isDisabled={disabled}
					{...{ isOpen, tabIndex, transparent }}
				/>
				<Menu ref={this.menu} isHidden={!isOpen}>
					{options.map(this.renderOption)}
				</Menu>
			</Wrapper>
		);
	}
}

export default withOptions(Dropdown);
