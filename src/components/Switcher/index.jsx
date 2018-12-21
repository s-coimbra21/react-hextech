import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withPropsOnChange } from 'recompose';

import List from './components/List';
import Item from './components/Item';
import Bar from './components/Bar';

class Switcher extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    getActiveItem: PropTypes.func
  };

  state = {
    x: 0,
    width: 0,
    renderBar: false
  };

  list = React.createRef();

  componentDidMount() {
    this.syncBar();
    this.setState({ renderBar: true });
  }

  componentDidUpdate(prevProps) {
    const { items, value } = this.props;

    if (items !== prevProps.items || value !== prevProps.value) {
      this.syncBar();
    }
  }

  syncBar() {
    const { items, value } = this.props;
    const selectedIdx = items.findIndex(item => item === value);

    if (selectedIdx === -1) return this.setState({ x: 0, width: 0 });

    const list = this.list.current;

    const selectedElement = list.children[selectedIdx];

    this.setState({
      x: selectedElement.offsetLeft - list.offsetLeft,
      width: selectedElement.clientWidth
    });
  }

  getActiveItem = () => {
    const { value, getActiveItem } = this.props;

    if (getActiveItem) return getActiveItem(this.props);

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
        <List ref={this.list}>
          {items.map(item => (
            <Item
              key={item.key || item.label}
              active={item === activeItem}
              item={item}
              onClick={this.handleItemClick}
            />
          ))}
        </List>
        {renderBar && <Bar x={x} width={width} />}
      </div>
    );
  }
}

export { Item };

export default withPropsOnChange(
  ['children', 'items'],
  ({ children, items }) => ({
    items: items || React.Children.map(children, child => child.props)
  })
)(Switcher);
