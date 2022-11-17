import Router from "./router";
import "./app.css";
import "./reset.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewDetail from "./page/Main/ViewDetail";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
