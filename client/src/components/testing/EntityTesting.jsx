import useEntity from "../../hooks/useEntity";
// import Entity from "../../entities/Entity";

const EntityTesting = () => {
  const player = useEntity("Player", 100, 5);
  const enemy = useEntity("Enemy", 100, 10);

  // const test = new Entity("test", 100, 1);

  // Basic damage test (no constraints)
  const doPlayerDamage = () => {
    player.takeDamage(enemy.damage);
  };

  const doEnemyDamage = () => {
    enemy.takeDamage(player.damage);
  };

  const globalRevive = () => {
    player.takeHeal(1000);
    enemy.takeHeal(1000);
  };

  return (
    <>
      <h1>Entity Testing</h1>
      <h2>Player Id: {player.id}</h2>
      <h2>Player Name: {player.name}</h2>
      <h2>Player Health: {player.health}</h2>
      <h2>Player Max Health: {player.maxHealth}</h2>
      <h2>Player Resistance: {player.resistance}</h2>
      <h2>Player Dead: {String(player.isDead)}</h2>
      <hr />
      <h2>Enemy Id: {enemy.id}</h2>
      <h2>Enemy Name: {enemy.name}</h2>
      <h2>Enemy Health: {enemy.health}</h2>
      <h2>Enemy Max Health: {enemy.maxHealth}</h2>
      <h2>Enemy Resistance: {enemy.resistance}</h2>
      <h2>Enemy Dead: {String(enemy.isDead)}</h2>
      {!player.isDead && (
        <button onClick={doPlayerDamage}>Do Player Damage Test</button>
      )}
      {!enemy.isDead && (
        <button onClick={doEnemyDamage}>Do Enemy Damage Test</button>
      )}
      {(player.isDead || enemy.isDead) && (
        <button onClick={globalRevive}>Revive Both</button>
      )}
    </>
  );
};

export default EntityTesting;
