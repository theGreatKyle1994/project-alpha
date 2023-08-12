import { useState } from "react";

// All data from the class that we want to display goes here
const projectEntity = (entity) => ({
  name: entity.name,
  health: entity.health,
  maxHealth: entity.maxHealth,
});

const useEntity = (entity) => {
  // We set the hooks internal state to the projected data we
  // defined above plus the methods below
  const [projection, setProjection] = useState(projectEntity(entity));
  return {
    // Spreading out all displayable data defined above
    ...projection,
    // Any method we want to be able to call from
    // the class is defined here
    changeName: () => {
      // Updating the class
      entity.changeName();
      // Updating the projection with the new class values
      setProjection(projectEntity(entity));
    },
  };
};

export default useEntity;
