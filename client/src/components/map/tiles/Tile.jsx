import { useContext } from "react";
import { getPlayer } from "../../../entities/player/getPlayer";

const Tile = ({ tileCoords }) => {
  const player = useContext(getPlayer);
  const { tileX, tileY } = tileCoords;
  const { localX, localY } = player.localCoord;

  console.log("Tile");

  return (
    <div
      style={{
        backgroundColor: localX == tileX && localY == tileY ? "black" : "green",
      }}
      onClick={() => player.doMovement(tileX, tileY)}
      className="map-tile-open"
    ></div>
  );
};

export default Tile;
