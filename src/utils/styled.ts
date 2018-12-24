/**
 * Get a variable from the hextech theme
 *
 * @param {string} name hextech theme variable name
 */
export const v = name => ({ theme }) => theme.hextech[name];

/**
 * Ternary hextech theme variable getter
 *
 * @param {Function} predicate predicate to test with component props
 * @param {string} left variable name if predicate is true
 * @param {*} right variable name if predicate is false
 * @returns {(p: P) => any} props
 */
export const vif = (predicate, left, right) => props => {
  const hextech = props.theme.hextech;

  return predicate(props) ? hextech[left] : hextech[right];
};

/**
 * Gets a prop from the component and optionally appends a css unit
 *
 * @param {string} name component prop name
 * @param {'px' | 'em' | 'pt' | 'rem' | 'vh' | 'vw'} unit CSS unit
 */
export const p = (name, unit = '') => props => `${props[name]}${unit}`;
