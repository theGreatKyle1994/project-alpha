import { wait } from "../../utilities/general/functions/utilityFunctions";
import { useReducer, useContext, useEffect } from "react";
// These need to be finalized before official use
// import enemyAction from "../../utilities/combat/functions/enemyCombatRouting";
// import playerAction from "../../utilities/combat/functions/playerCombatRouting";
import { globalContext } from "../../App";

const CombatCore = ({ enemy }) => {
  const { player } = useContext(globalContext);

  // Combat turn controller for reducer
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
      // Both of these methods are placeholder until we set up after battle functions
      // todo: add enemy inventory looting
      changeToPlayerWins() {
        return {
          isPlayerTurn: false,
          isEnemyTurn: false,
        };
      },
      // todo: add player death conditions
      changeToEnemyWins() {
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

  // main function to route player actions
  const checkPlayerAction = (action) => {
    if (player.isDead) {
      dispatchAction({ type: "changeToEnemyWins" });
    }
    if (state.isPlayerTurn) {
      dispatchAction({ type: "changeToEnemyTurn" });
      // todo for player action routing
      // playerAction(action);
      enemy.takeDamage(player.damage);
    }
  };

  // main function to route enemy actions
  const checkEnemyAction = async (action) => {
    // enemy death conditions
    if (enemy.isDead) {
      dispatchAction({ type: "changeToPlayerWins" });
      enemyActions.setEnemyList((prevEnemyList) => {
        return prevEnemyList.filter((enemy) => {
          if (
            enemy.localCoord.localX != player.localCoord.localX &&
            enemy.localCoord.localY != player.localCoord.localY
          ) {
            return enemy;
          }
        });
      });
    }
    // enemy turn options
    if (state.isEnemyTurn) {
      await wait(1000);
      dispatchAction({ type: "changeToPlayerTurn" });
      // todo for enemy action routing (AI file must be made)
      // enemyAction(action);
      player.takeDamage(enemy.damage);
    }
  };

  // On rerender checks if enemy is dead before continuing fight
  useEffect(() => {
    if (!enemy.isDead) {
      // "damage" is placeholder until AI is made inside the class
      // to choose its own actions
      checkEnemyAction("damage");
    }
  }, [state]);

  return (
    <>
      {enemy && (
        <div
          style={{
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
          <div>{enemy.id}</div>
          {state.isPlayerTurn && !player.isDead && !enemy.isDead && (
            <button onClick={() => checkPlayerAction("attack")}>
              Attack Enemy!
            </button>
          )}
          {state.isEnemyTurn && !enemy.isDead && (
            <div style={{ color: "grey" }}>Enemy Attacking...</div>
          )}
          {enemy.isDead && <h2>Player Wins!</h2>}
          {player.isDead && <h2>Enemy Wins!</h2>}
        </div>
      )}
    </>
  );
};

export default CombatCore;
