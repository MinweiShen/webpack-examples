const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    library: ['react', 'react-dom'],
  },
  output: {
    filename: '[name]_[hash:8].dll.js',
    path: path.join(__dirname, 'library'),
    library: 'library_dll',
    // clean: true, // this has to be removed. Somehow it will remove the vendor.json
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'library_dll', // this needs to be the same as output.library
      path: path.join(__dirname, 'library', '[name].json'),
    }),
  ],
};