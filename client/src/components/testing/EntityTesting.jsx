import useEntity from "../../hooks/useEntity";

const EntityTesting = () => {
  const player = useEntity("Player", "Player", 100, 5);

  const gainXp = () => {
    player.setXp(100);
  };

  console.log(player);

  return (
    <>
      <h1>Entity Testing</h1>
      <h2>Player Id: {player.id}</h2>
      <h2>Player Name: {player.name}</h2>
      <h2>Player Level: {player.level}</h2>
      <h2>Player XP: {player.xp}</h2>
      <h2>Player XP Cap: {player.xpCap}</h2>
      <progress value={player.xp} max={player.xpCap} />
      <button onClick={gainXp}>Get XP</button>
    </>
  );
};

export default EntityTesting;
