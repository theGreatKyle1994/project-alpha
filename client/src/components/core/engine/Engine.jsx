import { useRef, useEffect } from "react";
import "../../../css/engine/engine.css";

const Engine = ({ map, player }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId = undefined;
    // Eveything we need rendered per frame goes here,
    // pass through props
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      map.renderMap(ctx);
      player.render(ctx, map.walls, canvas);
      frameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div id="game-container">
      {/* 
        Do not remove width and height from canvas, 
        these are required for resolution purposes
      */}
      <canvas id="game-canvas" width={1920} height={1080} ref={canvasRef} />
    </div>
  );
};

export default Engine;
