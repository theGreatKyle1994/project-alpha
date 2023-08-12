import useEntity from "../hooks/useEntity";
import Entity from "../entities/Entity";

const EntityTesting = () => {
  // We define an enemy through the useEntity custom hook
  const enemy1 = useEntity(new Entity(100, 100, "Kyle"));

  const displayEnemy = () => {
    console.log(enemy1);
  };

  // Methods are called from the variable we declared above
  // as all methods we're exported and defined in the hook
  const changeEnemyName = () => {
    enemy1.changeName();
  };

  return (
    <>
      <h1>Entity Testing</h1>
      {/* We access any of the class attributes we defined
        for display through the variable we defined from
        the hook above */}
      <h2>Entity Name: {enemy1.name}</h2>
      <h2>Entity Health: {enemy1.health}</h2>
      <h2>Entity Max Health: {enemy1.maxHealth}</h2>
      {/* A few events to showcase state updating along with class */}
      <button onClick={displayEnemy}>Log Enemy Test</button>
      <button onClick={changeEnemyName}>Change Enemy Name Test</button>
    </>
  );
};

export default EntityTesting;
