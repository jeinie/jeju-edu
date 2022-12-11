import React, { lazy } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Routers from "./delete/router";

import Lending from "./page/Lending";

import "./reset.css";
import "./app.css";
import "./font.css";

function App() {
  const Main = React.lazy(() => import("./page/Main/Main"));
  const Login = lazy(() => import("./page/login/Login"));
  const Profile = lazy(() => import("./page/profile/Profile"));
  const PartyJoin = lazy(() => import("./page/detail/PartyJoin"));
  const PartyDetail = lazy(() =>
    lazy(() => import("./page/detail/PartyDetail"))
  );
  const Footer = lazy(() => import("./components/Footer"));

  return (
    <div className="App" style={{ fontFamily: "NanumSquare" }}>
      {/* <Routers /> */}
      <Suspense fallback={<Lending />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partyjoin" element={<PartyJoin />} />
          <Route path="/partydetail/:id" element={<PartyDetail />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
