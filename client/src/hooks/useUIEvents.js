import { globalContext } from "../components/core/GameCore";
import { useState, useEffect, useContext } from "react";

const useUIEvents = () => {
  const { keyObj } = useContext(globalContext);
  // UI boolean object, add any new UI booleans here
  const [displayUIObj, setDisplayUIObj] = useState({
    isInventory: false,
  });
  // Listening for various key events to display UI data
  useEffect(() => {
    // Inventory Control
    if (keyObj.tab) {
      setDisplayUIObj((prevUI) => ({
        ...prevUI,
        isInventory: !prevUI.isInventory,
      }));
    }
  }, [keyObj]);

  return displayUIObj;
};

export default useUIEvents;
