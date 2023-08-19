import {
  wait,
  applyRange,
} from "../../utilities/general/functions/utilityFunctions";

const Combat = () => {
  const startCombat = async () => {
    console.log("You Attacking...");
    await wait(1000);
    console.log(`${applyRange(1, 10, 1)} Damage!`);
    await wait(1000);
    console.log("Enemy Attacking...");
    await wait(1000);
    console.log(`${applyRange(1, 10, 1)} Damage!`);
  };

  return (
    <>
      <h1>Combat Module</h1>
      <button onClick={startCombat}>Start Combat Test</button>
    </>
  );
};

export default Combat;
