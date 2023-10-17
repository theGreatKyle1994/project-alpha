import { useState, useMemo } from "react";
import Player from "../entities/player/Player";
import PlayerInstance from "../entities/player/PlayerInstance";
import Weapon from "../entities/weapons/Weapon";

const usePlayer = (spawnSpaces = []) => {
  const [player, setPlayer] = useState(new Player("Player", 100));
  // Memoized player instance for canvas.
  useMemo(() => {
    player.setInstance(
      new PlayerInstance(player.id, "box", {
        size: { x: 20, y: 20 },
        speed: { x: 0, y: 0, actual: 2 },
        color: "blue",
        useCollision: true,
      })
    );
    player.weapon = new Weapon({ name: "Sword", baseDam: 25 });
    // If map spawns are not set we skip spawn location (debug purposes)
    if (spawnSpaces.length !== 0)
      player.instance.findSpawn("random", spawnSpaces);
  }, []);

  return [player, setPlayer];
};

export default usePlayer;