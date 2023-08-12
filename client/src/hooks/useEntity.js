import { useState } from "react";

const projectEntity = (entity) => ({
  name: entity.name,
  health: entity.health,
  maxHealth: entity.maxHealth,
});

const useEntity = (entity) => {
  const [projection, setProjection] = useState(projectEntity(entity));
  return {
    ...projection,
    changeName: () => {
      entity.changeName();
      setProjection(projectEntity(entity));
    },
  };
};

export default useEntity;
