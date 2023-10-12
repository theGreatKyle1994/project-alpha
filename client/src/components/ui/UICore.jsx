import { globalContext } from "../core/engine/Engine";
import { useContext } from "react";
import useUIEvents from "../../hooks/useUIEvents";
import InventoryMenu from "./InventoryMenu";

const UICore = () => {
  const { keyObj } = useContext(globalContext);
  const displayUIObj = useUIEvents(keyObj);
  return <>{displayUIObj.isInventory && <InventoryMenu />}</>;
};

export default UICore;
