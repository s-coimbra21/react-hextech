import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default Cmp =>
  class extends Component {
    static displayName = `stateful(${Cmp.displayName})`;

    static propTypes = {
      hocClassName: PropTypes.any,
      onChange: PropTypes.func,
    };

    static defaultProps = {
      hocClassName: undefined,
      onChange: undefined,
    };

    constructor(props) {
      super(props);

      this.state = {
        value: props.initialValue,
      };
    }

    handleChange = value => {
      const { onChange } = this.props;
      this.setState({ value });
      if (onChange && onChange.call) {
        onChange(value);
      }
    };

    render() {
      const { hocClassName } = this.props;
      return (
        <div className={hocClassName}>
          <Cmp
            {...Object.assign({}, this.props, { hocClassName: undefined })}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  };
