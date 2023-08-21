import { useState, useRef } from "react";
import Entity from "../entities/Entity";

// All data from the class that we want to display goes here
const projectEntity = (entity) => ({
  id: entity.id,
  name: entity.name,
  level: entity.level,
  health: entity.health,
  maxHealth: entity.maxHealth,
  damage: entity.damage,
  resistance: entity.resistance,
  isDead: entity.isDead,
});

const useEntity = (...initialData) => {
  // A Ref is set to keep the class passed in consistant with
  // rerenders through state changing
  const entityRef = useRef();
  // A quick check to make sure a ref is set before
  // defining a class instantiation
  if (!entityRef.current) entityRef.current = new Entity(...initialData);
  const entity = entityRef.current;
  // We set the hooks internal state to the projected data we
  // defined above plus the methods below

  const [projection, setProjection] = useState(projectEntity(entity));
  return {
    // Spreading out all displayable data defined above
    ...projection,
    // Any method we want to be able to call from
    // the class is defined here
    changeName(newName) {
      // Updating the class
      entity.changeName(newName);
      // Updating the projection with the new class values
      setProjection(projectEntity(entity));
    },
    takeDamage(damIn) {
      entity.takeDamage(damIn);
      setProjection(projectEntity(entity));
    },
    takeHeal(healIn) {
      entity.takeHeal(healIn);
      setProjection(projectEntity(entity));
    },
  };
};

export default useEntity;
