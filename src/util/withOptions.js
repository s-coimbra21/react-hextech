import React, { PureComponent } from 'react';
import deburr from 'lodash.deburr';
import { createSelector } from 'reselect';

const optionsSelector = props => props.options;

function normalizeOption(option) {
  return Object.assign(
    {},
    {
      value: option.value || option,
      label: option.label || option,
      // used for searching
      hextech__label: deburr(option.label || option).toLowerCase(),
    },
  );
}

const createNormalizeOptions = () => createSelector(
  optionsSelector,
  options => {
    if (!options || !options.map) return options;
    return options.map(normalizeOption);
  },
);

export default Cmp => class extends PureComponent {
    static displayName = `withOptions(${Cmp.displayName})`;

    static defaultProps = {
      options: [],
    };

    constructor(props) {
      super(props);

      this.normalizeOptions = createNormalizeOptions();
    }

    render() {
      return <Cmp {...this.props} options={this.normalizeOptions(this.props)} />;
    }
};
