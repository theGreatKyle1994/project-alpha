import { applyRange } from "../../general/functions/utilityFunctions";
// create a blank map chunk according to grid size
const createBlankChunk = (gridSize) => {
  // make a 2D array of length gridSize
  // For example, if gridSize is 2, newChunk will be
  // [
  // [0,0],
  // [0,0]
  // ]
  const newChunk = [];
  for (let i = 0; i < gridSize; i++) {
    const row = Array.from({ length: gridSize }, () => 0);
    newChunk.push(row);
  }
  // Randomly generate points in 2d array that will be used to create open spaces.
  // In other words, each row will have one 0 get changed to a 2.
  // We do this by pushing coordinates to endPoints, which will be returned with the actual
  // map chunk.
  const endPoints = [];
  // Require first and last columns to have an endpoint to connect to other map chunks.
  // In other words, the leftmost and right most columns will have at least one 2.
  // firstColRow and lastColRow are randomly assigned rows where either the first or last
  // value will be changed to 2
  const firstColRow = applyRange(0, gridSize);
  const lastColRow = applyRange(0, gridSize);
  for (let n = 0; n < gridSize; n++) {
    let randomColIndex;
    if (n == firstColRow) {
      randomColIndex = { row: n, col: 0 };
    } else if (n == lastColRow) {
      randomColIndex = { row: n, col: gridSize - 1 };
    } else {
      randomColIndex = { row: n, col: applyRange(0, gridSize) };
    }
    endPoints.push(randomColIndex);
  }
  // Change the 0 to a 2 at each endPoints coords
  for (const point of endPoints) {
    const { row, col } = point;
    newChunk[row][col] = 2;
  }
  // map engine needs both newChunk because it's the actual map, 
  // while endpoints will be used in the map creation algorithms.
  return { newChunk, endPoints };
};

export default createBlankChunk;
