import { useState, useEffect } from "react";

const useCombat = (enemies, setEnemies) => {
  const [combatEnemy, setCombatEnemy] = useState(null);

  useEffect(() => {
    if (combatEnemy) {
      let newEnemyList = enemies.filter((enemy) => {
        if (enemy.id !== combatEnemy.id) return enemy;
      });
      // Placeholder until sprites are used
      if (combatEnemy.isDead) combatEnemy.instance.color = "grey";
      setEnemies([...newEnemyList, combatEnemy.copySelf()]);
    }
  }, [combatEnemy]);

  useEffect(() => console.log(combatEnemy), [combatEnemy]);

  return [combatEnemy, setCombatEnemy];
};

export default useCombat;
