import { useEffect } from "react";

const useMovementHandler = (keyObj, player) => {
  // useEffect used to delegate player pos changes
  // when keys are pressed
  useEffect(() => {
    player.checkControls(keyObj);
  }, [keyObj]);
};

export default useMovementHandler;
