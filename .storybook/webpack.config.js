const path = require('path');
const webpack = require('webpack');

const config = require('../webpack.config');

delete config.externals;
delete config.entry;
delete config.output;

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      devMode ? 'development' : 'production'
    ),
  }),
];

config.plugins = plugins;

module.exports = config;
