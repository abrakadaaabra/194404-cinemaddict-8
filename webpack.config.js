const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: {
    port: 8081,
    contentBase: path.join(__dirname, 'public'),
    publicPath: 'http://localhost:8081/',
    hot: true,
    compress: true
  }
}
