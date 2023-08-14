import useEntity from "../hooks/useEntity";
import { generateID } from "../utilities/utilityFunctions";

const EntityTesting = () => {
  const player = useEntity("Player", 100, 5);
  const enemy = useEntity("Enemy", 100, 10);

  // Basic damage test (no constraints)
  const doPlayerDamage = () => {
    player.takeDamage(enemy.damage);
  };

  const doEnemyDamage = () => {
    enemy.takeDamage(player.damage);
  };

  return (
    <>
      <h1>Entity Testing</h1>
      <h2>Player Id: {player.id}</h2>
      <h2>Player Name: {player.name}</h2>
      <h2>Player Health: {player.health}</h2>
      <h2>Player Max Health: {player.maxHealth}</h2>
      <hr />
      <h2>Enemy Id: {enemy.id}</h2>
      <h2>Enemy Name: {enemy.name}</h2>
      <h2>Enemy Health: {enemy.health}</h2>
      <h2>Player Max Health: {player.maxHealth}</h2>
      <button onClick={doPlayerDamage}>Do Player Damage Test</button>
      <button onClick={doEnemyDamage}>Do Enemy Damage Test</button>
    </>
  );
};

export default EntityTesting;
