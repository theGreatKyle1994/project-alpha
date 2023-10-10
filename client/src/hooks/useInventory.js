import { useState, useEffect } from "react";

const useInventory = (keyObj) => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  // Listening for the inventory key (tab)
  useEffect(() => {
    if (keyObj.tab) setIsInventoryOpen((prevVal) => !prevVal);
  }, [keyObj.tab]);

  return isInventoryOpen;
};

export default useInventory;
