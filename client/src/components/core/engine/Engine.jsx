import { useRef, useEffect } from "react";
import "../../../css/engine/engine.css";

const Engine = ({ map, player, enemies, combatEnemy, setCombatEnemy }) => {
  const canvasRef = useRef(null);

  // Creation of the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext("2d");
    let frameId = undefined;
    // Eveything we need rendered per frame goes here,
    // pass through props
    const update = () => {
      // Clearing canvas per frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Render map outline
      map.renderMap(ctx);
      // Render player and check for collisions
      player.instance.render(ctx, map.walls, canvas);
      // Render enemies and check for valid collisions
      enemies.forEach((enemy) => {
        enemy.instance.render(ctx, map.walls, canvas);
        enemy.checkForCombat(player, setCombatEnemy);
      });
      frameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [map, enemies, combatEnemy, player]);

  // Resize event for the canvas
  useEffect(() => {
    addEventListener("resize", () => {
      canvasRef.current.width = innerWidth;
      canvasRef.current.height = innerHeight;
    });

    return () => {
      removeEventListener("resize");
    };
  }, []);

  return <canvas id="game-canvas" ref={canvasRef} />;
};

export default Engine;
