import { globalContext } from "./engine/Engine";
import { useContext } from "react";
// Import your core files here
import CombatCore from "../combat/CombatCore";
import UICore from "../ui/UICore";

const GameCore = () => {
  const { combatEnemy } = useContext(globalContext);
  return (
    <>
      {combatEnemy && <CombatCore />}
      <UICore />
    </>
  );
};

export default GameCore;
