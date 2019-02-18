const common = require('./webpack.common.js');
const html = require('./webpack.html.js');

// Webpack
const merge = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(html, merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin({
      extractComments: true,
    })],
  },
}));