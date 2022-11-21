import Router from "./page/router";
import "./app.css";
import "./reset.css";
import "./font.css";
import TransformAddress from "./components/TransformAddress";

function App() {
  return (
    <div className="App" style={{ fontFamily: "NanumSquare" }}>
      <Router />
      {/* <TransformAddress />; */}
    </div>
  );
}

export default App;
