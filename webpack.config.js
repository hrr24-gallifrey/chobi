const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './public/src'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'],
        },
      },
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],
};
