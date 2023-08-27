import { useContext, useEffect, useMemo, useState } from "react";
import { globalContext } from "../../../App";
import useEntity from "../../../hooks/useEntity";
import { applyChance } from "../../../utilities/general/functions/utilityFunctions";
import Combat from "../../combat/Combat";

const Tile = ({ tileCoords }) => {
  const { player } = useContext(globalContext);
  const [isPlayerOnTile, setIsPlayerOnTile] = useState(false);
  const { tileX, tileY } = tileCoords;
  const enemy = useEntity("Entity", "Enemy", 50, 5);
  const isEnemy = useMemo(() => applyChance(5), []);

  if (isEnemy) {
    useMemo(() => {
      enemy.setLocalCoordinates(tileX, tileY);
    }, []);
  }

  useEffect(() => {
    if (isEnemy) {
      if (
        enemy.localCoord.localX == player.localCoord.localX &&
        enemy.localCoord.localY == player.localCoord.localY
      ) {
        setIsPlayerOnTile(true);
      } else {
        setIsPlayerOnTile(false);
      }
    }
  }, [player.localCoord]);

  useEffect(() => {
    if (isEnemy) console.log(enemy);
  }, [enemy.health]);

  return (
    <>
      <div
        className={`map-tile-open ${isEnemy ? "enemy" : ""}`}
        onClick={() => player.doMovement(tileX, tileY)}
      >
        {player.localCoord.localX == tileX &&
          player.localCoord.localY == tileY && (
            <div
              style={{
                backgroundColor: "black",
                height: "50%",
                width: "50%",
              }}
            ></div>
          )}
      </div>
      {isPlayerOnTile && <Combat enemy={enemy} />}
    </>
  );
};

export default Tile;
