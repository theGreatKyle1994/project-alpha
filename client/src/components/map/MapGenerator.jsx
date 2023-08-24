// import generatePopulatedChunk from "../../utilities/map/functions/create-populated-chunk";
import { useMemo, useContext } from "react";
import generateMap from "../../utilities/map/map-engine";
import playerStartPoint from "../../utilities/map/functions/player-start-point";
import Row from "./tiles/Row";
import Tile from "./tiles/Tile";
import TileWall from "./tiles/TileWall";
import { getPlayer } from "../../entities/player/getPlayer";
// CSS Imports, Import all map CSS here
import "../../css/map/map-gen.css";
import "../../css/map/tiles.css";

const MapGenerator = () => {
  // generate a map based on three different algos: web, chain, or spoke
  const player = useContext(getPlayer);
  const randomMap = useMemo(() => generateMap(1, 1), []);

  const startingPoint = playerStartPoint(randomMap);
  const { x, y } = startingPoint;
  useMemo(() => player.setLocalCoordinates(x, y), []);
  console.log(startingPoint, player.localCoord);

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
