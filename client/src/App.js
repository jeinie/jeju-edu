import Router from "./router";
import "./app.css";
import "./reset.css";
import "./font.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App" style={{ fontFamily: "NanumSquare" }}>
      <Router />
    </div>
  );
}

export default App;
