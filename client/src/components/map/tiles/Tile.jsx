import { useContext, useEffect, useMemo, useState } from "react";
import { globalContext } from "../../../App";
import useEntity from "../../../hooks/useEntity";
import { applyChance } from "../../../utilities/general/functions/utilityFunctions";
import Combat from "../../combat/Combat";

const Tile = ({ tileCoords }) => {
  const { player } = useContext(globalContext);
  const enemy = useEntity("Entity", "Enemy", 50, 5);
  const isEnemy = useMemo(() => applyChance(3), []);
  const [isInLocalCombat, setIsInLocalCombat] = useState(false);
  const { tileX, tileY } = tileCoords;

  // If enemy exists, set coords to current tile
  if (isEnemy) {
    useMemo(() => {
      enemy.setLocalCoordinates(tileX, tileY);
    }, []);
  }

  // Sends a pulse through every enemy occupied tile for combat check on player move
  useEffect(() => {
    if (isEnemy) {
      if (
        enemy.localCoord.localX == player.localCoord.localX &&
        enemy.localCoord.localY == player.localCoord.localY
      ) {
        setIsInLocalCombat(true);
      } else {
        setIsInLocalCombat(false);
      }
    }
  }, [player.localCoord.localX, player.localCoord.localY]);

  // Syncs player class combat with local tile combat and makes sure enemy isnt dead
  useEffect(() => {
    if (isInLocalCombat && !enemy.isDead) {
      player.setIsInCombat(isInLocalCombat);
    }
  }, [isInLocalCombat]);

  // Checks for enemy death to exit combat
  useEffect(() => {
    if (isEnemy && enemy.isDead) {
      player.setIsInCombat(false);
    }
  }, [enemy.isDead]);

  return (
    <>
      <div
        className={`map-tile-open  ${isEnemy ? "enemy" : ""}`}
        id={enemy.isDead ? "dead-enemy" : ""}
        onClick={() => {
          if (!player.isInCombat) player.doMovement(tileX, tileY);
        }}
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
      {isEnemy && isInLocalCombat && <Combat enemy={enemy} />}
    </>
  );
};

export default Tile;
