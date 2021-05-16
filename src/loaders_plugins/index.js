import './style.less'
import webpack1 from './assets/webpack1.png';
import webpack2 from './assets/webpack2.jpeg';
import sample from './assets/sample.txt';

// need to use import isFunction from 'lodash/isFunction' to enable tree-shaking
// however, the babel-plugin-lodash will help us do this
// we can potentially use https://github.com/lodash/lodash-webpack-plugin to remove even more code!!!
import { isFunction } from 'lodash'; 

[webpack1, webpack2].map(src => {
  const img = new Image();
  img.src = src;
  return img;
}).forEach(img => document.appendChild(img));

console.log(sample);

console.log(isFunction(() => {}))