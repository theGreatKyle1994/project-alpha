import { globalContext } from "../core/engine/Engine";
import { wait } from "../../utilities/general/functions/utilityFunctions";
import { useReducer, useEffect, useContext } from "react";
import Draggable from "react-draggable";
// These need to be finalized before official use
// import enemyAction from "../../utilities/combat/functions/enemyCombatRouting";
// import playerAction from "../../utilities/combat/functions/playerCombatRouting";

const CombatCore = () => {
  const {
    player,
    setPlayer,
    combatEnemy: enemy,
    setCombatEnemy: setEnemy,
  } = useContext(globalContext);

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
      enemy.takeDamage(player.weapon.calcDamage());
      setEnemy(enemy.copySelf());
    }
  };

  // main function to route enemy actions
  const checkEnemyAction = async (action) => {
    // enemy death conditions
    if (enemy?.isDead) {
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
      player.takeDamage(enemy.weapon.calcDamage());
      setPlayer(player.copySelf());
    }
  };

  // On rerender checks if enemy is dead before continuing fight
  useEffect(() => {
    if (!enemy?.isDead) {
      // "damage" is placeholder until AI is made inside the class
      // to choose its own actions
      checkEnemyAction("damage");
    }
  }, [state]);

  return (
    <Draggable
      defaultPosition={{
        x: enemy.instance.pos.x + 50,
        y: enemy.instance.pos.y,
      }}
      bounds="canvas"
      handle="#combat-header"
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
          border: "1px solid black",
          zIndex: 100,
        }}
      >
        <h2 id="combat-header">Combat Menu Test</h2>
        <hr />
        <h3>Player</h3>
        <div>Turn: {String(state.isPlayerTurn)}</div>
        <div>Weapon Name: {player.weapon.itemName}</div>
        <div>Damage: {player.weapon.baseDam}</div>
        <div>
          Health: {player.health}/{player.maxHealth}
          {player.health < player.maxHealth && (
            <button
              onClick={() => {
                player.takeHeal(10);
                setPlayer(player.copySelf());
              }}
            >
              Heal
            </button>
          )}
        </div>
        <div>Dead: {String(player.isDead)}</div>
        <hr />
        <h3>Enemy</h3>
        <div>Turn: {String(state.isEnemyTurn)}</div>
        <div>Weapon Name: {enemy.weapon.itemName}</div>
        <div>Damage: {enemy.weapon.baseDam}</div>
        <div>
          Health: {enemy.health}/{enemy.maxHealth}
        </div>
        <div>Dead: {String(enemy.isDead)}</div>
        <div>{enemy.id}</div>
        {state.isPlayerTurn && !player.isDead && !enemy.isDead && (
          <button onClick={() => checkPlayerAction("light")}>Attack</button>
        )}
        {/* {state.isPlayerTurn && !player.isDead && !enemy.isDead && (
          <button onClick={() => checkPlayerAction("heavy")}>
            Heavy Attack
          </button>
        )} */}
        {state.isEnemyTurn && !enemy.isDead && (
          <div style={{ color: "grey" }}>Enemy Attacking...</div>
        )}
        {enemy.isDead && <h2>Player Wins!</h2>}
        {player.isDead && <h2>Enemy Wins!</h2>}
      </div>
    </Draggable>
  );
};

export default CombatCore;
