import usePlayer from "../../hooks/usePlayer";
import useEnemies from "../../hooks/useEnemies";
import Weapon from "../../entities/weapons/Weapon";
import { useMemo } from "react";

const EntityTesting = () => {
  const [player, setPlayer] = usePlayer();
  const [enemies, setEnemies] = useEnemies(1);

  useMemo(
    () =>
      (player.weapon = new Weapon({
        name: "Test Weapon",
        baseDam: 10,
        critChance: 0.05,
        hitChance: 0.5,
      })),
    []
  );

  return (
    <>
      <div>
        <div>{player?.name}</div>
      </div>
      <div>{enemies[0]?.name}</div>
    </>
  );
};

export default EntityTesting;
