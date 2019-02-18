const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // the template you want to use
      template: path.join(__dirname, "src", "index.hbs"),
      // the output file name
      filename: path.join(__dirname, "dist", "index.html"),
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "index.hbs"),
      output: path.join(process.cwd(), "dist", "[name].html"),
      data: path.join(__dirname, "src/data/config.json"),
      partials: [
        path.join(process.cwd(), "src", "components", "*", "*.hbs")
      ],
      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(process.cwd(), "src", "helpers", "*.js")
      },
    }),
  ]
};