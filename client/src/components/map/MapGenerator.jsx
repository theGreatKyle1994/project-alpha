// import generatePopulatedChunk from "../../utilities/map/functions/create-populated-chunk";
import { useMemo } from "react";
import generateMap from "../../utilities/map/map-engine";
import Row from "./tiles/Row";
import Tile from "./tiles/Tile";
import TileWall from "./tiles/TileWall";
// CSS Imports, Import all map CSS here
import "../../css/map/map-gen.css";
import "../../css/map/tiles.css";

const MapGenerator = () => {
  // generate a map based on three different algos: web, chain, or spoke
  const randomMap = useMemo(() => generateMap(2, 2), []);

  return (
    <div id="map-container">
      {randomMap.map((row, rIndex) => {
        return (
          <Row key={rIndex}>
            {row.map((tile, cIndex) =>
              tile === 2 ? (
                <Tile
                  key={`r${cIndex}`}
                  tileCoords={{ tileX: cIndex, tileY: rIndex }}
                />
              ) : (
                <TileWall key={`r${cIndex}`} />
              )
            )}
          </Row>
        );
      })}
    </div>
  );
};

export default MapGenerator;
