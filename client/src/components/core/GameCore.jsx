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
  // Since visual classes will be handled by canvas
  // we use a ref instead to take care of state
  const boxArr = useRef([]);

  // This is the function we pass to the engine to render boxes per frame
  // Once we have a drawMap() function, it will be passed into engine props
  const renderBoxes = (ctx, canvas) => {
    for (let i = 0; i < boxArr.current.length; i++) {
      // First we render the instance
      boxArr.current[i].render(ctx);
      // Then we update any movement or size changes
      boxArr.current[i].update();
      // Finally, we check for new collision changes
      boxArr.current[i].checkCollision(boxArr.current, canvas);
    }
  };

  // Initial creation of the boxes and any tweaks from our inputs
  useEffect(() => {
    boxArr.current = [];
    for (let i = 0; i < count; i++) {
      boxArr.current.push(
        // Instance is our canvas version of Entity
        new Instance(
          // Type "box", "circle", "sprite"
          type,
          // Size
          { x: Number(size), y: Number(size) },
          // Spawn Location
          {
            x: applyRange(20, 1900),
            y: applyRange(20, 1060),
          },
          // Initial speed (constant)
          { x: applyRange(-speed, speed), y: applyRange(-speed, speed) },
          // Any options we want to add
          { usePhysics: physics, useBounds: bounds, useCollision: collision }
        )
      );
    }
  }, [count, speed, type, size, bounds, physics, collision]);

  return (
    <>
      {/* This is our core engine component, it's required to make canvas work */}
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
