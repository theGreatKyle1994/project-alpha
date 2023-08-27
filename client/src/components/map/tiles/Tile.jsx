import { useContext, useMemo, useEffect, memo } from "react";
import { globalContext } from "../../../App";
import { applyChance } from "../../../utilities/general/functions/utilityFunctions";
import useEntity from "../../../hooks/useEntity";

const Tile = memo(({ tileCoords }) => {
  const { player, enemyList, combatActions } = useContext(globalContext);
  const { tileX, tileY } = tileCoords;
  let enemy = null;
  console.log(enemy);
  let isEnemy = useMemo(() => applyChance(5), []);

  if (isEnemy) {
    enemy = useEntity("Entity", "Enemy", 100, 2);
    useMemo(() => enemy.setLocalCoordinates(tileX, tileY), []);
  }

  useEffect(() => {
    if (isEnemy) {
      enemyList.push(enemy);
    }
  }, []);

  useEffect(() => {
    if (isEnemy) {
      if (
        enemy.localCoord.localX == player.localCoord.localX &&
        enemy.localCoord.localY == player.localCoord.localY
      ) {
        combatActions.setIsInCombat(true);
      }
    }
  }, [player.localCoord]);

  return (
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
  );
});

export default Tile;
