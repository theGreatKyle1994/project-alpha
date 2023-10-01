import Engine from "./engine/Engine";
import useMap from "../../hooks/useMap";
import useControlEvents from "../../hooks/useControlEvents";
import { useContext, useMemo } from "react";
import { globalContext } from "../../App";

// use player. to access player data
// use player.instance. to access the canvas variant

const GameCore = () => {
  const { player, setPlayer } = useContext(globalContext);
  const map = useMap(3, 2);
  // Memoized spawn location, if this isnt set, th eplayer will jump
  // around the map every time anything in the Player class is set in state
  useMemo(() => player.instance.findSpawn("random", map), []);
  // Creation of the event listeners needed for controls
  useControlEvents(player.instance);

  return <Engine map={map} player={player.instance} />;
};

export default GameCore;
