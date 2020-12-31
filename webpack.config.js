const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['src/singleSpaEntry.tsx'],
  output: {
    library: 'single-spa-worktime',
    libraryTarget: 'umd',
    filename: 'single-spa-worktime.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: [path.resolve(__dirname, 'node_modules')], loader: 'awesome-typescript-loader' },
      { test: /\.tsx$/, exclude: [path.resolve(__dirname, 'node_modules')], loader: 'awesome-typescript-loader' },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: ['babel-loader', 'eslint-loader']
      },

      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css|\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack','url-loader'],
      },
    ]
  },
  node: {
    fs: 'empty'
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.PrefetchPlugin('react')
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true,
    writeToDisk: true
  }
};
