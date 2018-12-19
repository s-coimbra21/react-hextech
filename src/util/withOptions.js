import React, { PureComponent } from 'react';
import deburr from 'lodash.deburr';
import { createSelector } from 'reselect';

const optionsSelector = props => props.options;

function normalizeOption(option) {
  return Object.assign({}, ...option, {
    value: option.value || option,
    label: option.label || option,
    hextech__label: deburr(option.label || option).toLowerCase()
  });
}

const normalizeOptions = createSelector(
  optionsSelector,
  options => {
    if (!options || !options.map) return options;
    return options.map(normalizeOption);
  }
);

export default Cmp =>
  class extends PureComponent {
    static displayName = `withOptions(${Cmp.displayName})`;

    static defaultProps = {
      options: []
    };

    render() {
      return <Cmp {...this.props} options={normalizeOptions(this.props)} />;
    }
  };
