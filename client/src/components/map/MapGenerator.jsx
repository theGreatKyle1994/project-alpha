// import generatePopulatedChunk from "../../utilities/map/functions/create-populated-chunk";
import { useMemo, useContext, useEffect } from "react";
import { globalContext } from "../../App";
import playerStartPoint from "../../utilities/map/functions/player-start-point";
import generateMap from "../../utilities/map/map-engine";
import Row from "./tiles/Row";
import Tile from "./tiles/Tile";
import TileWall from "./tiles/TileWall";
// CSS Imports, Import all map CSS here
import "../../css/map/map-gen.css";
import "../../css/map/tiles.css";

const MapGenerator = () => {
  const { player, setPlayer } = useContext(globalContext);
  // generate a map based on three different algos: web, chain, or spoke
  const randomMap = useMemo(() => generateMap(5, 5), []);

  useEffect(() => {
    const startingPoint = playerStartPoint(randomMap);
    player.setLocalCoordinates(startingPoint.x, startingPoint.y);
    setPlayer(player.copySelf());
  }, [randomMap]);

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
