import { applyRange } from "../../general/functions/utilityFunctions";
import { createHorizontalPath, createVerticalPath } from "./create-paths";

// Chain algo takes the randomly generated list of endpoints and links
// the first to the second, the second to the third, and so on.

// newChunk is the 2D array, and endPoints are the index coordinates of each 2 in newChunk
export const createChain = ({ newChunk, endPoints }) => {
  // iteration takes endpoint in a row (start), the endpoint in the next row (end)
  // and changes the 0's between the two points to a 2.
  for (let i = 0; i < endPoints.length; i++) {
    const start = endPoints[i];
    const end = endPoints[(i + 1) % endPoints.length];
    const rise = start.row - end.row; // number of rows between start and end
    const run = start.col - end.col; // number of cols between start and end
    // flip coin to determine first moving vertically or horizontally
    const moveDirection = applyRange(0, 2);
    if (moveDirection) {
      createHorizontalPath(newChunk, rise, run, end, start);
    } else {
      createVerticalPath(newChunk, rise, run, end, start);
    }
  }
  return newChunk;
};
// Spoke algo takes list of randomly generated endpoints, chooses one as
// the hub, then connects that one hub to every other endpoint.
export const createSpoke = ({ newChunk, endPoints }) => {
  // select random endpoint to be the hub. This hub is not necessarily in the center.
  // It can be any one of the coords in endPoints.
  const hubIndex = applyRange(0, endPoints.length);
  const hubTile = endPoints.splice(hubIndex, 1).pop(); // random index in previous line is assigned to hubTile, then removed
  endPoints.forEach((spoke) => {
    // calculate the row and col distance between the hub and the spoke
    const rise = hubTile.row - spoke.row;
    const run = hubTile.col - spoke.col;
    // flip coin to determine first moving vertically or horizontally
    const movement = applyRange(0, 2);
    if (movement) {
      createVerticalPath(newChunk, rise, run, spoke, hubTile);
    } else {
      createHorizontalPath(newChunk, rise, run, spoke, hubTile);
    }
  });
  
  return newChunk;
};
// Web algo takes a list of randomly generated endpoints and connect each
// endpoint to every other endpoint. Very open and blobby result.

// Web algo is the most inefficient because it is likely iterating over 2's and rewriting them as 2's.
export const createWeb = ({ newChunk, endPoints }) => {
  // flip coin to determine first moving vertically or horizontally
  const movement = applyRange(0, 2);
  
  while (endPoints.length > 0) {
    // take the first coordinates for the start and remove it from the array
    const start = endPoints.shift();
    // iterate through each remaining end point, changing all 0's  on the path to 2's
    endPoints.forEach((end) => {
      // dettermine the horizontal and vertical distances between start and end.
      const rise = start.row - end.row;
      const run = start.col - end.col;
      // change all 0's to 2's
      if (movement) {
        createHorizontalPath(newChunk, rise, run, end, start);
      } else {
        createVerticalPath(newChunk, rise, run, end, start);
      }
    });
  }
  return newChunk;
};
