'use strict';
module.exports = {
  entry: './file2.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, loader: 'babel', query: {presets: ['es2015']}},
    ],
  },
};
