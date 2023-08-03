import { useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    useEffect(() => {
        axios
            .get("http://localhost:8000/players")
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <h1>Hello contributors!</h1>
        </>
    );
};

export default App;
