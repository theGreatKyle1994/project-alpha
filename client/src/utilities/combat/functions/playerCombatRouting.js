import { useContext } from "react";
import { globalContext } from "../../../App";

const playerAction = (action) => {
  const context = useContext(globalContext);
  const { player } = context;
  const routeAction = {};
  routeAction[action]();
};

export default playerAction;
