import { useEffect } from "react";

const useControlEvents = (player) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      player.checkControls(e);
    });
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      player.checkControls(e);
    });
    return () => {
      document.removeEventListener("keydown");
      document.removeEventListener("keyup");
    };
  }, []);
};
export default useControlEvents;
