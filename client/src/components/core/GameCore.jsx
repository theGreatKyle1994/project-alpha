import Engine from "./engine/Engine";
import CombatCore from "../combat/CombatCore";
import UICore from "../inventory/UICore";
import useMap from "../../hooks/useMap";
import usePlayer from "../../hooks/usePlayer";
import useEnemies from "../../hooks/useEnemies";
import useCombat from "../../hooks/useCombat";
import useControlEvents from "../../hooks/useControlEvents";

// use player. to access player data
// use player.instance. to access the canvas variant
const GameCore = () => {
  // Creation of the map
  const map = useMap(2, 2);
  // Creation of player
  const [player, setPlayer] = usePlayer(map.openSpace);
  // Creation of enemy(s)
  const [enemies, setEnemies] = useEnemies(map.openSpace);
  // Setting up the controls
  const keyObj = useControlEvents(player.instance);
  // Setup of combat system
  const [combatEnemy, setCombatEnemy] = useCombat(enemies, setEnemies);

  return (
    <>
      {combatEnemy && (
        <CombatCore
          player={player}
          setPlayer={setPlayer}
          combatEnemy={combatEnemy}
          setCombatEnemy={setCombatEnemy}
        />
      )}
      <UICore keyObj={keyObj} />
      <Engine
        map={map}
        player={player}
        enemies={enemies}
        combatEnemy={combatEnemy}
        setCombatEnemy={setCombatEnemy}
      />
    </>
  );
};

export default GameCore;
