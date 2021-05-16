import './style.less'
import webpack1 from './assets/webpack1.png';
import webpack2 from './assets/webpack2.jpeg';
import sample from './assets/sample.txt';

[webpack1, webpack2].map(src => {
  const img = new Image();
  img.src = src;
  return img;
}).forEach(img => document.appendChild(img));

console.log(sample);
