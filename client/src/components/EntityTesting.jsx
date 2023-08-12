import useEntity from "../hooks/useEntity";
import Entity from "../entities/Entity";

const EntityTesting = () => {
  const enemy1 = useEntity(new Entity(100, 100, "Kyle"));

  const displayEnemy = () => {
    console.log(enemy1);
  };

  const changeEnemyName = () => {
    if (enemy1.name === "Kyle") enemy1.changeName("Mark");
    else enemy1.changeName("Kyle");
  };

  return (
    <>
      <h1>Entity Testing</h1>
      <h2>Entity Name: {enemy1.name}</h2>
      <button onClick={displayEnemy}>Log Enemy Test</button>
      <button onClick={changeEnemyName}>Change Enemy Name Test</button>
    </>
  );
};

export default EntityTesting;
