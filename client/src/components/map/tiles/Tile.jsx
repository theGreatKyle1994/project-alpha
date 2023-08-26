import { useContext, useMemo } from "react";
import { globalContext } from "../../../App";
import { applyChance } from "../../../utilities/general/functions/utilityFunctions";

const Tile = ({ tileCoords }) => {
  const context = useContext(globalContext);
  const { player } = context;
  const { tileX, tileY } = tileCoords;
  const { localX, localY } = player.localCoord;

  return (
    <div
      className={`map-tile-open`}
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
