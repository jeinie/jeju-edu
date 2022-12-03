import Router from "./page/router";
import "./app.css";
import "./reset.css";
import "./font.css";
import TransformAddress from "./components/TransformAddress";
import AddressInput from "./components/maps/AddressInput";
import StudyCard from "./components/StudyCard";

function App() {
  return (
    <div className="App" style={{ fontFamily: "NanumSquare" }}>
      <Router />
      {/* <TransformAddress lat="33.252984" lon="126.561100" />; */}
      {/* <AddressInput /> */}
      {/* <StudyCard /> */}
    </div>
  );
}

export default App;
