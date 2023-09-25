import Engine from "./engine/Engine";
import Instance from "../../entities/Instance";
import { useState, useRef, useEffect } from "react";
import { applyRange } from "../../utilities/general/functions/utilityFunctions";

const GameCore = () => {
  const [count, setCount] = useState(3);
  const [speed, setSpeed] = useState(4);
  const [size, setSize] = useState(50);
  const [bounds, setBounds] = useState(true);
  const [collision, setCollision] = useState(false);
  const [physics, setPhysics] = useState(true);
  const [type, setType] = useState("box");
  const boxArr = useRef([]);

  const renderBoxes = (ctx, canvas) => {
    for (let i = 0; i < boxArr.current.length; i++) {
      boxArr.current[i].render(ctx);
      boxArr.current[i].update();
      boxArr.current[i].checkCollision(boxArr.current, canvas);
    }
  };

  useEffect(() => {
    boxArr.current = [];
    for (let i = 0; i < count; i++) {
      boxArr.current.push(
        new Instance(
          type,
          { x: Number(size), y: Number(size) },
          {
            x: applyRange(20, 1900),
            y: applyRange(20, 1060),
          },
          { x: applyRange(-speed, speed), y: applyRange(-speed, speed) },
          { usePhysics: physics, useBounds: bounds, useCollision: collision }
        )
      );
    }
  }, [count, speed, type, size, bounds, physics, collision]);

  return (
    <>
      <Engine renderBoxes={renderBoxes} />
      <p>Particles: {count}</p>
      <input
        value={count}
        style={{ width: "100%" }}
        onChange={(e) => setCount(e.target.value)}
        type="range"
        min={1}
        max={250}
        step={1}
      />
      <p>Speed: {speed}</p>
      <input
        value={speed}
        style={{ width: "100%" }}
        onChange={(e) => setSpeed(e.target.value)}
        type="range"
        min={0}
        max={50}
        step={1}
      />
      <p>Size: {size}</p>
      <input
        value={size}
        style={{ width: "100%" }}
        onChange={(e) => setSize(e.target.value)}
        type="range"
        min={5}
        max={200}
        step={5}
      />
      <span>Type: </span>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="box">Box</option>
        <option value="circle">Circle</option>
      </select>
      <div>
        <label>
          Use Bounds:{" "}
          <input
            type="checkbox"
            checked={bounds}
            onChange={(e) => setBounds(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Use Collision:{" "}
          <input
            type="checkbox"
            checked={collision}
            onChange={(e) => setCollision(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Use Physics:{" "}
          <input
            type="checkbox"
            checked={physics}
            onChange={(e) => setPhysics(e.target.checked)}
          />{" "}
          {"( Requires Bounds or Collision to have effect )"}
        </label>
      </div>
    </>
  );
};

export default GameCore;
