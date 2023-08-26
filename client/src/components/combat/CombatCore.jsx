import { wait } from "../../utilities/general/functions/utilityFunctions";
import useEntity from "../../hooks/useEntity";
import { useReducer, useContext, useEffect } from "react";
import { getPlayer } from "../../entities/player/getPlayer";

const CombatCore = ({ toggleCombat }) => {
  const enemy = useEntity("Entity", "Enemy", 100, 20);
  const player = useContext(getPlayer);

  const handleCombatTurns = (_, action) => {
    const listOfActions = {
      changeToEnemyTurn() {
        return {
          isPlayerTurn: false,
          isEnemyTurn: true,
        };
      },
      changeToPlayerTurn() {
        return {
          isPlayerTurn: true,
          isEnemyTurn: false,
        };
      },
      changeToPlayerWins() {
        return {
          isPlayerTurn: false,
          isEnemyTurn: false,
        };
      },
    };
    return listOfActions[action.type]();
  };

  const [state, dispatchAction] = useReducer(handleCombatTurns, {
    isPlayerTurn: true,
    isEnemyTurn: false,
  });

  const checkEnemyAction = async () => {
    if (enemy.isDead) {
      dispatchAction({ type: "changeToPlayerWins" });
    }
    if (state.isEnemyTurn) {
      await wait(1000);
      dispatchAction({ type: "changeToPlayerTurn" });
      player.takeDamage(enemy.damage);
    }
  };

  useEffect(() => {
    console.log("combat");
    if (!enemy.isDead) {
      checkEnemyAction();
    }
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
      <h2 id="combat-header">Combat Menu Test</h2>
      <hr />
      <h3>Player</h3>
      <div>Turn: {String(state.isPlayerTurn)}</div>
      <div>Damage: {player.damage}</div>
      <div>
        Health: {player.health}/{player.maxHealth}
        {player.health < player.maxHealth && (
          <button onClick={() => player.takeHeal(10)}>Heal</button>
        )}
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
      {state.isPlayerTurn && !player.isDead && (
        <button
          onClick={() => {
            dispatchAction({ type: "changeToEnemyTurn" });
            enemy.takeDamage(player.damage);
          }}
        >
          Attack Enemy!
        </button>
      )}
      {state.isEnemyTurn && !enemy.isDead && (
        <div style={{ color: "grey" }}>Enemy Attacking...</div>
      )}
      {enemy.isDead && <h2>Player Wins!</h2>}
      {player.isDead && <h2>Enemy Wins!</h2>}
      {(player.isDead || enemy.isDead) && (
        <button
          onClick={() => {
            player.takeHeal(10000);
            toggleCombat();
          }}
        >
          Exit Combat (debug)
        </button>
      )}
    </div>
  );
};

export default CombatCore;
