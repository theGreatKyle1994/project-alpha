import useUIEvents from "../../hooks/useUIEvents";
import InventoryMenu from "./InventoryMenu";

const UICore = ({ keyObj }) => {
  const displayUIObj = useUIEvents(keyObj);
  return <>{displayUIObj.isInventory && <InventoryMenu />}</>;
};

export default UICore;
