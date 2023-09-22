import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../../App";
import Enemy from "../../../entities/enemy/Enemy";
import { applyChance } from "../../../utilities/general/functions/utilityFunctions";
import Combat from "../../combat/Combat";

const Tile = ({ tileCoords }) => {
  const { player, setPlayer } = useContext(globalContext);
  const [enemy, setEnemy] = useState(
    applyChance(3) ? new Enemy("Enemy", 50, 5) : {}
  );
  const [isInLocalCombat, setIsInLocalCombat] = useState(false);
  const { tileX, tileY } = tileCoords;

  // If enemy exists, set coords to current tile
  useEffect(() => {
    if (enemy) {
      enemy.setLocalCoordinates?.(tileX, tileY);
      setEnemy(enemy.copySelf?.());
    }
  }, []);

  // Sends a pulse through every enemy occupied tile for combat check on player move
  useEffect(() => {
    if (enemy?.localCoord) {
      if (
        enemy?.localCoord?.localX == player.localCoord.localX &&
        enemy?.localCoord?.localY == player.localCoord.localY
      ) {
        setIsInLocalCombat(true);
      } else {
        setIsInLocalCombat(false);
      }
    }
  }, [player.localCoord]);

  // Syncs player class combat with local tile combat and makes sure enemy isnt dead
  useEffect(() => {
    if (isInLocalCombat && !enemy?.isDead) {
      player.setIsInCombat(isInLocalCombat);
      setPlayer(player.copySelf());
    }
  }, [isInLocalCombat]);

  // Checks for enemy death to exit combat
  useEffect(() => {
    if (enemy && enemy?.isDead) {
      player.setIsInCombat(false);
      setPlayer(player.copySelf());
    }
  }, [enemy?.isDead]);

  return (
    <>
      <div
        className={`map-tile-open  ${enemy ? "enemy" : ""}`}
        id={enemy?.isDead ? "dead-enemy" : ""}
        onClick={() => {
          if (!player.isInCombat) {
            console.log("test");
            player.doMovement(tileX, tileY);
            setPlayer(player.copySelf());
          }
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
      {isInLocalCombat && <Combat enemy={enemy} setEnemy={setEnemy} />}
    </>
  );
};

export default Tile;
