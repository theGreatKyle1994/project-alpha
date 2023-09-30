import Engine from "./engine/Engine";
import PlayerInstance from "../../entities/player/PlayerInstance";
import useMap from "../../hooks/useMap";
import useControlEvents from "../../hooks/useControlEvents";

const GameCore = () => {
  const player = new PlayerInstance("box", {
    size: { x: 20, y: 20 },
    speed: { x: 0, y: 0, actual: 2 },
    color: "blue",
    useCollision: true,
  });
  const map = useMap(1, 1);
  // Use it wisely Joel
  const playerSpawn = player.findSpawn("random", map);
  // if (canvas) {
  //   console.log(
  //     this.pos.x - 1920 / 2,
  //     this.pos.y - 1080 / 2
  //   );
  // }
  useControlEvents(player);
  return <Engine map={map} player={player} />;
};

export default GameCore;
