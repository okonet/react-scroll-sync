/* global __dirname */

const path = require('path')

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ScrollSync'
  },
  module: {
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
}
