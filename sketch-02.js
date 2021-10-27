const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
// import { randomRange, degToRad } from './utility-Functions';

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 12;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      ctx.save();
      ctx.translate(x, y);
      // note: to convert a degree to a radian for example 45deg it s needed to do the following operation (45 / 180 * Math.PI)
      ctx.rotate(-angle);
      ctx.scale(random.range(0.5, 2), random.range(1, 2));

      ctx.beginPath();
      ctx.rect(-w * 0.5, -h * 0.5, w, h);
      ctx.fill();
      ctx.restore();
    }

    // ctx.translate(100, 400);
    // ctx.beginPath();
    // ctx.arc(0, 0, 50, Math.PI * 2, false);
    // ctx.fill();
  };
};

canvasSketch(sketch, settings);
