const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // jpg files will be referenced as src=data:image/jpeg;base64,xxxx
        // this is the same as url-loader in webpack4
        test: /\.(jpg|jpeg)$/,
        type: 'asset/inline'
      },
      {
        // png files will be loaded as file, and referenced as src=url
        // this is the same as using file-loader in webpack4
        test: /\.png$/,
        type: 'asset/resource'
      },
      {
        // text files will be loaded as string
        // this is the same as using raw-loader in webpack4
        test: /\.txt$/,
        type: 'asset/source'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template.html')
    })
  ],
  devtool: 'eval-source-map', // controls the source-map format
}