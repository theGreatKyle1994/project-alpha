import GameMap from "../entities/map/GameMap";
import { useRef, useMemo } from "react";

const useMap = (width, height) => {
  const newMap = useRef(new GameMap(width, height, 100));
  const currentMap = newMap.current;
  useMemo(() => currentMap.createMap(), []);
  return currentMap;
};

export default useMap;
