const common = require('./webpack.common.js');
const html = require('./webpack.html.js');
const path = require('path');

// Webpack
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');

module.exports = merge(html, merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    contentBase: path.resolve(__dirname, "."),
    watchContentBase: true,
    compress: true,
    port: 9001,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ]
}));