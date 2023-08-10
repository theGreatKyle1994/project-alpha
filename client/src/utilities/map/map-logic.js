const createBlankMap = (size) => {
  // Create blank map grid with borders of 1 along all sides
  const bookEnds = Array.from({ length: size }, () => 1);
  const newMap = [bookEnds];
  for (let i = 1; i < size - 1; i++) {
    // interior items are zero as 1's cannot be overwritten during generation
    const newRow = Array.from({ length: size }, () => 0);
    newRow[0] = 1;
    newRow[size - 1] = 1;
    newMap.push(newRow);
  }
  newMap.push(bookEnds);
  // create a list of randomized endpoints
  const endPoints = [];
  for (let n = 0; n < size - 2; n++) {
    const randomColIndex = [n + 1, randomizeBlock(1, size - 2)];
    endPoints.push(randomColIndex);
  }
  // write endpoints to the map
  for (let r = 1; r < newMap.length - 1; r++) {
    const [x, y] = endPoints[r - 1];
    newMap[x][y] = 2;
  }
  return { newMap, endPoints };
};
// This mapping algorithm takes a list of randomly generated points, and links the first,
// to the second, and so on.
const generateChainMap = (mapParams) => {
  const { newMap, endPoints } = mapParams;
  for (let i = 0; i < endPoints.length; i++) {
    const start = endPoints[i];
    const end = !i == endPoints.length - 1 ? endPoints[i + 1] : endPoints[0];
    const rise = start[0] - end[0];
    const run = start[1] - end[1];
    const movement = randomizeBlock(0, 2);
    if (movement) {
      createHorizontalPath(newMap, rise, run, end, start);
    } else {
      createVerticalPath(newMap, rise, run, end, start);
    }
  }
  return newMap;
};
// This mapping algorithm takes a list of randomly generated endpoints, linking each endpoint
// to every other endpoint.
const generateWebMap = (mapParams) => {
  const { newMap, endPoints } = mapParams;
  // randomize whether path creation should start vert or horiz
  const movement = randomizeBlock(0, 2);

  while (endPoints.length > 0) {
    const start = endPoints.shift();
    endPoints.forEach((end) => {
      const rise = start[0] - end[0];
      const run = start[1] - end[1];
      if (movement) {
        createHorizontalPath(newMap, rise, run, end, start);
      } else {
        createVerticalPath(newMap, rise, run, end, start);
      }
    });
  }
  return newMap;
};
//This mapping algorithm creates one random open tile on each row. (see endpoints line 15-23)
// One endpoint is randomly chosen to be the hub, with every other endpoint (or spoke) connecting to this hub
const generateSpokeMap = (mapParams) => {
  const { newMap, endPoints } = mapParams;
  // select random endpoint to be the hub
  const hubIndex = randomizeBlock(0, endPoints.length);
  const hubTile = endPoints.splice(hubIndex, 1).flat();
  endPoints.forEach((spoke) => {
    // calculate the row and col distance between the hub and the spoke
    // hubTile = [row, col]
    // spoke = [row,col]
    const rise = hubTile[0] - spoke[0];
    const run = hubTile[1] - spoke[1];
    // function when moving vertically first
    // flip coin to determine first moving vertically or horizontally
    const movement = randomizeBlock(0, 2);
    if (movement) {
      createVerticalPath(newMap, rise, run, spoke, hubTile);
    } else {
      createHorizontalPath(newMap, rise, run, spoke, hubTile);
    }
  });

  return newMap;
};
// used by all map generator engines to create paths between to randomly created points
const createVerticalPath = (mapArray, rise, run, endPoint, startPoint) => {
  // depending on whether rise is + or -, update coords...a-coord-ingly.
  // Beginning at endPoint, move vertically to the hub row, then horizontally,
  // changing the value to 2 along the way.
  if (rise > 0) {
    for (let x = endPoint[0] + 1; x <= startPoint[0]; x++) {
      if (mapArray[x][endPoint[1]] === 1) continue;
      mapArray[x][endPoint[1]] = 2;
    }
  } else if (rise < 0) {
    for (let x = endPoint[0] - 1; x >= startPoint[0]; x--) {
      if (mapArray[x][endPoint[1]] === 1) continue;
      mapArray[x][endPoint[1]] = 2;
    }
  }
  if (run > 0) {
    for (let y = endPoint[1] + 1; y <= startPoint[1]; y++) {
      if (mapArray[startPoint[0]][y] === 1) continue;
      mapArray[startPoint[0]][y] = 2;
    }
  } else if (run < 0) {
    for (let y = endPoint[1] - 1; y >= startPoint[1]; y--) {
      if (mapArray[startPoint[0]][y] === 1) continue;
      mapArray[startPoint[0]][y] = 2;
    }
  }
};
// used by all map generator engines to create paths between to randomly created points
const createHorizontalPath = (mapArray, rise, run, endPoint, startPoint) => {
  // Depending on whether run is + -, travers the map accordingly.
  // Move horizontally from the endPoint to the same column as the hub,
  // then move vertically, changing values to 2 along the way.
  if (run > 0) {
    for (let y = endPoint[1] - 1; y <= startPoint[1]; y++) {
      if (mapArray[endPoint[0]][y] === 1) continue;
      mapArray[endPoint[0]][y] = 2;
    }
  } else if (run < 0) {
    for (let y = endPoint[1] + 1; y >= startPoint[1]; y--) {
      if (mapArray[endPoint[0]][y] === 1) continue;
      mapArray[endPoint[0]][y] = 2;
    }
  }
  if (rise > 0) {
    for (let x = endPoint[0] - 1; x <= startPoint[0]; x++) {
      if (mapArray[x][startPoint[1]] === 1) continue;
      mapArray[x][startPoint[1]] = 2;
    }
  } else if (rise < 0) {
    for (let x = endPoint[0] + 1; x >= startPoint[0]; x--) {
      if (mapArray[x][startPoint[1]] === 1) continue;
      mapArray[x][startPoint[1]] = 2;
    }
  }
};
const randomizeBlock = (min, max) => {
  const block = Math.floor(Math.random() * (max - min) + min);
  return block;
};

// master function to call an algo based on user input
const generateNewMap = (engine, size) => {
  const mapParams = createBlankMap(size);
  console.log(mapParams);
  const mapOptions = {
    spoke: () => {
      generateSpokeMap(mapParams);
    },
    web: () => {
      generateWebMap(mapParams);
    },
    chain: () => {
      generateChainMap(mapParams);
    },
  };
  const mapFunction = mapOptions[engine];
  mapFunction();
  console.log(mapParams.newMap);
  return mapParams.newMap;
};
export default generateNewMap;
