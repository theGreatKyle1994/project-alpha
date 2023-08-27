import CombatCore from "./CombatCore";
import Draggable from "react-draggable";
import { globalContext } from "../../App";
import { useContext } from "react";

const Combat = () => {
  const { player, enemyList, combatActions } = useContext(globalContext);

  const determineEnemyToFight = () => {
    return enemyList.filter((enemy) => {
      if (
        enemy.localCoord.localX == player.localCoord.localX &&
        enemy.localCoord.localY == player.localCoord.localY
      ) {
        return enemy;
      }
    });
  };

  const toggleCombat = () => {
    combatActions.setIsInCombat(!combatActions.isInCombat);
  };

  return (
    <>
      <h1>Combat Module</h1>
      <button onClick={toggleCombat}>
        {!combatActions.isInCombat ? "Start" : "Stop"} Combat Test (debug)
      </button>
      {combatActions.isInCombat && (
        <Draggable bounds="html" handle="#combat-header">
          <div style={{ position: "absolute" }}>
            <CombatCore
              toggleCombat={toggleCombat}
              determineEnemyToFight={determineEnemyToFight}
            />
          </div>
        </Draggable>
      )}
    </>
  );
};

export default Combat;
