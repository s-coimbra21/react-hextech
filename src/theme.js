export const t = {
  gold: 'rgb(94.1%, 90.2%, 82.4%)',
  goldMedium: 'rgb(80.4%, 74.5%, 56.9%)',
  goldDark: 'rgb(78.4%, 60.8%, 23.5%)',

  textLight: 'rgb(94.1%, 90.2%, 82.4%)',
  textDark: 'rgb(62.7%, 60.8%, 54.9%)',
  textDisabled: 'rgb(36.1%, 35.7%, 34.1%)',

  border: 'rgba(155, 125, 35, 0.5)',
  darkBorder: '#453619',
  inputBorder: 'rgb(47.1%, 35.3%, 15.7%)',

  dark: 'rgb(17, 22, 29)',
  lightDark: '#1E2328',
};

export const replacements = Object.keys(t).map(key => ({
  search: `\W?t\.${key}\W?$`,
  replace: `'${t[key]}'`,
  flags: '',
}));

export default {
  hextech: t,
};
