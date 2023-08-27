import CombatCore from "./CombatCore";
import Draggable from "react-draggable";
import { globalContext } from "../../App";
import { useContext } from "react";

const Combat = ({ enemy }) => {
  const { combatActions } = useContext(globalContext);

  const toggleCombat = () => {
    combatActions.setIsInCombat(!combatActions.isInCombat);
  };

  return (
    <Draggable bounds="html" handle="#combat-header">
      <div style={{ position: "absolute", top: "0", right: "0" }}>
        <CombatCore toggleCombat={toggleCombat} enemy={enemy} />
      </div>
    </Draggable>
  );
};

export default Combat;
