import createPopulatedChunk from "./functions/create-populated-chunk"
import playabilityTest from "./functions/playability-test";
const generateMap = (rows,cols, chunkSize = 10) => {
  // create a 2D array of chunks acording to rows and cols
  const createMap = () => {
    const newMap = []
    // create all of the needed map chunks for the requested grid size
    // First, create an array with length rows
    const chunks = Array.from({ length: rows }, () =>
      // Second, in each row, created a map chunk for every col
      // For example, if rows = 2 and cols = 2, chunks will look like
      // [ [chunk1, chunk 2], [chunk3, chunk4]]
          Array.from({ length: cols }, () => createPopulatedChunk('random', chunkSize))
    );
    // Each chunk (1, 2, 3, 4) is a 2D array of length chunkSize.
    // For a playable map, we need to flatten these chunks down to a 2D array.
    // First for loop iterates through chunks. In our working example above,
    // chunkRow[0] = [chunk1, chunk2]
    // chunkRow[1] = [chunk3, chunk4]
    for (let chunkRow = 0; chunkRow < rows; chunkRow++) {
      // The next for loop iterates through each row in each chunk in the row (first 1, 2, then 3, 4)
      for (let rowInChunk = 0; rowInChunk < chunkSize; rowInChunk++) {
        // combinedRow will hold the values from chunkN[rowInChunk].
        // For example, chunk1[rowInChunk] and chunk2[rowInChunk]
        const combinedRow = [];
        for (let chunkCol = 0; chunkCol < cols; chunkCol++) {
          // In our ongoing example, chunk will be chunk1, then chunk 2 upon first iteration
          const chunk = chunks[chunkRow][chunkCol];
          // Take the nth row from chunk and push it to combinedRow
          const chunkRowData = chunk[rowInChunk] || [];
          combinedRow.push(...chunkRowData);
        }
        newMap.push(combinedRow);
      }
    }
    return newMap
  }
  // run playabilty test to ensure all open spaces are connected. No islands!!
  let validMap = false
  let mapTry = createMap()
  while(!validMap){
    const mapTest = playabilityTest(mapTry)
    if(mapTest){
      validMap = true
    } else {
      mapTry = createMap()
    }
  }
  return mapTry
}

export default generateMap
