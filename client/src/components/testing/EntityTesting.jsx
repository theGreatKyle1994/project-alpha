import usePlayer from "../../hooks/usePlayer";
import useEnemies from "../../hooks/useEnemies";
import { useEffect } from "react";

const EntityTesting = () => {
  const [player, setPlayer] = usePlayer();
  const [enemies, setEnemies] = useEnemies(1);

  useEffect(() => console.log(player), [player]);
  useEffect(() => console.log(enemies[0]), [enemies[0]]);

  return (
    player &&
    enemies[0] && (
      <>
        <div>
          <h3>
            {player.name} {`(${player.isDead ? "Dead" : "Alive"})`}
          </h3>
          <div>
            Health: {player.health}/{player.maxHealth}
          </div>
          <div>Damage: {player.weapon?.baseDam}</div>
          <button
            onClick={() => {
              console.log(`${player.name} attacks ${enemies[0].name}`);
              enemies[0].takeDamage(player.weapon.calcDamage());
              setEnemies([enemies[0].copySelf()]);
            }}
          >
            Base Attack to {enemies[0]?.name}
          </button>
        </div>
        <div>
          <h3>
            {enemies[0].name} {`(${enemies[0].isDead ? "Dead" : "Alive"})`}
          </h3>
          <div>
            Health: {enemies[0].health}/{enemies[0].maxHealth}
          </div>
          <div>Damage: {enemies[0].weapon.baseDam}</div>
          <button
            onClick={() => {
              console.log(`${enemies[0].name} attacks ${player.name}`);
              player.takeDamage(enemies[0].weapon.calcDamage());
              setPlayer(player.copySelf());
            }}
          >
            Base Attack to {player.name}
          </button>
        </div>
      </>
    )
  );
};

export default EntityTesting;
