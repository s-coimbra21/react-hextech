const presets = [
  '@babel/preset-react',
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'entry',
      targets: {
        chrome: '58',
        ie: '11',
      },
      modules: false,
    },
  ],
  '@babel/preset-typescript',
];

const plugins = [
  'polished',
  ['styled-components', { ssr: true, displayName: true }],
  '@babel/plugin-proposal-class-properties',
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push('babel-plugin-typescript-to-proptypes');
}

module.exports = {
  presets,
  plugins,
};
