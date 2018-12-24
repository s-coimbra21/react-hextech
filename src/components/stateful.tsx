import React, { PureComponent } from 'react';

function stateful<P>(Cmp: React.ComponentType<P>) {
  interface StatefulProps<T = any> {
    initialValue: any;
    hocClassName?: any;
    onChange?: (nextValue: T) => void;
  }

  return class extends PureComponent<P & StatefulProps> {
    static displayName = `stateful(${Cmp.displayName || Cmp.name})`;

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
      const { hocClassName, initialValue, ...rest } = this.props;

      return (
        <div className={hocClassName}>
          <Cmp
            {...rest as P}
            value={this.state.value || initialValue}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  };
}

export default stateful;
