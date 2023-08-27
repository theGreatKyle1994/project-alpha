import { applyChance } from "../../general/functions/utilityFunctions";

const getSpawnPoints = (openSpaces) => {
  const spawnPoints = [];
  for (let i = 0; i < openSpaces.length; i++) {
    if (applyChance(3.5)) spawnPoints.push(openSpaces[i]);
  }
  return spawnPoints;
};

const findOpenSpawns = (currentMap) => {
  const openSpaces = [];
  currentMap.forEach((row, rIndex) =>
    row.forEach((current, cIndex) => {
      if (current == 2)
        openSpaces.push({
          x: cIndex,
          y: rIndex,
        });
    })
  );
  return getSpawnPoints(openSpaces);
};

export const getMapSpawns = (currentMap) => {
  return findOpenSpawns(currentMap);
};
