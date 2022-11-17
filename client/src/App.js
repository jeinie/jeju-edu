import Router from "./router";
import "./app.css";
import "./reset.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("13.125.223.194:56742/api/getStudyList")
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
