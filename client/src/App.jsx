import { Routes, Route } from "react-router-dom";
import EntityTesting from "./components/testing/EntityTesting";
import MapGenerator from "./components/map/MapGenerator";
import useEntity from "./hooks/useEntity";
import { createContext, useState } from "react";
import "./App.css";
export const globalContext = createContext();

const App = () => {
  const player = useEntity("Player", "Player", 100, 10);
  const [isInCombat, setIsInCombat] = useState(false);

  return (
    // Global context values used across the application
    <globalContext.Provider
      value={{
        player,
        combatActions: {
          isInCombat,
          setIsInCombat,
        },
      }}
    >
      <h1>Hello contributors!</h1>
      <Routes>
        <Route path="/entity" element={<EntityTesting />} />
        <Route path="/map" element={<MapGenerator />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
