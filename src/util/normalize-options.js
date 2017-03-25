export function normalizeOption (option) {
  return Object.assign(
    {},
    ...option,
    {
      value: option.value || option,
      label: option.label || option
    }
  );
}

export default function normalizeOptions (options) {
  if (!options || !options.map) return options;
  return options.map(normalizeOption);
}
