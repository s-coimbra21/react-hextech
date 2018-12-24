import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface StatefulProps<T> {
  initialValue: any;
  hocClassName?: any;
  onChange?: (nextValue: T) => void;
}

export default Cmp =>
  class extends Component<StatetulProps<T>> {
    static displayName = `stateful(${Cmp.displayName})`;

    state = {
      value: undefined,
    };

    handleChange = value => {
      const { onChange } = this.props;
      this.setState({ value });
      if (onChange && onChange.call) {
        onChange(value);
      }
    };

    render() {
      const { hocClassName, initialValue } = this.props;

      return (
        <div className={hocClassName}>
          <Cmp
            {...Object.assign({}, this.props, { hocClassName: undefined })}
            value={this.state.value || initialValue}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  };
