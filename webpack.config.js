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
        use: ['style-loader', 'css-loader','resolve-url-loader','sass-loader']
      },

      {
        test: /\.(svg|png|jpg|jpeg|gif|mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }]

      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  stats:{
    errorDetails: true, //this does show errors
    // colors: false,
    modules: true,
    reasons: true
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
