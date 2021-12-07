const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  for (let index = 0; index < 70; index++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return () => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 210) continue;

        context.lineWidth = math.mapRange(dist, 10, 200, 8, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      // agent.bounce(width, height);
      agent.wrap(width, height);
    });
  };

  // note: the code bellow animated without the animate methode from canvas-sketch
  // return () => {
  //   const animate = () => {
  //     // note: https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
  //     requestAnimationFrame(animate);
  //     context.fillStyle = 'white';
  //     context.fillRect(0, 0, width, height);

  //     agents.forEach((agent) => {
  //       agent.update();
  //       agent.draw(context);
  //     });
  //   };
  //   animate();
  // };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    // note: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(3, 8);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.velocity.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.velocity.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 2;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}

// const pointA = new Point(800, 400, 10);
// const pointB = new Point(600, 200, 15);

// let points = [];

// for (let index = 0; index < 1100; index++) {
//   points.push(
//     new Point(
//       random.range(0, 1080),
//       random.range(0, 1080),
//       random.range(3, 10),
//     ),
//   );
//   context.beginPath();
//   context.arc(
//     points[index].x,
//     points[index].y,
//     points[index].radius,
//     0,
//     Math.PI * 2,
//   );
//   context.fillStyle = 'black';
//   context.fill();
//   console.log(points);
// }
