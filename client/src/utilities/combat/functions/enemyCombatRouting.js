import { useContext } from "react";
import { globalContext } from "../../../App";

const enemyAction = (action) => {
  const context = useContext(globalContext);
  const { player } = context;
  const routeAction = {
    damage() {
      player.takeDamage(enemy.damage);
    },
  };
  routeAction[action]();
};

export default enemyAction;
