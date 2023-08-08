//This mapping algorithm creates one random open tile on each row. (see endpoints line 15-23)
// One endpoint is randomly chosen to be the hub, with every other endpoint (or spoke) connecting to this hub
//
// TODO: Modularize horizontal and vertical functions to utilize in other generateMap algos
const generateSpokeMap = (size) => {
  // Create blank map grid with borders of 1 along all sides
  const bookEnds = Array.from({length: size}, () => 1)
  const newMap = [bookEnds]
  for(let i = 1; i < size - 1; i++){
    // interior items are zero as 1's cannot be overwritten during generatin
    const newRow = Array.from({length: size}, () => 0)
    newRow[0] = 1
    newRow[size - 1] = 1
    newMap.push(newRow)
  }
  newMap.push(bookEnds)
  // create a list of randomized endpoints
  const endPoints = []
  for(let n = 0; n < size - 2; n++){
    const randomColIndex = [n+1,randomizeBlock(1,size-2)]
    endPoints.push(randomColIndex)
  }
  // write endpoints to the map
  for(let r = 1; r < newMap.length - 1; r++) {
    const [x,y] = endPoints[r-1]
    newMap[x][y] = 2
  }
  // select random endpoint to be the hub
  const hubIndex = randomizeBlock(0, endPoints.length)
  const hubTile = endPoints.splice(hubIndex, 1).flat()
  endPoints.forEach(spoke => {
    // calculate the row and col distance between the hub and the spoke
    // hubTile = [row, col]
    // spoke = [row,col]
    const rise = hubTile[0] - spoke[0]
    const run = hubTile[1] - spoke[1]
    // function when moving vertically first
    const verticalMove = () => {
      // depending on whether rise is + or -, update coords...a-coord-ingly.
      // Beginning at spoke, move vertically to the hub row, then horizontally,
      // changing the value to 2 along the way.
      if(rise > 0) {
        for(let x = spoke[0] + 1; x <= hubTile[0]; x++) {
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${x}x${spoke[1]}`)
          if(newMap[x][spoke[1]] === 1) continue
          newMap[x][spoke[1]] = 2
        }
      } else if(rise < 0) {
        for(let x = spoke[0] - 1; x >= hubTile[0]; x--) {
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${x}x${spoke[1]}`)
          if(newMap[x][spoke[1]] === 1) continue
          newMap[x][spoke[1]] = 2
        }
      }
      if(run > 0) {
        for(let y = spoke[1] + 1; y <= hubTile[1]; y++) {
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${hubTile[0]}x${y}`)
          if(newMap[hubTile[0]][y] === 1) continue
          newMap[hubTile[0]][y] = 2
        }
      } else if(run < 0) {
        for(let y = spoke[1] -1; y >= hubTile[1]; y--) {
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${hubTile[0]}x${y}`)
          if(newMap[hubTile[0]][y] === 1) continue
          newMap[hubTile[0]][y] = 2
        }
      }
    }
    // function when moving horizontally first
    const horizontalMove = () => {
      // Depending on whether run is + -, travers the map accordingly.
      // Move horizontally from the spoke to the same column as the hub,
      // then move vertically, changing values to 2 along the way.
      if(run > 0){
        for(let y = spoke[1] - 1; y <= hubTile[1]; y++){
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${spoke[0]}x${y}`)
          if(newMap[spoke[0]][y] === 1) continue
          newMap[spoke[0]][y] = 2
        }
      } else if(run< 0){
        for(let y = spoke[1] + 1; y >= hubTile[1]; y--){
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${spoke[0]}x${y}`)
          if(newMap[spoke[0]][y] === 1) continue
          newMap[spoke[0]][y] = 2
        }
      }
      if(rise > 0){
        for(let x = spoke[0] - 1; x <= hubTile[0]; x++){
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${x}x${hubTile[1]}`)
          if(newMap[x][hubTile[1]] === 1) continue
          newMap[x][hubTile[1]] = 2
        }
      } else if (rise < 0) {
        for(let x = spoke[0] + 1; x >= hubTile[0]; x--){
          console.log('spoke:', spoke, 'hub', hubTile, 'changing:', `${x}x${hubTile[1]}`)
          if(newMap[x][hubTile[1]] === 1) continue
          newMap[x][hubTile[1]] = 2
        }
      }
    }
    // flip coin to determine first moving vertically or horizontally
    const movement = randomizeBlock(0,2)
    if(movement) {
      verticalMove()
    } else {
      horizontalMove()
    }
  })

  return newMap 
}

const randomizeBlock = (min, max) => {
  const block = Math.floor(Math.random() * (max-min) + min)
  return block
}

export {generateSpokeMap}