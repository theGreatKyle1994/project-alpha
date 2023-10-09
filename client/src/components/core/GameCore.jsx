import Engine from "./engine/Engine";
import CombatCore from "../combat/CombatCore";
import InventoryCore from "../inventory/InventoryCore";
import useMap from "../../hooks/useMap";
import usePlayer from "../../hooks/usePlayer";
import useEnemies from "../../hooks/useEnemies";
import useCombat from "../../hooks/useCombat";
import useInventory from "../../hooks/useInventory";
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
  const isInventoryOpen = useInventory(keyObj, player);

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
      {isInventoryOpen && (
        <InventoryCore player={player} setPlayer={setPlayer} />
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
