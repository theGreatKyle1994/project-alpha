import { useState, useRef } from "react";
import Entity from "../entities/Entity";
import Player from "../entities/player/Player";

// All data from the class that we want to display goes here
const projectEntity = (entity, classRefName) => {
  const returnObj = {
    id: entity.id,
    name: entity.name,
    level: entity.level,
    health: entity.health,
    maxHealth: entity.maxHealth,
    damage: entity.damage,
    resistance: entity.resistance,
    isDead: entity.isDead,
    localCoord: {
      localX: entity.localCoord.localX,
      localY: entity.localCoord.localY,
    },
    worldCoord: {
      localX: entity.worldCoord.worldX,
      localY: entity.worldCoord.worldY,
    },
  };

  if (classRefName === "Player") {
    Object.assign(returnObj, {
      xp: entity.xp,
      xpCap: entity.xpCap,
    });
  }

  return returnObj;
};

const useEntity = (entityType = "Entity", ...initialData) => {
  // A Ref is set to keep the class passed in consistant with
  // rerenders through state changing
  const entityRef = useRef();
  // A quick check to make sure a ref is set before
  // defining a class instantiation
  if (!entityRef.current) {
    if (entityType === "Entity") {
      entityRef.current = new Entity(...initialData);
    } else if (entityType === "Player") {
      entityRef.current = new Player(...initialData);
    }
  }
  const entity = entityRef.current;
  // Grabbing the class name for projection methods
  const classRefName = entity.constructor.name;
  // We set the hooks internal state to the projected data we
  // defined above plus the methods below
  const [projection, setProjection] = useState(
    projectEntity(entity, classRefName)
  );
  // Here we return the top parent data
  const returnObj = {
    // Spreading out all displayable data defined above
    ...projection,
    // Any method we want to be able to call from the class is defined here
    changeName(newName) {
      // Updating the class
      entity.changeName(newName);
      // Updating the projection with the new class values
      setProjection(projectEntity(entity, classRefName));
    },
    takeDamage(damIn) {
      entity.takeDamage(damIn);
      setProjection(projectEntity(entity, classRefName));
    },
    takeHeal(healIn) {
      entity.takeHeal(healIn);
      setProjection(projectEntity(entity, classRefName));
    },
    setLocalCoordinates(x, y) {
      entity.setLocalCoordinates(x, y);
      setProjection(projectEntity(entity, classRefName));
    },
    setWorldCoordinates(x, y) {
      entity.setWorldCoordinates(x, y);
      setProjection(projectEntity(entity, classRefName));
    },
  };
  // Checking if the class ref is player to add associated class methods
  if (classRefName === "Player") {
    Object.assign(returnObj, {
      setXp(xpIn) {
        entity.setXp(xpIn);
        setProjection(projectEntity(entity, classRefName));
      },
    });
  }

  return returnObj;
};

export default useEntity;
