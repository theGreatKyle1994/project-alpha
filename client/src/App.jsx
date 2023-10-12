import { Routes, Route } from "react-router-dom";
// Testing Environments
import EntityTesting from "./components/testing/EntityTesting";
import CanvasTesting from "./components/testing/CanvasTesting";
// Core Game
import Engine from "./components/core/engine/Engine";

const App = () => {
  return (
    <Routes>
      <Route path="/entity" element={<EntityTesting />} />
      <Route path="/canvas" element={<CanvasTesting />} />
      <Route path="/game" element={<Engine />} />
    </Routes>
  );
};

export default App;
