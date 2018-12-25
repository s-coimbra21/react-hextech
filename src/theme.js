export const palette = {
  gold: 'rgb(240, ​230, ​210)',
  goldMedium: 'rgb(205, ​190, 145)',
  goldDark: 'rgb(200, 155, 60)',

  black: 'rgb(17, 22, 29)',
  richBlack: 'rgb(1, 11, 19)',
  gunmetal: 'rgb(30, 35, 40)',
};

export const t = {
  ...palette,

  textLight: palette.gold,
  textDark: 'rgb(160, 155, 140)',
  textDisabled: 'rgb(92, 91, 87)',

  border: 'rgba(155, 125, 35, 0.5)',
  borderDark: 'rgb(69, 54, 23)',
  borderInput: 'rgb(120, 90, 40)',
};

export const replacements = Object.keys(t).map(key => ({
  search: `\W?t\.${key}\W?$`,
  replace: `'${t[key]}'`,
  flags: '',
}));

export default {
  hextech: t,
};
