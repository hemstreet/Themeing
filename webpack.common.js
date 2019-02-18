const path = require('path');
const mode = process.env.NODE_ENV || 'production';
const isProd = mode === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
  target: "web",
  entry: './src/app.ts',
  output: {
    filename: `[name].${ isProd ? 'min.' : ''}js`,
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          isProd
            ? {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [postcssPresetEnv(), cssnano()],
              },
            }
            : null,
          'sass-loader',
        ].filter(Boolean),
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          knownHelpersOnly: false,
          inlineRequires: /\/assets\/(:?images|audio|video)\//ig,
          // helperDirs: [path.join(__dirname, '/lib/hbs-helpers')],
          partialDirs: [path.resolve(__dirname, './src/components')],
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].${ isProd ? 'min.' : ''}css`,
      fallback: 'style-loader',
      use: [{ loader: 'css-loader', options: { minimize: isProd } }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"]
  }
};