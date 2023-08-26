import { useContext } from "react";
import { getPlayer } from "../../../entities/player/getPlayer";

const playerAction = (action) => {
  const player = useContext(getPlayer);
  const routeAction = {};
  routeAction[action]();
};

export default playerAction;
