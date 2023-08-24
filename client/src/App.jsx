import { Routes, Route } from "react-router-dom";
import Combat from "./components/combat/Combat";
import EntityTesting from "./components/testing/EntityTesting";
import MapGenerator from "./components/map/MapGenerator";
import useEntity from "./hooks/useEntity";
import { getPlayer as playerContext } from "./entities/player/getPlayer";
import "./App.css";

const App = () => {
  const player = useEntity("Player", "Player", 100, 10);

  return (
    <playerContext.Provider value={player}>
      <h1>Hello contributors!</h1>
      <Routes>
        <Route path="/combat" element={<Combat />} />
        <Route path="/entity" element={<EntityTesting />} />
        <Route path="/map" element={<MapGenerator />} />
      </Routes>
    </playerContext.Provider>
  );
};

export default App;
