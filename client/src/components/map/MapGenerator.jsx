// import generatePopulatedChunk from "../../utilities/map/functions/create-populated-chunk";
import generateMap from "../../utilities/map/map-engine";
import playerStartPoint from "../../utilities/map/functions/player-start-point";
import Row from "./tiles/Row";
import Tile from "./tiles/Tile";
import TileWall from "./tiles/TileWall";
// CSS Imports, Import all map CSS here
import "../../css/map/map-gen.css";
import "../../css/map/tiles.css";

const MapGenerator = () => {
  // generate a map based on three different algos: web, chain, or spoke
  const randomMap = generateMap(2, 2);
  const startingPoint = playerStartPoint(randomMap)
  console.log(startingPoint)
  return (
    <>
      {randomMap.map((row, rIndex) => {
        return (
          <Row key={rIndex}>
            {row.map((tile, cIndex) =>
              tile === 2 ? (
                <Tile key={`r${cIndex}`} />
              ) : (
                <TileWall key={`r${cIndex}`} />
              )
            )}
          </Row>
        );
      })}
    </>
  );
};

export default MapGenerator;
