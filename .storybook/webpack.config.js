const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: 'hextech-[local]-[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  require('autoprefixer'), // eslint-disable-line
                  require('postcss-input-style') // eslint-disable-line
                ];
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },

      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-otf' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-url-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      { test: /\.jpg$/, loader: 'url-loader' },
      { test: /\.webm/, loader: 'file-loader' },
      { test: /\.ogg/, loader: 'file-loader' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  target: 'web'
};
