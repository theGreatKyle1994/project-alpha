import Engine from "./engine/Engine";
import Instance from "../../entities/Instance";
import { useState, useRef, useEffect } from "react";
import { applyRange } from "../../utilities/general/functions/utilityFunctions";

const GameCore = () => {
  const [count, setCount] = useState(0);
  const boxArr = useRef([]);

  const renderBoxes = (ctx) => {
    for (let i = 0; i < boxArr.current.length; i++) {
      boxArr.current[i].drawRect(ctx);
      boxArr.current[i].newPos(applyRange(-2, 1), applyRange(-2, 1));
    }
  };

  useEffect(() => {
    boxArr.current = [];
    for (let i = 0; i < count; i++) {
      boxArr.current.push(
        new Instance(
          { x: applyRange(5, 7), y: applyRange(5, 7) },
          { x: applyRange(0, 1920), y: applyRange(0, 1080) }
        )
      );
    }
  }, [count]);

  return (
    <>
      <Engine renderBoxes={renderBoxes} count={count} />
      <input
        value={count}
        onChange={(e) => setCount(e.target.value)}
        type="range"
        min={0}
        max={10000}
        step={500}
      />
      <p>Particles: {count}</p>
    </>
  );
};

export default GameCore;
