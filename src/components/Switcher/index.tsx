import React, { PureComponent } from 'react';
import { withPropsOnChange } from 'recompose';

import { Item } from './components';

import style from './index.m.scss';

export interface SwitcherItem {
  key?: string;
  label: string;
  value?: string;
  to?: string;
  [key: string]: any;
}

interface SwitcherProps {
  items: SwitcherItem[];
  value?: SwitcherItem;

  onChange: (nextValue: SwitcherItem) => void;
  onFocus: React.FocusEventHandler<HTMLDivElement>;
  onBlur: React.FocusEventHandler<HTMLDivElement>;

  getActiveItem: (props: SwitcherProps) => SwitcherItem | void;
}

class Switcher extends PureComponent<SwitcherProps> {
  state = {
    x: 0,
    width: 0,
    renderBar: false,
  };

  list = React.createRef<HTMLUListElement>();

  componentDidMount() {
    this.syncBar();
    this.setState({ renderBar: true });
  }

  componentDidUpdate(prevProps: SwitcherProps) {
    const { items, value } = this.props;

    if (items !== prevProps.items || value !== prevProps.value) {
      this.syncBar();
    }
  }

  syncBar() {
    const { items, value } = this.props;
    const selectedIdx = items.findIndex(item => item === value);

    if (selectedIdx === -1) {
      return this.setState({ x: 0, width: 0 });
    }

    const list = this.list.current;

    const selectedElement = list.children[selectedIdx] as HTMLLIElement;

    this.setState({
      x: selectedElement.offsetLeft - list.offsetLeft,
      width: selectedElement.clientWidth,
    });
  }

  getActiveItem = () => {
    const { value, getActiveItem } = this.props;

    if (getActiveItem) {
      return getActiveItem(this.props);
    }

    return value;
  };

  handleItemClick = item => {
    const { onChange } = this.props;

    onChange(item);
  };

  render() {
    const { items = [], onFocus, onBlur } = this.props;
    const { x, width, renderBar } = this.state;

    const activeItem = this.getActiveItem();

    return (
      <div onFocus={onFocus} onBlur={onBlur}>
        <ul className={style.list} ref={this.list}>
          {items.map(item => (
            <Item
              key={item.key || item.label}
              active={item === activeItem}
              item={item}
              onClick={this.handleItemClick}
            />
          ))}
        </ul>
        {renderBar && (
          <div
            className={style.bar}
            style={{ width, transform: `translateX(${x}px)` }}
          />
        )}
      </div>
    );
  }
}

export { Item };

export default withPropsOnChange(
  ['children', 'items'],
  ({ children, items }) => ({
    items: items || React.Children.map(children, child => child.props),
  })
)(Switcher);
