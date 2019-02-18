const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const html = require('./webpack.html.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(html, merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin({
      extractComments: true,
    })],
  },
}));