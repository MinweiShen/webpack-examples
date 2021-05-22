const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;


const { ANALYZE } = process.env;

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './template.html'),
  }),
  new Webpack.DllReferencePlugin({
    manifest: require('./library/library.json'),
    name: 'library_dll',
  }),
  new CopyPlugin({
    patterns: [
      { from: path.resolve(__dirname, './library'), to: path.resolve(__dirname, './dist') },
    ],
  }),
];
if (ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin({ open: true }));
}

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.tsx'),
  externals: {
    // this will exclude it from bundle. This actually doesn't work because react-dom relies on React and index.tsx relies on react-dom!!
    //'react-dom': 'ReactDOM' 
  },
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader?cacheDirectory=true']
    },
    {
      test: /\.(jpg|jpeg)$/,
      type: 'asset/inline'
    },
    ]
  },
  plugins,
  devServer: {
    /* because the dlls are in the library folder, we make this contentBase library 
    For production build, we need to add another step to copy the library folder content to dist
    Of course, dlls can be cached in CI and we only need to do the copy
    */
    contentBase: path.join(__dirname, 'library'),
    hot: true,
    port: 9000,
    open: true,
  },
}