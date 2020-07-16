const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      Root: path.resolve(__dirname, 'src'),
      Models: path.resolve(__dirname, 'src/models'),
      Utils: path.resolve(__dirname, 'src/utils'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  devServer: {
    open: true,
    port: 8080,
  },
}