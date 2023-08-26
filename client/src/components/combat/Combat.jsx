import CombatCore from "./CombatCore";
import Draggable from "react-draggable";
import { useState } from "react";

const Combat = () => {
  const [isInCombat, setIsInCombat] = useState(false);

  const toggleCombat = () => {
    setIsInCombat(!isInCombat);
  };

  return (
    <>
      <h1>Combat Module</h1>
      <button onClick={toggleCombat}>
        {!isInCombat ? "Start" : "Stop"} Combat Test (debug)
      </button>
      {isInCombat && (
        <Draggable bounds="html" handle="#combat-header">
          <div style={{ position: "absolute" }}>
            <CombatCore toggleCombat={toggleCombat} />
          </div>
        </Draggable>
      )}
    </>
  );
};

export default Combat;
