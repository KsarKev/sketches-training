export const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

export const randomRange = (min, max) => {
  return Math.random() * (max - min) + 1;
};
