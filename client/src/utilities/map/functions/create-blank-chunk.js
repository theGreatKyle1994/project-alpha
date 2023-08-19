import { applyRange } from "../../general/functions/utilityFunctions";
// create a blank map chunk according to grid size
const createBlankChunk = (gridSize) => {
  // make a 2D array of length gridSize
  const newChunk = [];
  for (let i = 0; i < gridSize; i++) {
    const row = Array.from({ length: gridSize }, () => 0);
    newChunk.push(row);
  }
  // randomly generate points in 2d array that will be used to create open
  // spaces
  const endPoints = [];
  // require first and last columns to have an endpoint to connect to other map chunks
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
  //write endpoints to the map chunk
  for (const point of endPoints) {
    const { row, col } = point;
    newChunk[row][col] = 2;
  }
  return { newChunk, endPoints };
};

export default createBlankChunk;
