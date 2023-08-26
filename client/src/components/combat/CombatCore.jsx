import { wait } from "../../utilities/general/functions/utilityFunctions";
import useEntity from "../../hooks/useEntity";
import { useReducer, useContext, useEffect } from "react";
import { getPlayer } from "../../entities/player/getPlayer";

const CombatCore = () => {
  const enemy = useEntity("Entity", "Enemy", 100, 5);
  const player = useContext(getPlayer);

  const handleCombatTurns = (_, action) => {
    switch (action.type) {
      case "changeToEnemyTurn":
        return {
          isPlayerTurn: false,
          isEnemyTurn: true,
        };
      case "changeToPlayerTurn":
        return {
          isPlayerTurn: true,
          isEnemyTurn: false,
        };
    }
  };

  const [state, dispatchAction] = useReducer(handleCombatTurns, {
    isPlayerTurn: true,
    isEnemyTurn: false,
  });

  const inCombat = async () => {
    if (state.isEnemyTurn) {
      await wait(2000);
      dispatchAction({ type: "changeToPlayerTurn" });
      player.takeDamage(enemy.damage);
    }
  };

  useEffect(() => {
    console.log("combat");
    inCombat();
  }, [state]);

  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        margin: "20px",
        padding: "20px",
        backgroundColor: "lightgrey",
        border: "2px solid black",
        borderRadius: "10px",
      }}
    >
      <h2>Combat Menu Test</h2>
      <hr />
      <h3>Player</h3>
      <div>Turn: {String(state.isPlayerTurn)}</div>
      <div>Damage: {player.damage}</div>
      <div>
        Health: {player.health}/{player.maxHealth}
      </div>
      <div>Dead: {String(player.isDead)}</div>
      <hr />
      <h3>Enemy</h3>
      <div>Turn: {String(state.isEnemyTurn)}</div>
      <div>Damage: {enemy.damage}</div>
      <div>
        Health: {enemy.health}/{enemy.maxHealth}
      </div>
      <div>Dead: {String(enemy.isDead)}</div>
      {state.isPlayerTurn && (
        <button
          onClick={() => {
            dispatchAction({ type: "changeToEnemyTurn" });
            enemy.takeDamage(player.damage);
          }}
        >
          Attack Enemy!
        </button>
      )}
      {state.isEnemyTurn && (
        <div style={{ color: "grey" }}>Enemy Attacking...</div>
      )}
    </div>
  );
};

export default CombatCore;
