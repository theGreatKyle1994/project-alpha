import createPopulatedChunk from "./functions/create-populated-chunk"
import playabilityTest from "./functions/playability-test";
const generateMap = (rows,cols, chunkSize = 10) => {
  // create a 2D array of chunks acording to rows and cols
  const createMap = () => {
    const newMap = []
    // create all of the needed map chunks for the requested grid size
    const chunks = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => createPopulatedChunk('random', chunkSize))
      );
    // nested for loops to create a 2D array from the array of chunks
    for (let chunkRow = 0; chunkRow < rows; chunkRow++) {
        for (let rowInChunk = 0; rowInChunk < chunkSize; rowInChunk++) {
            const combinedRow = [];
            for (let chunkCol = 0; chunkCol < cols; chunkCol++) {
                const chunk = chunks[chunkRow][chunkCol];
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
