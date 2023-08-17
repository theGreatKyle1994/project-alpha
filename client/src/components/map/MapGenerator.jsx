import generatePopulatedChunk from "../../utilities/map/functions/create-populated-chunk";
import generateMap from "../../utilities/map/map-engine";
import { Row, TileWall, TileGrass } from "./MapCSS";
const MapGenerator = () => {
  // generate a map based on three different algos: web, chain, or spoke
  const randomMap = generateMap(3,3);
  return (
    <>
      {randomMap.map((row, rIndex) => {
        return (
          <Row key={rIndex}>
            {row.map((tile, cIndex) => {
              if (tile === 2) {
                return <TileGrass key={`r${cIndex}`} />;
              } else {
                return <TileWall key={`r${cIndex}`} />;
              }
            })}
          </Row>
        );
      })}
    </>
  );
};

export default MapGenerator;
