const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin(); // this is used to see time spent on each loader and plugin
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;
const HappyPack = require('happypack');


const { ANALYZE } = process.env;

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './template.html')
  }),
  // new HappyPack({
  //   loaders: [ 'babel-loader' ]
  // })
];
if (ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin({ open: true }));
}

module.exports = smp.wrap({
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
        // use: ['happypack/loader']
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
  plugins,
  devtool: 'eval-source-map', // controls the source-map format
});