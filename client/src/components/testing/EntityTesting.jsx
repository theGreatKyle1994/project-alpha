import useEntity from "../../hooks/useEntity";
import { applyRange } from "../../utilities/general/functions/utilityFunctions";

const EntityTesting = () => {
  const player = useEntity("Player", "Player", 100, 5);

  const gainXp = () => {
    player.setXp(applyRange(5, 10, player.level));
  };

  console.log(player);

  return (
    <>
      <h1>Entity Testing</h1>
      <h2>Name: {player.name}</h2>
      <h2>Level: {player.level}</h2>
      <h2>
        XP: {player.xp}/{player.xpCap}
      </h2>
      <progress value={player.xp} max={player.xpCap} />
      <button onClick={gainXp}>Get XP</button>
    </>
  );
};

export default EntityTesting;
