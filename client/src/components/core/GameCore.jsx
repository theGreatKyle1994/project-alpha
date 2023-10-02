import Engine from "./engine/Engine";
import useMap from "../../hooks/useMap";
import usePlayer from "../../hooks/usePlayer";
import useEnemies from "../../hooks/useEnemies";
import useControlEvents from "../../hooks/useControlEvents";

// use player. to access player data
// use player.instance. to access the canvas variant
const GameCore = () => {
  const map = useMap(3, 2);
  // Grabbing enemy info
  const [player, setPlayer] = usePlayer(map.openSpace);
  const [enemies, setEnemies] = useEnemies(map.openSpace);
  // Creation of the event listeners needed for controls
  useControlEvents(player.instance);

  return <Engine map={map} player={player} enemies={enemies} />;
};

export default GameCore;
