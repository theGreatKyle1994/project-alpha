import { useState, useMemo, useEffect } from "react";
import Enemy from "../entities/enemy/Enemy";
import EnemyInstance from "../entities/enemy/EnemyInstance";

const useEnemies = (openSpawns) => {
  const [enemies, setEnemies] = useState([]);
  useEffect(() => {
    const newList = [];
    for (let i = 0; i < 5; i++) {
      const newEnemy = new Enemy("Enemy", 100, 5);
      newEnemy.setInstance(
        new EnemyInstance(newEnemy.id, "box", {
          size: { x: 20, y: 20 },
          speed: { x: 0, y: 0, actual: 2 },
          color: "yellow",
          useCollision: true,
        })
      );
      newEnemy.instance.findSpawn("random", openSpawns);
      newList.push(newEnemy);
    }
    setEnemies(newList);
  }, []);

  useEffect(() => console.log(enemies), [enemies]);

  return [enemies, setEnemies];
};

export default useEnemies;
