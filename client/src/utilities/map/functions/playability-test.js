// checks that every 10x10 chunk is connected 
// ensuring there are no open space islands
const playabilityTest = (map) => {
  const visitedMap = new Set();
  const openChunks = [];

  // find all groupings of open space and add that grouping to an array
  const findFullChunks = (root) => {
    // This is a basic BFS, looking for all array elements that equal 2.
    const visitedChunk = new Set(); // ensures each array element is visited no more than once
    const queue = [root];
    // starting with the root coordinates, find all neighbors that are open
    // and add them to the queue
    while (queue.length > 0) {
      const current = queue.shift();
      const { r, c } = current;
      const coords = `${r}x${c}`;
      // r and c need to be valid coordinates within map, the value of map[r][c] needs to be 2, AND the element needs to be unvisited
      if (r >= 0 && r < map.length && c >= 0 && c < map[r].length && map[r][c] === 2 && !visitedChunk.has(coords)) {
        // visitedMap ensures that spaces aren't visited more than once
        visitedMap.add(coords);
        // visitedChunk groups all available open spaces
        visitedChunk.add(coords);
        // checks for all valid neighbors to add to the queue
        if (r - 1 >= 0 && map[r - 1][c] === 2) queue.push({ r: r - 1, c }); // if the element north of current is 2, add it to the queue
        if (c + 1 < map[r].length && map[r][c + 1] === 2) queue.push({ r, c: c + 1 }); // if the element east of current is 2, add it to queue
        if (r + 1 < map.length && map[r + 1][c] === 2) queue.push({ r: r + 1, c }); // if the element south of current is 2, add it to queue
        if (c - 1 >= 0 && map[r][c - 1] === 2) queue.push({ r, c: c - 1 }); // if the element west of current is 2, add it to the queue
      }
    }

    return visitedChunk;
  };
  //Iterate through map, looking for the first instance of 2.
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      const coords = `${r}x${c}`;
      if (map[r][c] === 2 && !visitedMap.has(coords)) {
        // Find all instances of 2 that connect to root coordinates.
        openChunks.push(findFullChunks({ r, c }));
      }
    }
  }
  // If there is more than one set of open spaces, there is an island
  // and the map is not playable. Return false until map is playable.
  if(openChunks.length === 1) {
    return openChunks
  }
  else return false
};

export default playabilityTest;
