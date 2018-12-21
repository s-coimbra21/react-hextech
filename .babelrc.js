module.exports = {
  presets: [
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
  ],
  plugins: [
    'polished',
    ['styled-components', { ssr: true, displayName: true }],
    '@babel/plugin-proposal-class-properties',
  ],
};
