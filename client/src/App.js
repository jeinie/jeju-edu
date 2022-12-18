import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Lending from "./page/Lending";

import "./reset.css";
import "./app.css";
import "./font.css";
import KaKaoAddress from "./components/maps/mapAPI/KaKaoAddress";

function App() {
  const Main = React.lazy(() => import("./page/Main/Main"));
  const Login = React.lazy(() => import("./page/login/Login"));
  const Join = React.lazy(() => import("./page/Join"));
  const Profile = React.lazy(() => import("./page/profile/Profile"));
  const PartyJoin = React.lazy(() => import("./page/detail/PartyJoin"));
  const PartyDetail = React.lazy(() => import("./page/detail/PartyDetail"));
  const Footer = React.lazy(() => import("./components/Footer"));

  return (
    <div className="App" style={{ fontFamily: "NanumSquare" }}>
      <Suspense fallback={<Lending />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partyjoin" element={<PartyJoin />} />
          <Route path={`/partydetail/:id`} element={<PartyDetail />} />
        </Routes>
        <Footer />
      </Suspense>
      {/* <KaKaoAddress /> */}
    </div>
  );
}

export default App;
