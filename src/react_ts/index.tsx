import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Dragon from './dragon.jpg';
import Bubble from './bubble.jpg';

const App: React.FC<{}> = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    var image = new Image();
    image.src = Dragon;
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
      console.log('imageData', imageData);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, image.width, image.height);

      const gap = 12;

      const container = document.getElementById('container') as HTMLDivElement;
      const scale = 2;

      for (let h = 0; h < image.height; h += gap) {
        for (let w = 0; w < image.width; w += gap) {
          const position = (image.width * h + w) * 4;
          const r = imageData[position],
            g = imageData[position + 1],
            b = imageData[position + 2];

          if (r + g + b != 255 * 3) {
            // when it's not white
            // ctx.fillStyle = "#000";
            // ctx.fillRect(w, h, gap - 2, gap - 2);
            var bubble = document.createElement('img');
            bubble.src = Bubble;
            bubble.setAttribute('class', 'bubble');

            var bubbleSize = Math.random() * 10 + 10;
            bubble.style.left = w * scale - bubbleSize / 2 + 'px';
            bubble.style.top = h * scale - bubbleSize / 2 + 'px';
            bubble.style.width = bubble.style.height = bubbleSize + 'px';
            bubble.style.animationDuration = Math.random() * 6 + 4 + 's';
            bubble.style.position = 'absolute';

            container.appendChild(bubble);
          }
        }
      }
    };
  }, []);

  return (
    <div id="container" style={{display: 'inline-block', position: "relative"}}>
      <canvas id="canvas"></canvas>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
