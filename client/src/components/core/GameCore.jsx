import Engine from "./engine/Engine";
import CombatCore from "../combat/CombatCore";
import useMap from "../../hooks/useMap";
import usePlayer from "../../hooks/usePlayer";
import useEnemies from "../../hooks/useEnemies";
import useCombat from "../../hooks/useCombat";
import useControlEvents from "../../hooks/useControlEvents";

// use player. to access player data
// use player.instance. to access the canvas variant
const GameCore = () => {
  const map = useMap(3, 2);
  // Grabbing enemy info
  const [player, setPlayer] = usePlayer(map.openSpace);
  const [enemies, setEnemies] = useEnemies(map.openSpace);
  // Setup of combat system
  const [combatEnemy, setCombatEnemy] = useCombat(enemies, setEnemies);
  // Creation of the event listeners needed for controls
  useControlEvents(player.instance);

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
