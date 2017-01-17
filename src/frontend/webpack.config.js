const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// multiple extract instances
const extractCSS = new ExtractTextPlugin('css/[chunkhash].[name].css');

module.exports = {
  entry: {
    app: './index.js',
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router'],
  },
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'js/[chunkhash].bundle.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'latest'],
          plugins: [['import', {libraryName: 'antd', style: true}]],
        },
        exclude: /node_modules/,
      },
      {test: /\.scss$/i, loader: extractCSS.extract(['css-loader', 'sass-loader']), exclude: /node_modules/},
      // antd 在 node_modules 中，所以不能忽略
      {test: /\.less$/i, loader: extractCSS.extract(['css-loader', 'less-loader'])},
    ],
  },
  // devtool: '#source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      inject: true,
      chunksSortMode: 'dependency',
    }),
    extractCSS,
  ],
};
