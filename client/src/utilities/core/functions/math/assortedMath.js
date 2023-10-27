const { sqrt } = Math;

export const normalizeVector = (vectorIn = { x: 0, y: 0, actual: 1 }) => {
  const vector = vectorIn;
  // Grabbing our magnitude
  const magnitude = sqrt(vector.x ** 2 + vector.y ** 2);
  // Normalizing the speed vector
  const normalizedSpeed = {
    x: Number(((vector.x / magnitude) * vector.actual).toFixed(1)),
    y: Number(((vector.y / magnitude) * vector.actual).toFixed(1)),
  };
  // Making sure our magnitude isnt exactly zero
  if (magnitude !== 0) {
    vector.x = normalizedSpeed.x;
    vector.y = normalizedSpeed.y;
  }
  return vector;
};
