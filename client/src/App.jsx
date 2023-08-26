import { Routes, Route } from "react-router-dom";
import Combat from "./components/combat/Combat";
import EntityTesting from "./components/testing/EntityTesting";
import MapGenerator from "./components/map/MapGenerator";
import useEntity from "./hooks/useEntity";
import { useState, createContext } from "react";
import "./App.css";
export const globalContext = createContext();

const App = () => {
  const [enemies, setEnemies] = useState([]);
  const player = useEntity("Player", "Player", 100, 10);

  return (
    <globalContext.Provider value={{ player, enemies }}>
      <h1>Hello contributors!</h1>
      <Routes>
        <Route path="/combat" element={<Combat />} />
        <Route path="/entity" element={<EntityTesting />} />
        <Route path="/map" element={<MapGenerator />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
