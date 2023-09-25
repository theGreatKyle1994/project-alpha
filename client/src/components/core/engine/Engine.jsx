import { useRef, useEffect } from "react";
import { applyRange } from "../../../utilities/general/functions/utilityFunctions";
import "../../../css/engine/engine.css";

const Engine = ({ renderBoxes, count }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId = undefined;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderBoxes(ctx);
      frameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [count]);

  return (
    <div id="game-container">
      <canvas id="game-canvas" width={1920} height={1080} ref={canvasRef} />
    </div>
  );
};

export default Engine;
