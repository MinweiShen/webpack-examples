# Webpack Examples
The basic idea of how webpack works:
1. Starting from entry, read all the dependencies (need the help of loaders in most cases)
2. Build a map like `{filename: function() {eval(code)})}` where `code` is some kind of transformation of the code in the file
3. Replace all `import/require` with `__webpack_require__` which read the code from the built map.
4. some helper functions like `__webpack_require__.n`, `__webpack_require__.d`, `__webpack_require__.o` and `__webpack_require__.r` are used to facilitate the process.
5. Everything is wrapped in a IIFE.

## Some difference between webpack 5 vs webpack 4
1. `type: 'asset'` to replace file-loader, url-loader and raw-loader

## Q&A
### Which `devtool` to use?