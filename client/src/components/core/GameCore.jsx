import Engine from "./engine/Engine";
import GameMap from "../../entities/map/GameMap";
import { useRef, useMemo } from "react";

const GameCore = () => {
  const newMap = useRef(new GameMap(3, 2));
  const currentMap = newMap.current;

  useMemo(() => currentMap.createMap(), []);

  return (
    <>
      <Engine map={currentMap} />
    </>
  );
};

export default GameCore;
