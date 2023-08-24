import { applyRange } from "../../general/functions/utilityFunctions";
import { createHorizontalPath, createVerticalPath } from "./create-paths";

// Chain algo takes the randomly generated list of endpoints and links
// the first to the second, the second to the third, and so on
export const createChain = ({ newChunk, endPoints }) => {
  for (let i = 0; i < endPoints.length; i++) {
    const start = endPoints[i];
    const end = endPoints[(i + 1) % endPoints.length];
    const rise = start.row - end.row;
    const run = start.col - end.col;
    const moveDirection = applyRange(0, 2);
    if (moveDirection) {
      createHorizontalPath(newChunk, rise, run, end, start);
    } else {
      createVerticalPath(newChunk, rise, run, end, start);
    }
  }
  return newChunk;
};
// Spoke algo takes list of randomly generated endpoints, chooses one a
// the hub, then connects that one hub to every other endpoint.
export const createSpoke = ({ newChunk, endPoints }) => {
  // select random endpoint to be the hub
  const hubIndex = applyRange(0, endPoints.length);
  const hubTile = endPoints.splice(hubIndex, 1).pop();
  endPoints.forEach((spoke) => {
    // calculate the row and col distance between the hub and the spoke
    const rise = hubTile.row - spoke.row;
    const run = hubTile.col - spoke.col;
    // function when moving vertically first
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
export const createWeb = ({ newChunk, endPoints }) => {
  // randomize whether path creation should start vert or horiz
  const movement = applyRange(0, 2);

  while (endPoints.length > 0) {
    const start = endPoints.shift();
    endPoints.forEach((end) => {
      const rise = start.row - end.row;
      const run = start.col - end.col;
      if (movement) {
        createHorizontalPath(newChunk, rise, run, end, start);
      } else {
        createVerticalPath(newChunk, rise, run, end, start);
      }
    });
  }
  return newChunk;
};
