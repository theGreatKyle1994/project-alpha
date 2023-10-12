import useUIEvents from "../../hooks/useUIEvents";
import InventoryMenu from "./InventoryMenu";

const UICore = () => {
  const displayUIObj = useUIEvents();
  return <>{displayUIObj.isInventory && <InventoryMenu />}</>;
};

export default UICore;
