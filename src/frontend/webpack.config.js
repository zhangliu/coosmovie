const webpack = require('webpack')
module.exports = {
  entry: {
    app: './index.js',
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router'],
  },
  output: {
    path: 'js',
    filename: 'bundle.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react', 'latest'],
          plugins: [['import', {libraryName: 'antd', style: true}]],
        },
        exclude: /node_modules/,
      },
      {test: /\.scss$/, loaders: ['style', 'css', 'sass'], exclude: /node_modules/},
      {test: /\.less$/, loader: 'style!css!less'},
    ],
    // resolve: {
    //   extensions: ['', '.js', '.jsx', '.css', '.scss', '.less'],
    //   modulesDirectories: [
    //     'node_modules',
    //   ],
    // },
  },
  //devtool: '#source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
};
