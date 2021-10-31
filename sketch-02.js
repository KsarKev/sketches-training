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

    console.log(width);

    const cx = width * 1;
    const cy = height * 1;
    // const cx = 0;
    // const cy = 0;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 40;
    const radius = width * 0.6;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-angle);
      ctx.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      ctx.beginPath();
      ctx.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle);

      ctx.lineWidth = random.range(4, 20);

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -5),
        slice * random.range(1, 10),
      );
      ctx.stroke();
      ctx.restore();
    }
  };
};

canvasSketch(sketch, settings);
