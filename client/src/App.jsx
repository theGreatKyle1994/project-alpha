import { Routes, Route } from "react-router-dom";
import Combat from "./components/Combat";
import "./App.css";

const App = () => {
    return (
        <>
            <h1>Hello contributors!</h1>
            <Routes>
                <Route path="/combat" element={<Combat />} />
            </Routes>
        </>
    );
};

export default App;
