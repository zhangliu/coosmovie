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
        loader: 'babel',
        query: {
          presets: ['react', 'latest'],
          plugins: [['import', {libraryName: 'antd', style: true}]],
        },
        exclude: /node_modules/,
      },
      {test: /\.scss$/i, loader: extractCSS.extract(['css', 'sass']), exclude: /node_modules/},
      {test: /\.less$/i, loader: extractCSS.extract(['css', 'less'])},
    ],
    // resolve: {
    //   extensions: ['', '.js', '.jsx', '.css', '.scss', '.less'],
    //   modulesDirectories: [
    //     'node_modules',
    //   ],
    // },
  },
  // devtool: '#source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/[chunkhash].vendor.bundle.js'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      inject: true,
      chunksSortMode: 'dependency',
    }),
    extractCSS,
    /*new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: JSON.stringify('production'),
      },
    }),*/
  ],
};
