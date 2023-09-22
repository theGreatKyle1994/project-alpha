const playerStartPoint = (currentMap) => {
  // find open space as close to the center of the map as possible
  const x = Math.floor(currentMap.length / 2)
  const y = Math.floor(currentMap[0].length / 2)
  const root = currentMap[x][y]
  if(root === 2){
    return {x,y}
  }
  const queue = [{x,y}]
  const visited = new Set()
  const foundOpenSpace = false
  while(!foundOpenSpace) {
    const {x,y} = queue.shift()
    visited.add(`${x}x${y}`)
    // check if any neighbors are open
    //if not, add neighbor to queue
    // if so, set startingPoint, make foundOpenSpace True and return
    // top neighbor
    if(currentMap[x-1][y] === 2) {
      return {x: x-1, y}
    } else {
      if(!visited.has(`${x-1}x${y}`)) {
        queue.push({x: x-1, y})
      }
    }
    // right neighbor
    if(currentMap[x][y+1] === 2) {
      return {x, y: y+1}
    } else {
      if(!visited.has(`${x}x${y+1}`)) {
        queue.push({x, y: y+1})
      }
    }
    // bottom neighbor
    if(currentMap[x+1][y] === 2) {
      return {x: x+1, y}
    } else {
      if(!visited.has(`${x+1}x${y}`)) {
        queue.push({x: x+1, y})
      }
    }
    // left neighbor
    if(currentMap[x][y-1] === 2) {
      return {x, y: y-1}
    } else {
      if(!visited.has(`${x}x${y-1}`)) {
        queue.push({x, y: y-1})
      }
    }
  }
}

export default playerStartPoint