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
        size: { x: 40, y: 40 },
        speed: { x: 0, y: 0, actual: 3 },
        color: "blue",
        useCollision: true,
        isStatic: true,
      })
    );
    // Placeholder for testing weapons
    player.weapon = new Weapon({ itemName: "Sword", baseDam: 25 });
    // If map spawns are not set we skip spawn location (debug purposes)
    if (spawnSpaces.length !== 0)
      player.instance.findSpawn("random", spawnSpaces);
  }, []);

  return [player, setPlayer];
};

export default usePlayer;
