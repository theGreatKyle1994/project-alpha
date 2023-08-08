import { Routes, Route } from "react-router-dom";
import Combat from "./components/Combat";
import MapGenerator from "./components/map/MapGenerator";
import "./App.css";

const App = () => {
    return (
        <>
            <h1>Hello contributors!</h1>
            <Routes>
                <Route path="/combat" element={<Combat />} />
                <Route path="/map" element={<MapGenerator size={25} />} />
            </Routes>
        </>
    );
};

export default App;
