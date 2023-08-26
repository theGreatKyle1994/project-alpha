import { useContext } from "react";
import { getPlayer } from "../../../entities/player/getPlayer";

const enemyAction = (action) => {
  const player = useContext(getPlayer);
  const routeAction = {
    damage() {
      player.takeDamage(enemy.damage);
    },
  };
  routeAction[action]();
};

export default enemyAction;
