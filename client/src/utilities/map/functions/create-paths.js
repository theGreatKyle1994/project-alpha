// Used by all map generator engines to create  direct paths between to randomly created points.
// First move needs to be either vertical or horizontal

// Refactor idea: make a rise function and a run function (DRY)
// Then call in order (rise, then run, OR run, then rise) depending on need.
export const createVerticalPath = (mapArray, rise, run, endPoint, startPoint) => {
  // rise determines the number of vertical movements needed to reach endPoint,
  // while run determines the number of horizontal movements needed
  // if rise === 0 then there is no need to move vertically
  if (rise > 0) {
    for (let x = endPoint.row + 1; x <= startPoint.row; x++) {
      if (x < 0 || x >= mapArray.length) continue; // Array bounds check
      if (mapArray[x][endPoint.col] === 1) continue; // Optional: Obstacle check
      mapArray[x][endPoint.col] = 2;
    }
  } else if (rise < 0) {
    for (let x = endPoint.row - 1; x >= startPoint.row; x--) {
      if (x < 0 || x >= mapArray.length) continue; // Array bounds check
      if (mapArray[x][endPoint.col] === 1) continue; // Optional: Obstacle check
      mapArray[x][endPoint.col] = 2;
    }
  }
  // if run === 0 then there is not need to move horizontally
  if (run > 0) {
    for (let y = endPoint.col + 1; y <= startPoint.col; y++) {
      if (y < 0 || y >= mapArray[0].length) continue; // Array bounds check
      if (mapArray[startPoint.row][y] === 1) continue; // Optional: Obstacle check
      mapArray[startPoint.row][y] = 2;
    }
  } else if (run < 0) {
    for (let y = endPoint.col - 1; y >= startPoint.col; y--) {
      if (y < 0 || y >= mapArray[0].length) continue; // Array bounds check
      if (mapArray[startPoint.row][y] === 1) continue; // Optional: Obstacle check
      mapArray[startPoint.row][y] = 2;
    }
  }
};
// used by all map generator engines to create paths between to randomly created points
export const createHorizontalPath = (mapArray, rise, run, endPoint, startPoint) => {
  if (run > 0) {
    for (let y = endPoint.col; y <= startPoint.col; y++) {
      mapArray[endPoint.row][y] = 2;
    }
  } else if (run < 0) {
    for (let y = endPoint.col; y >= startPoint.col; y--) {
      mapArray[endPoint.row][y] = 2;
    }
  }

  if (rise > 0) {
    for (let x = endPoint.row; x <= startPoint.row; x++) {
      mapArray[x][startPoint.col] = 2;
    }
  } else if (rise < 0) {
    for (let x = endPoint.row; x >= startPoint.row; x--) {
      mapArray[x][startPoint.col] = 2;
    }
  }
};