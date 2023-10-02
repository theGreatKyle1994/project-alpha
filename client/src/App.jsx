import { createContext, useState, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Testing Environments
import EntityTesting from "./components/testing/EntityTesting";
import CanvasTesting from "./components/testing/CanvasTesting";
// Core Game
import GameCore from "./components/core/GameCore";
import Player from "./entities/player/Player";
import PlayerInstance from "./entities/player/PlayerInstance";
// Global context creation
export const globalContext = createContext();

const App = () => {
  const [player, setPlayer] = useState(new Player("Player", 100, 10));
  // Memoized player instance for canvas.
  useMemo(
    () =>
      player.setInstance(
        new PlayerInstance(player.id, "box", {
          size: { x: 20, y: 20 },
          speed: { x: 0, y: 0, actual: 2 },
          color: "blue",
          useCollision: true,
        })
      ),
    []
  );

  useEffect(() => console.log(player), [player]);

  return (
    // Global context values used across the application
    <globalContext.Provider value={{ player, setPlayer }}>
      <Routes>
        <Route path="/entity" element={<EntityTesting />} />
        <Route path="/canvas" element={<CanvasTesting />} />
        <Route path="/game" element={<GameCore />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
