import { useState, useEffect } from "react";

const useUIEvents = (keyObj) => {
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
