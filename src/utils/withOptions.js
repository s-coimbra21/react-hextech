import deburr from 'lodash.deburr';
import { withPropsOnChange } from 'recompose';

function normalizeOption(option) {
  return Object.assign(
    {},
    {
      value: option.value || option,
      label: option.label || option,
      // used for searching
      hextech__label: deburr(option.label || option).toLowerCase(),
    }
  );
}

const normalizeOptions = options => {
  if (!options || !options.map) return options;
  return options.map(normalizeOption);
};

export const withOptions = withPropsOnChange(['options'], ({ options }) => ({
  options: normalizeOptions(options),
}));
