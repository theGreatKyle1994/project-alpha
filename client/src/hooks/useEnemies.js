import { useState, useMemo } from "react";
import Enemy from "../entities/enemy/Enemy";
import EnemyInstance from "../entities/enemy/EnemyInstance";

const useEnemies = (amountOfEnemies = 1, spawnSpaces = []) => {
  const [enemies, setEnemies] = useState([]);
  // Generation of enemy list based on valid map spawn locations
  useMemo(() => {
    const newList = [];
    for (let i = 0; i < amountOfEnemies; i++) {
      const newEnemy = new Enemy("Enemy", 100);
      newEnemy.setInstance(
        new EnemyInstance(newEnemy.id, "box", {
          size: { x: 20, y: 20 },
          speed: { x: 0, y: 0, actual: 2 },
          color: "yellow",
          useCollision: true,
        })
      );
      // If map spawns are not set we skip spawn location (debug purposes)
      if (spawnSpaces.length !== 0)
        newEnemy.instance.findSpawn("random", spawnSpaces);
      newList.push(newEnemy);
    }
    setEnemies(newList);
  }, []);

  return [enemies, setEnemies];
};

export default useEnemies;
