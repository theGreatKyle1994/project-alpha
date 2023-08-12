import useEntity from "../hooks/useEntity";
import Entity from "../entities/Entity";

const EntityTesting = () => {
  const enemy1 = useEntity(new Entity(100, 100, "Kyle"));

  const displayEnemy = () => {
    console.log(enemy1);
  };

  const changeEnemyName = () => {
    enemy1.changeName();
  };

  return (
    <>
      <h1>Entity Testing</h1>
      <h2>Entity Name: {enemy1.name}</h2>
      <h2>Entity Health: {enemy1.health}</h2>
      <h2>Entity Max Health: {enemy1.maxHealth}</h2>
      <button onClick={displayEnemy}>Log Enemy Test</button>
      <button onClick={changeEnemyName}>Change Enemy Name Test</button>
    </>
  );
};

export default EntityTesting;
