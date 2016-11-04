const webpack = require('webpack')
module.exports = {
  entry: ['babel-polyfill', './index.js'],
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
        query: {presets: ['react', 'latest']},
        exclude: /node_modules/,
      },
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.scss'],
      // modulesDirectories: [
      //   'node_modules',
      // ],
    },
  },
  devtool: '#source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),
  ],
};
