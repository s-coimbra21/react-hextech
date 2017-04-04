import React, { PureComponent } from 'react';
import deburr from 'lodash.deburr';
import { createSelector } from 'reselect';

const optionsSelector = props => props.options;

function normalizeOption (option) {
  return Object.assign(
    {},
    ...option,
    {
      value: option.value || option,
      label: option.label || option,
      hextech__label: deburr(option.label || option).toLowerCase()
    }
  );
}

const normalizeOptions = createSelector(
  optionsSelector,
  options => {
    if (!options || !options.map) return options;
    return options.map(normalizeOption);
  });

export default WrappedComponent => class extends PureComponent {
  static defaultProps = {
    options: []
  }

  render () {
    return <WrappedComponent {...this.props} options={normalizeOptions(this.props)} />;
  }
};
