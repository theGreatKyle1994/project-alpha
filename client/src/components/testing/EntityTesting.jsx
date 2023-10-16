import { applyRange } from "../../utilities/general/functions/utilityFunctions";
import usePlayer from "../../hooks/usePlayer";
import Weapon from "../../entities/weapons/Weapon";
import { useMemo } from "react";

const EntityTesting = () => {
  const [player, setPlayer] = usePlayer();
  useMemo(() => (player.weapon = new Weapon()), []);

  return <></>;
};

export default EntityTesting;
