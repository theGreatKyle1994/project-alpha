import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
// Testing Environments
import EntityTesting from "./components/testing/EntityTesting";
import CanvasTesting from "./components/testing/CanvasTesting";
// Core Game
import GameCore from "./components/core/GameCore";
import Player from "./entities/player/Player";

export const globalContext = createContext();

const App = () => {
  const [player, setPlayer] = useState(new Player("Player", 100, 10));

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
