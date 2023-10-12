import useUIEvents from "../../hooks/useUIEvents";
import InventoryCore from "./InventoryCore";

const UICore = ({ keyObj }) => {
  const displayUIObj = useUIEvents(keyObj);
  return <>{displayUIObj.isInventory && <InventoryCore />}</>;
};

export default UICore;
