import { useContext, useMemo } from "react";
import { getPlayer } from "../../../entities/player/getPlayer";
import { applyChance } from "../../../utilities/general/functions/utilityFunctions";

const Tile = ({ tileCoords }) => {
  const player = useContext(getPlayer);
  const { tileX, tileY } = tileCoords;
  const { localX, localY } = player.localCoord;


  const isChest = useMemo(() => (applyChance(1.25) ? "chest" : ""), []);
  const isEnemy = useMemo(() => (applyChance(3) ? "monster" : ""), []);

  return (
    <div
      className={`map-tile-open ${isChest} ${isEnemy}`}
      onClick={() => player.doMovement(tileX, tileY)}
    >
      {localX == tileX && localY == tileY && (
        <div
          style={{
            backgroundColor: "black",
            height: "50%",
            width: "50%",
          }}
        ></div>
      )}
    </div>
  );
};

export default Tile;
