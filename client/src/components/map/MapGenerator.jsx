import React from 'react'
import { generateSpokeMap } from '../../utils/map/map-logic'
import { Row, TileWall, TileGrass } from './MapCSS'
// TO DO:
// generate random map with walls and open space
const MapGenerator = (props) => {
  const {size} = props
  const randomMap = generateSpokeMap(size)
  return(
    <>
      {randomMap.map((row, rIndex) => {
        return (
          <Row key={rIndex}>
            {row.map((tile, cIndex) => {
              if(tile === 2) {
                return <TileGrass key={`r${cIndex}`} />
              } else {
                return <TileWall key={`r${cIndex}`} />
              }
            })}
          </Row>
        )
      })}
    </>
  )
}

export default MapGenerator