import { useEffect, useState } from "react";

const useControlEvents = (player) => {
  // Initial key state, place any keys here to be listened for
  const [keyObj, setKeyObj] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    tab: false,
  });
  // Main useEffect used to delegate key state
  useEffect(() => {
    // Key down listener
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      setKeyObj((prevKeyObj) => ({
        ...prevKeyObj,
        [e.key.toLowerCase()]: true,
      }));
    });
    // Key release listener
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      setKeyObj((prevKeyObj) => ({
        ...prevKeyObj,
        [e.key.toLowerCase()]: false,
      }));
    });
    // Listener cleanup (required for non duplicates)
    return () => {
      document.removeEventListener("keydown");
      document.removeEventListener("keyup");
    };
  }, []);
  // useEffect used to delegate and internal changes
  // needed when keys are pressed
  useEffect(() => player.checkControls(keyObj), [keyObj]);
  // returning the keyobj for the game to manage various state
  return keyObj;
};

export default useControlEvents;
