import Engine from "./engine/Engine";
import Instance from "../../entities/Instance";
import { useState, useRef, useEffect } from "react";
import { applyRange } from "../../utilities/general/functions/utilityFunctions";

const GameCore = () => {
  const [count, setCount] = useState(0);
  const boxArr = useRef([]);

  const renderBoxes = (ctx, canvas) => {
    for (let i = 0; i < boxArr.current.length; i++) {
      boxArr.current[i].render(ctx);
      boxArr.current[i].update();
      boxArr.current[i].checkCollision(
        boxArr.current,
        { useBounds: true, useBounce: true },
        canvas
      );
    }
  };

  useEffect(() => {
    boxArr.current = [];
    for (let i = 0; i < count; i++) {
      boxArr.current.push(
        new Instance(
          "box",
          { x: 50, y: 50 },
          {
            x: applyRange(20, 1900),
            y: applyRange(20, 1060),
          },
          { x: applyRange(-1, 2), y: applyRange(-1, 2) }
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
        max={100}
        step={10}
      />
      <p>Particles: {count}</p>
    </>
  );
};

export default GameCore;
