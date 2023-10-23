import { useRef, useEffect, createContext, useState } from "react";
import { updateInstanceLocation } from "../../../utilities/core/functions/updateInstanceLocation";
import useMap from "../../../hooks/useMap";
import usePlayer from "../../../hooks/usePlayer";
import useEnemies from "../../../hooks/useEnemies";
import useCombat from "../../../hooks/useCombat";
import useControlEvents from "../../../hooks/useControlEvents";
import useMovementHandler from "../../../hooks/useMovementHandler";
import GameCore from "../GameCore";
// CSS Imports
import "../../../css/engine/engine.css";
// Creation of our context, keep this global
export const globalContext = createContext({});

// use player. to access player data
// use player.instance. to access the canvas variant
const Engine = () => {
  // Setting up level onload state
  const [isLevelSetup, setIsLevelSetup] = useState(false);
  // Grabbing canvas ref
  const canvasRef = useRef(null);
  // Creation of the map
  const map = useMap(5, 5);
  // Creation of player
  const [player, setPlayer] = usePlayer(map.openSpace);
  // Creation of enemy(s)
  const [enemies, setEnemies] = useEnemies(5, map.openSpace);
  // Setup of combat system
  const [combatEnemy, setCombatEnemy] = useCombat(enemies, setEnemies);
  // Setting up the controls
  const keyObj = useControlEvents();
  // Setting up various instance movement when player moves
  useMovementHandler(keyObj, player.instance);

  // onLoad functions to setup map and item locations
  const setupOnLoad = () => {
    // Calculating the player position offset relative to
    // the canvas center
    const playerPosOffset = {
      x: Math.round(player.instance.pos.x - canvasRef.current.width / 2),
      y: Math.round(player.instance.pos.y - canvasRef.current.height / 2),
    };
    // Any onLoad functions here needed for logic setup
    map.onLoad(playerPosOffset);
    player.onLoad(canvasRef.current);
    enemies.forEach((enemy) => enemy.onLoad(playerPosOffset));
    // This is required to keep this function from running
    // more then once per level state change
    setIsLevelSetup(true);
  };

  // Creation of the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext("2d");
    let frameId = 0;
    // This needs to be run only once per level setup
    if (!isLevelSetup) setupOnLoad();
    // Eveything we need rendered per frame goes here
    // passed through context
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
      // Update instances based on player speed
      updateInstanceLocation(player.instance, map.mapLayout, enemies);
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

  return (
    // Global context, no prop drilling needed!
    <globalContext.Provider
      value={{
        canvas: canvasRef.current,
        map,
        keyObj,
        player,
        setPlayer,
        enemies,
        setEnemies,
        combatEnemy,
        setCombatEnemy,
      }}
    >
      <canvas id="game-canvas" ref={canvasRef} />
      {/* All systems and game content go in GameCore */}
      <GameCore />
    </globalContext.Provider>
  );
};

export default Engine;
