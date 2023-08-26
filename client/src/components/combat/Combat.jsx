import CombatCore from "./CombatCore";
import Draggable from "react-draggable";
import { useState } from "react";

const Combat = () => {
  const [isInCombat, setIsInCombat] = useState(false);

  const startCombat = async () => {
    setIsInCombat(!isInCombat);
  };

  return (
    <>
      <h1>Combat Module</h1>
      <button onClick={startCombat}>
        {!isInCombat ? "Start" : "Stop"} Combat Test (debug)
      </button>
      {isInCombat && (
        <Draggable bounds="html">
          <div style={{ position: "absolute" }}>
            <CombatCore />
          </div>
        </Draggable>
      )}
    </>
  );
};

export default Combat;
