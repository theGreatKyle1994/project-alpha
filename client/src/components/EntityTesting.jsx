import useEntity from "../hooks/useEntity";

const EntityTesting = () => {
  // We define an enemy through the useEntity custom hook
  // and add starting data as if it was a new class definition
  const enemy1 = useEntity(100, 100, "Kyle");

  // Methods are called from the variable we declared above
  // as all methods were exported and defined in the hook
  const changeEnemyName = () => {
    enemy1.changeName();
  };

  const displayEnemy = () => {
    console.log("From EntityTesting.jsx", enemy1);
  };

  // Basic damage test (no constraints)
  const doEnemyDamage = () => {
    enemy1.doDamage(10);
  };

  return (
    <>
      <h1>Entity Testing</h1>
      {/* We access any of the class attributes we added
        for display through the variable we declared from
        the hook above */}
      <h2>Entity Id: {enemy1.id}</h2>
      <h2>Entity Name: {enemy1.name}</h2>
      <h2>Entity Health: {enemy1.health}</h2>
      <h2>Entity Max Health: {enemy1.maxHealth}</h2>
      {/* A few events to showcase state updating along with class */}
      <button onClick={displayEnemy}>Log Enemy Test</button>
      <button onClick={changeEnemyName}>Change Enemy Name Test</button>
      <button onClick={doEnemyDamage}>Do Damage Test</button>
    </>
  );
};

export default EntityTesting;
