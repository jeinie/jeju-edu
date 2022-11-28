import Router from "./page/router";
import "./app.css";
import "./reset.css";
import "./font.css";
// import { TransformAddress } from "./components/TransformAddress";
import TransformAddress from "./components/maps/TransformAddress";
import PartyMarker from "./components/maps/PartyMarker";
import AddressInput from "./components/maps/AddressInput";

function App() {
  return (
    <div className="App" style={{ fontFamily: "NanumSquare" }}>
      <Router />
      {/* <TransformAddress lat="33.252984" lon="126.561100" />; */}
      {/* <PartyMarker lat="33.4880920214084" lon="126.530240568483" /> */}
      {/* <AddressInput /> */}
    </div>
  );
}

export default App;
