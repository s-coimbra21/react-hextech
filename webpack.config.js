require('@babel/register')({
  only: [/theme\.js/],
  babelrc: false,
  configFile: false,
  presets: ['@babel/preset-env'],
});

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin');

const replacements = require('./src/theme').replacements;

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },

  entry: ['./src/index.js'],

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@theme': path.resolve(__dirname, 'src', 'theme.js'),
    },
  },

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    library: 'reactHextech',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'string-replace-loader',
            options: { multiple: replacements },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: devMode ? 'style-loader' : ExtractTextPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: 'hextech-[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('autoprefixer'), // eslint-disable-line
                  require('postcss-input-style'), // eslint-disable-line
                ];
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },

      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-otf',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/octet-stream',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-url-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      { test: /\.jpg$/, loader: 'url-loader' },
      { test: /\.webm/, loader: 'file-loader' },
      { test: /\.ogg/, loader: 'file-loader' },
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  ],

  target: 'web',
};
